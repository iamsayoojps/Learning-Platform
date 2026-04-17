import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    instructor: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: String,
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
