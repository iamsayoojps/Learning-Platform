import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartButton from "../common/CartButton";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWishlist(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist((prev) => prev.filter((item) => item._id !== id));

      alert("Course removed from wishlist ❌");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow p-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="text-lg font-semibold mt-3 line-clamp-2">
                {course.title}
              </h2>

              <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>

              <p className="text-indigo-600 font-bold mt-2">₹{course.price}</p>

              <div className="flex gap-2 mt-4">
                <CartButton courseId={course._id} />

                <button
                  onClick={() => handleRemove(course._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
