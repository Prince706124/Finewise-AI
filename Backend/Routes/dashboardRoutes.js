import express from "express";

import protect from "../Middlewares/authMiddleware.js";

import {
  getDashboardCards,
  getRecentTransactions,
  getExpenseCategories,
  getMonthlyTrends,
} from "../Controllers/dashboardController.js";

const router = express.Router();

router.get("/cards", protect, getDashboardCards);

router.get("/recent-transactions", protect, getRecentTransactions);

router.get("/expense-categories", protect, getExpenseCategories);

router.get("/monthly-trends", protect, getMonthlyTrends);

export default router;
