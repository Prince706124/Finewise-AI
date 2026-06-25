import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    source: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "UPI",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

incomeSchema.index({
  user: 1,
  date: -1,
});

export default Income;
