import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,

      enum: ["Income", "Expense", "Budget"],

      required: true,
    },

    limit: {
      type: Number,

      default: 0,
    },

    icon: {
      type: String,

      default: "FaMoneyBillWave",
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

const Category = mongoose.model("Category", categorySchema);

export default Category;
