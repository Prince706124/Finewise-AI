import express from "express";

import protect from "../Middlewares/authMiddleware.js";

import {
  addBudget,
  getBudgets,
  deleteBudget,
} from "../Controllers/budgetControllers.js";

const router = express.Router();

router.post("/", protect, addBudget);

router.get("/", protect, getBudgets);

router.delete("/:id", protect, deleteBudget);

export default router;
