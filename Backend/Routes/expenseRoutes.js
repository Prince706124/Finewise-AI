import express from "express";

import {
  addExpense,
  getExpenses,
  deleteExpense,
} from "../Controllers/expenseController.js";

import protect from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addExpense);

router.get("/", protect, getExpenses);

router.delete("/:id", protect, deleteExpense);

export default router;
