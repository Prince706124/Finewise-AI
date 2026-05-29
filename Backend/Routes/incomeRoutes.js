import {
  getIncomes,
  addIncome,
  deleteIncome,
  updateIncome,
} from "../Controllers/incomeController.js";

import express from "express";
import protect from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getIncomes);
router.post("/", protect, addIncome);
router.delete("/:id", protect, deleteIncome);
router.put("/:id", protect, updateIncome);

export default router;
