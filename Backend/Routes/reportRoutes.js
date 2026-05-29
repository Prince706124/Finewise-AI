import express from "express";

import protect from "../Middlewares/authMiddleware.js";

import { getReportSummary } from "../Controllers/reportController.js";

const router = express.Router();

router.get("/summary", protect, getReportSummary);

export default router;
