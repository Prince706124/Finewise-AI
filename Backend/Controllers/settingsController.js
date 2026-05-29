import User from "../Models/User.js";

import bcrypt from "bcryptjs";

// GET SETTINGS
export const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SETTINGS
export const updateSettings = async (req, res) => {
  try {
    const {
      name,
      incomeGoal,
      savingsTarget,
      currency,
      darkMode,
      monthlyReminder,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;

    user.incomeGoal = incomeGoal;

    user.savingsTarget = savingsTarget;

    user.currency = currency;

    user.darkMode = darkMode;

    user.monthlyReminder = monthlyReminder;

    await user.save();

    res.status(200).json({
      message: "Settings updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All password fields required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // CHECK CURRENT PASSWORD
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // HASH NEW PASSWORD
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
