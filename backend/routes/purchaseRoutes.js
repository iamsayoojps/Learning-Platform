import express from "express";
import {
  buyCourses,
  getPurchasedCourses,
  removePurchasedCourse,
} from "../controllers/purchaseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/buy", protect, buyCourses);
router.get("/my-learning", protect, getPurchasedCourses);
router.delete("/:courseId", protect, removePurchasedCourse);

export default router;
