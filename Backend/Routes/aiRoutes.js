import express from "express";

import { getAIInsights, chatWithAI } from "../Controllers/aiController.js";

import protect from "../Middlewares/authMiddleware.js";
const router = express.Router();

router.get("/insights", protect, getAIInsights);

router.post("/chat", protect, chatWithAI);

export default router;
