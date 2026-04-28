import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WishlistButton = ({ courseId }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Check if already in wishlist (optional for now)
  useEffect(() => {
    // later you can fetch wishlist and check
  }, []);

  const handleWishlist = async () => {
    if (!token) {
      alert("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      if (isWishlisted) {
        await axios.delete(`http://localhost:5000/api/wishlist/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsWishlisted(false);
      } else {
        await axios.post(
          "http://localhost:5000/api/wishlist/add",
          { courseId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setIsWishlisted(true);
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <button
      onClick={handleWishlist}
      className={`px-4 py-2 rounded-lg text-sm transition ${
        isWishlisted
          ? "bg-pink-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-pink-500 hover:text-white"
      }`}
    >
      {isWishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
    </button>
  );
};

export default WishlistButton;
