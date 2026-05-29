import express from "express";
import protect from "../Middlewares/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/logout", logoutUser);

export default router;
