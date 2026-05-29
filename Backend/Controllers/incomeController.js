import Income from "../Models/Income.js";

// Create a new income entry
export const addIncome = async (req, res) => {
  try {
    const { source, amount, date, paymentMethod, notes } = req.body;

    const income = await Income.create({
      source,
      amount,
      date,
      paymentMethod,
      notes,
      user: req.user._id,
    });

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all income entries for the logged-in user
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete an income entry
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    // OWNER CHECK
    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await income.deleteOne();

    res.status(200).json({
      message: "Income deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update an income entry
export const updateIncome = async (req, res) => {
  try {
    const { source, amount, date, paymentMethod, notes } = req.body;

    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    // OWNER CHECK
    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    income.source = source;
    income.amount = amount;
    income.date = date;
    income.paymentMethod = paymentMethod;
    income.notes = notes;

    await income.save();

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
