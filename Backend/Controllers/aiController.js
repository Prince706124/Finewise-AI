import Income from "../Models/Income.js";

import Expense from "../Models/Expense.js";

import Budget from "../Models/Budgets.js";

import { generateChatResponse } from "../Services/aiService.js";
import { generateFinancialInsights } from "../Services/aiService.js";

export const getAIInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    // FETCH DATA
    const incomes = await Income.find({
      user: userId,
    });

    const expenses = await Expense.find({
      user: userId,
    });

    const budgets = await Budget.find({
      user: userId,
    }).populate("category");

    // TOTALS
    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);

    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

    const totalSavings = totalIncome - totalExpense;

    const savingsPercentage =
      totalIncome === 0 ? 0 : ((totalSavings / totalIncome) * 100).toFixed(1);

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

    // BUDGET WARNINGS & HEALTH
    const budgetWarnings = [];
    const budgetHealth = [];

    for (const budget of budgets) {
      const categoryExpenses = expenses.filter(
        (item) => item.category === budget.category.title,
      );

      const spent = categoryExpenses.reduce(
        (acc, item) => acc + item.amount,
        0,
      );

      if (spent > budget.limit) {
        budgetWarnings.push(
          `${budget.category.title} exceeded budget by ₹${spent - budget.limit}`,
        );
      } else {
        const remaining = budget.limit - spent;
        const percentageUsed = ((spent / budget.limit) * 100).toFixed(1);
        budgetHealth.push(
          `${budget.category.title}: ₹${spent} / ₹${budget.limit} (${percentageUsed}% used, ₹${remaining} remaining)`,
        );
      }
    }

    // AI RESPONSE
    const aiInsights = await generateFinancialInsights({
      totalIncome,

      totalExpense,

      totalSavings,

      savingsPercentage,

      topCategory,

      budgetWarnings:
        budgetWarnings.join(", ") || "No budget overages detected.",

      budgetHealth: budgetHealth.join(" | "),
    });

    res.status(200).json(aiInsights);
    //
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const chatWithAI = async (req, res) => {
  try {
    const userId = req.user._id;

    const { message } = req.body;

    const incomes = await Income.find({
      user: userId,
    });

    const expenses = await Expense.find({
      user: userId,
    });

    const budgets = await Budget.find({
      user: userId,
    });

    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);

    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

    const aiResponse = await generateChatResponse({
      message,

      totalIncome,

      totalExpense,

      budgets,

      expenses,
    });

    res.status(200).json({
      reply: aiResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
