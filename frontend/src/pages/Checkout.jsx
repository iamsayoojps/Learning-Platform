import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    };

    fetchCart();
  }, []);

  const total = cart.reduce((acc, course) => acc + course.price, 0);

  const handleBuy = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/purchase/buy",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Courses purchased successfully 🎉");
      navigate("/my-learning");
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {cart.map((course) => (
          <div key={course._id} className="flex justify-between border-b py-4">
            <span>{course.title}</span>
            <span>₹{course.price}</span>
          </div>
        ))}

        <div className="flex justify-between text-xl font-bold mt-6">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handleBuy}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
