import express from "express";
import {
  register,
  login,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";
import {
  validate,
  registerValidation,
  loginValidation
} from "../middleware/validation.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/me", auth, getCurrentUser);
router.post("/logout", auth, logout);

export default router;