import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
  getCourseCount,
} from "../controllers/courseController.js";

const router = express.Router();

// POST /api/courses
router.post("/", createCourse);

// GET all courses
router.get("/", getCourses);

// 🔥 IMPORTANT: put count BEFORE :id
router.get("/count", getCourseCount);

// admin get single course
router.get("/:id", getCourseById);

// delete
router.delete("/:id", deleteCourse);

// update
router.put("/:id", updateCourse);

export default router;
