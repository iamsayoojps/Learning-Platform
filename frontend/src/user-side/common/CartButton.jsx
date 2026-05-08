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

      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCart}
      disabled={loading}
      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default CartButton;
