import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
      setCourse(res.data);
    };

    fetchCourse();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      alert("Course deleted");
      navigate("/courses");
    } catch (error) {
      console.log(error);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover rounded"
        />

        <h2 className="text-2xl font-bold mt-4">{course.title}</h2>

        <p className="mt-2 text-gray-600">{course.description}</p>

        <p className="mt-2">
          Instructor: <b>{course.instructor}</b>
        </p>

        <p className="mt-2">
          Category: <b>{course.category}</b>
        </p>

        <p className="mt-2 text-green-600 font-bold">₹{course.price}</p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate(`/courses/edit/${id}`)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
