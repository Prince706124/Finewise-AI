import express from "express";

import protect from "../Middlewares/authMiddleware.js";
import {
  getSettings,
  updateSettings,
  changePassword,
} from "../Controllers/settingsController.js";

const router = express.Router();

// GET SETTINGS
router.get("/", protect, getSettings);

// UPDATE SETTINGS
router.put("/", protect, updateSettings);

// CHANGE PASSWORD
router.put("/change-password", protect, changePassword);

export default router;
