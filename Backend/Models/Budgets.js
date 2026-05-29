import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Category",

      required: true,
    },

    limit: {
      type: Number,

      required: true,
    },

    month: {
      type: String,

      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
