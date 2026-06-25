import Income from "../Models/Income.js";
import Expense from "../Models/Expense.js";
import redisClient from "../Config/redis.js";

export const getDashboardCards = async (req, res) => {
  try {
    const apiStart = Date.now();
    const userId = req.user._id;

    // CURRENT DATE
    const currentDate = new Date();

    const selectedMonth =
      req.query.month !== undefined
        ? Number(req.query.month)
        : currentDate.getMonth();
    const cacheKey = `dashboard:${userId}:${selectedMonth}`;

    // CHECK CACHE
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache Hit");

      return res.status(200).json(JSON.parse(cachedData));
    }

    const currentYear = new Date().getFullYear();

    // CURRENT MONTH
    const startOfCurrentMonth = new Date(currentYear, selectedMonth, 1);

    const endOfCurrentMonth = new Date(currentYear, selectedMonth + 1, 0);

    // PREVIOUS MONTH
    const previousMonthDate = new Date(currentYear, selectedMonth - 1, 1);
    const startOfPreviousMonth = new Date(
      previousMonthDate.getFullYear(),
      previousMonthDate.getMonth(),
      1,
    );

    const endOfPreviousMonth = new Date(
      previousMonthDate.getFullYear(),
      previousMonthDate.getMonth() + 1,
      0,
    );

    const incomeStats = await Income.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,

          totalIncome: {
            $sum: "$amount",
          },

          currentIncomeTotal: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ["$date", startOfCurrentMonth] },
                    { $lte: ["$date", endOfCurrentMonth] },
                  ],
                },
                "$amount",
                0,
              ],
            },
          },

          previousIncomeTotal: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ["$date", startOfPreviousMonth] },
                    { $lte: ["$date", endOfPreviousMonth] },
                  ],
                },
                "$amount",
                0,
              ],
            },
          },
        },
      },
    ]);

    const {
      totalIncome = 0,
      currentIncomeTotal = 0,
      previousIncomeTotal = 0,
    } = incomeStats[0] || {};

    const expenseStats = await Expense.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,

          totalExpense: {
            $sum: "$amount",
          },

          currentExpenseTotal: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ["$date", startOfCurrentMonth] },
                    { $lte: ["$date", endOfCurrentMonth] },
                  ],
                },
                "$amount",
                0,
              ],
            },
          },

          previousExpenseTotal: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ["$date", startOfPreviousMonth] },
                    { $lte: ["$date", endOfPreviousMonth] },
                  ],
                },
                "$amount",
                0,
              ],
            },
          },
        },
      },
    ]);

    const {
      totalExpense = 0,
      currentExpenseTotal = 0,
      previousExpenseTotal = 0,
    } = expenseStats[0] || {};

    // SAVINGS
    const currentSavings = currentIncomeTotal - currentExpenseTotal;

    const previousSavings = previousIncomeTotal - previousExpenseTotal;

    // GROWTH FUNCTION
    const calculateGrowth = (current, previous) => {
      if (previous === 0) return 100;

      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    const incomeGrowth = calculateGrowth(
      currentIncomeTotal,
      previousIncomeTotal,
    );

    const expenseGrowth = calculateGrowth(
      currentExpenseTotal,
      previousExpenseTotal,
    );

    const savingsGrowth = calculateGrowth(currentSavings, previousSavings);

    // FINAL RESPONSE
    const response = {
      totalBalance: currentSavings,

      totalIncome: currentIncomeTotal,
      incomeGrowth,

      totalExpense: currentExpenseTotal,
      expenseGrowth,

      totalSavings: currentSavings,
      savingsGrowth,
    };

    await redisClient.setEx(cacheKey, 60, JSON.stringify(response));
    console.log("Total API:", Date.now() - apiStart);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    // FETCH DATA
    const incomes = await Income.find({
      user: userId,
    });

    const expenses = await Expense.find({
      user: userId,
    });

    // FORMAT INCOMES
    const formattedIncomes = incomes.map((item) => ({
      _id: item._id,

      title: item.source + " Credited",

      category: "Income",

      amount: item.amount.toLocaleString(),

      type: "credit",

      date: new Date(item.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
    }));

    // FORMAT EXPENSES
    const formattedExpenses = expenses.map((item) => ({
      _id: item._id,

      title: item.title,

      category: item.category,

      amount: item.amount.toLocaleString(),

      type: "debit",

      date: new Date(item.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
    }));

    // MERGE + SORT
    const transactions = [...formattedIncomes, ...formattedExpenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpenseCategories = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({
      user: userId,
    });

    const categoryMap = {};

    expenses.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + item.amount;
    });

    const result = Object.keys(categoryMap).map((key) => ({
      category: key,
      amount: categoryMap[key],
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user._id;

    const incomes = await Income.find({
      user: userId,
    });

    const expenses = await Expense.find({
      user: userId,
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyData = {};

    months.forEach((month) => {
      monthlyData[month] = {
        income: 0,
        expense: 0,
      };
    });

    incomes.forEach((item) => {
      const month = months[new Date(item.date).getMonth()];

      monthlyData[month].income += item.amount;
    });

    expenses.forEach((item) => {
      const month = months[new Date(item.date).getMonth()];

      monthlyData[month].expense += item.amount;
    });

    const result = Object.keys(monthlyData).map((month) => ({
      month,
      income: monthlyData[month].income,

      expense: monthlyData[month].expense,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
