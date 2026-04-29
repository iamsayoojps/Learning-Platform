import Course from "../models/courseModel.js";

// ✅ CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price, category, thumbnail } =
      req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCourse = new Course({
      title,
      description,
      instructor,
      price,
      category,
      thumbnail,
    });

    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course" });
  }
};

// ✅ GET COURSES (SEPARATE FUNCTION)
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};
// admin panel get
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course" });
  }
};

//delete

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" });
  }
};

// edit

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course" });
  }
};

// course count
export const getCourseCount = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();

    res.json({ totalCourses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching course count" });
  }
};
