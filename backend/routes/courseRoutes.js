import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
} from "../controllers/courseController.js";
// import { protect, admin } from "../middleware/auth.js"; (optional)

const router = express.Router();

// POST /api/courses
router.post("/", createCourse);
// get
router.get("/", getCourses);

//admin get routes
router.get("/:id", getCourseById);

//delete
router.delete("/:id", deleteCourse);

//update
router.put("/:id", updateCourse);

export default router;
