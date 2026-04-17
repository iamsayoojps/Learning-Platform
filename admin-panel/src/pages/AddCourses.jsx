import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    category: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (!course.title || !course.price || !course.category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/courses", course);

      alert("Course added successfully");

      navigate("/courses"); // go back to courses page
    } catch (error) {
      console.log(error);
      alert("Error adding course");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Course Title"
            value={course.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="instructor"
            placeholder="Instructor Name"
            value={course.instructor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={course.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="category"
            value={course.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Development">Development</option>
            <option value="AI">AI</option>
            <option value="Fitness">Fitness</option>
            <option value="Cooking">Cooking</option>
          </select>

          <input
            name="thumbnail"
            placeholder="Thumbnail Image URL"
            value={course.thumbnail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={course.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Image Preview */}
          {course.thumbnail && (
            <img
              src={course.thumbnail}
              alt="preview"
              className="w-full h-40 object-cover rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
