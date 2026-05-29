import express from "express";

import protect from "../Middlewares/authMiddleware.js";

import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../Controllers/categoryController.js";

const router = express.Router();

router.post("/", protect, addCategory);

router.get("/", protect, getCategories);

router.delete("/:id", protect, deleteCategory);
router.put("/:id", protect, updateCategory);

export default router;
