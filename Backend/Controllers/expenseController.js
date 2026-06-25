import Expense from "../Models/Expense.js";
import redisClient from "../Config/redis.js";

// ADD EXPENSE
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, paymentMethod, notes } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      paymentMethod,
      notes,

      user: req.user._id,
    });

    const month = new Date(date).getMonth();
    await redisClient.del(`dashboard:${req.user._id}:${month}`);

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const expenses = await Expense.find({
      user: req.user._id,
    })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // Use lean() for better performance

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // OWNER CHECK
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
