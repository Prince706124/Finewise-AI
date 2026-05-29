import Budget from "../Models/Budgets.js";

import Expense from "../Models/Expense.js";

// CREATE BUDGET
export const addBudget = async (req, res) => {
  try {
    const { category, limit, month } = req.body;

    const budget = await Budget.create({
      category,

      limit,

      month,

      user: req.user._id,
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET BUDGETS
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user._id,
    }).populate("category");

    // FORMAT BUDGETS
    const formattedBudgets = await Promise.all(
      budgets.map(async (budget) => {
        // FIND EXPENSES OF CATEGORY
        const expenses = await Expense.find({
          user: req.user._id,

          category: budget.category.title,
        });

        // TOTAL SPENT
        const spent = expenses.reduce((acc, item) => acc + item.amount, 0);

        // REMAINING
        const remaining = budget.limit - spent;

        // PROGRESS %
        const progress = ((spent / budget.limit) * 100).toFixed(1);

        // STATUS
        let status = "Safe";

        let color = "bg-green-500";

        if (progress >= 80 && progress < 100) {
          status = "Warning";

          color = "bg-yellow-400";
        }

        if (progress >= 100) {
          status = "Exceeded";

          color = "bg-red-500";
        }

        return {
          _id: budget._id,

          category: budget.category.title,

          icon: budget.category.icon,

          limit: budget.limit,

          spent,

          remaining,

          progress,

          status,

          color,
        };
      }),
    );

    // TOP SUMMARY
    const totalBudget = formattedBudgets.reduce(
      (acc, item) => acc + item.limit,
      0,
    );

    const totalUsed = formattedBudgets.reduce(
      (acc, item) => acc + item.spent,
      0,
    );

    const remainingBudget = totalBudget - totalUsed;

    res.status(200).json({
      budgets: formattedBudgets,

      totalBudget,

      totalUsed,

      remainingBudget,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE BUDGET
export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    // OWNER CHECK
    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await budget.deleteOne();

    res.status(200).json({
      message: "Budget deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
