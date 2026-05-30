import Income from "../Models/Income.js";
import Expense from "../Models/Expense.js";
import { generateReportInsights } from "../Services/aiService.js";

export const getReportSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // FETCH DATA
    const incomes = await Income.find({
      user: userId,
    });

    const expenses = await Expense.find({
      user: userId,
    });

    // TOTAL INCOME
    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);

    // TOTAL EXPENSE
    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

    // SAVINGS
    const savings = totalIncome - totalExpense;

    // SAVINGS %
    const savingsPercentage =
      totalIncome === 0 ? 0 : ((savings / totalIncome) * 100).toFixed(1);

    // CATEGORY ANALYTICS
    const categoryMap = {};

    expenses.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + item.amount;
    });

    // TOP CATEGORY
    let topCategory = "No Expenses";

    let highestAmount = 0;

    Object.keys(categoryMap).forEach((category) => {
      if (categoryMap[category] > highestAmount) {
        highestAmount = categoryMap[category];

        topCategory = category;
      }
    });
    let topCategoryAmount = 0;

    Object.keys(categoryMap).forEach((category) => {
      if (categoryMap[category] > topCategoryAmount) {
        topCategory = category;

        topCategoryAmount = categoryMap[category];
      }
    });
    const aiReport = await generateReportInsights({
      totalIncome,
      totalExpense,
      savings,
      savingsPercentage,
      topCategory,
      topCategoryAmount,
    });

    //

    // RESPONSE
    res.status(200).json({
      totalIncome,
      totalExpense,
      savings,
      savingsPercentage,
      topCategory,
      topCategoryAmount,

      aiReport,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
