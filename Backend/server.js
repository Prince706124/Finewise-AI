import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import expenseRoutes from "./Routes/expenseRoutes.js";
import incomeRoutes from "./Routes/incomeRoutes.js";
import dashboardRoutes from "./Routes/dashboardRoutes.js";
import reportRoutes from "./Routes/reportRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import budgetRoutes from "./Routes/budgetRoutes.js";
import aiRoutes from "./Routes/aiRoutes.js";
import settingsRoutes from "./Routes/settingsRoutes.js";

dotenv.config();

console.log("===== SERVER STARTING =====");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URL exists:", !!process.env.MONGO_URL);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);

const app = express();

try {
  await connectDB();
  console.log("Database connected");
} catch (error) {
  console.error("Database connection failed:");
  console.error(error);
}
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
