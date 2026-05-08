import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:5000/api/purchase/my-learning",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);

  const handleRemove = async (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this course from My Learning?",
    );

    if (!confirmRemove) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/purchase/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(courses.filter((course) => course._id !== id));

      alert("Course removed successfully ❌");
    } catch (error) {
      console.log(error);
      alert("Failed to remove course");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Learning</h1>

        {courses.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No purchased courses yet 📚
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {course.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {course.instructor}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/learn/${course._id}`)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                      Start Learning
                    </button>

                    <button
                      onClick={() => handleRemove(course._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
