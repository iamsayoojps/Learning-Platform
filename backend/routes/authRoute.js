import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getMe,
  getUserCount,
  getAllUsers,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.get("/count", getUserCount);
router.get("/all", getAllUsers);

export default router;
