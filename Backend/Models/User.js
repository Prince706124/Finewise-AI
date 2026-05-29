import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    monthlyIncomeGoal: {
      type: Number,
      default: 0,
    },

    monthlySavingsGoal: {
      type: Number,
      default: 0,
    },
    incomeGoal: {
      type: Number,
      default: 0,
    },

    savingsTarget: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    darkMode: {
      type: Boolean,
      default: false,
    },

    monthlyReminder: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
