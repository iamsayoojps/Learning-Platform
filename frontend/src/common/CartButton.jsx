import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartButton = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/cart/add",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Added to cart 🛒");
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCart}
      disabled={loading}
      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700 transition disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default CartButton;
