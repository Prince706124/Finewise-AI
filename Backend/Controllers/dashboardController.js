import Income from "../Models/Income.js";
import Expense from "../Models/Expense.js";

export const getDashboardCards = async (req, res) => {
  const month = Number(req.query.month);
  try {
    const userId = req.user._id;

    // CURRENT DATE
    const currentDate = new Date();

    const selectedMonth =
      req.query.month !== undefined
        ? Number(req.query.month)
        : currentDate.getMonth();

    const currentYear = new Date().getFullYear();

    // CURRENT MONTH
    const startOfCurrentMonth = new Date(
      currentYear,
      month ? parseInt(month) : new Date().getMonth(),
      1,
    );

    const endOfCurrentMonth = new Date(
      currentYear,
      month ? parseInt(month) : new Date().getMonth() + 1,
      0,
    );

    // PREVIOUS MONTH
    const startOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );

    const endOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    );

    // FETCH DATA
    const incomes = await Income.find({
      user: userId,
    });

    const expenses = await Expense.find({
      user: userId,
    });

    // TOTALS
    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);

    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    // CURRENT MONTH
    const currentMonthIncome = incomes.filter((item) => {
      const date = new Date(item.date);

      return date >= startOfCurrentMonth && date <= endOfCurrentMonth;
    });

    const currentMonthExpense = expenses.filter((item) => {
      const date = new Date(item.date);

      return date >= startOfCurrentMonth && date <= endOfCurrentMonth;
    });

    // PREVIOUS MONTH
    const previousMonthIncome = incomes.filter((item) => {
      const date = new Date(item.date);

      return date >= startOfPreviousMonth && date <= endOfPreviousMonth;
    });

    const previousMonthExpense = expenses.filter((item) => {
      const date = new Date(item.date);

      return date >= startOfPreviousMonth && date <= endOfPreviousMonth;
    });

    // CURRENT TOTALS
    const currentIncomeTotal = currentMonthIncome.reduce(
      (acc, item) => acc + item.amount,
      0,
    );

    const currentExpenseTotal = currentMonthExpense.reduce(
      (acc, item) => acc + item.amount,
      0,
    );

    // PREVIOUS TOTALS
    const previousIncomeTotal = previousMonthIncome.reduce(
      (acc, item) => acc + item.amount,
      0,
    );

    const previousExpenseTotal = previousMonthExpense.reduce(
      (acc, item) => acc + item.amount,
      0,
    );

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
    res.status(200).json({
      totalBalance: currentSavings,

      totalIncome: currentIncomeTotal,
      incomeGrowth,

      totalExpense: currentExpenseTotal,
      expenseGrowth,

      totalSavings: currentSavings,

      savingsGrowth,
    });
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
