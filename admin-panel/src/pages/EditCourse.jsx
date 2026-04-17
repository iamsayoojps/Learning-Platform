import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    category: "",
    thumbnail: "",
  });

  // ✅ Fetch existing course (prefill)
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [id]);

  // handle input change
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // ✅ Update course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/courses/${id}`, {
        ...course,
        price: Number(course.price),
      });

      alert("Course updated successfully");
      navigate(`/courses/view/${id}`);
    } catch (error) {
      console.log(error);
      alert("Error updating course");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={course.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Course Title"
          />

          <input
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Instructor"
          />

          <input
            name="price"
            type="number"
            value={course.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Price"
          />

          <input
            name="category"
            value={course.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Category"
          />

          <input
            name="thumbnail"
            value={course.thumbnail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Thumbnail URL"
          />

          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />

          {/* Preview */}
          {course.thumbnail && (
            <img
              src={course.thumbnail}
              alt="preview"
              className="w-full h-40 object-cover rounded"
            />
          )}

          <button className="w-full bg-green-600 text-white py-2 rounded">
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
