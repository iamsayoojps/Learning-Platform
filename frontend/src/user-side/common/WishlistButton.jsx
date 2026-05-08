import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WishlistButton = ({ courseId }) => {
  const navigate = useNavigate();

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add wishlist");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/wishlist/add",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Course added to wishlist ❤️");
    } catch (err) {
      alert(
        err.response?.data?.message || "Course already added to wishlist ⚠️",
      );
    }
  };

  return (
    <button
      onClick={handleWishlist}
      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-pink-500 hover:text-white transition"
    >
      ❤️ Wishlist
    </button>
  );
};

export default WishlistButton;
