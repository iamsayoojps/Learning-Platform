import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(cart.filter((course) => course._id !== id));
      alert("Course removed from cart ❌");
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce((acc, course) => acc + course.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          My Cart ({cart.length})
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Your cart is empty 🛒
            </h2>

            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Side */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl shadow p-4 flex flex-col sm:flex-row gap-4 hover:shadow-xl transition"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full sm:w-44 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800">
                      {course.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      By {course.instructor}
                    </p>

                    <p className="text-indigo-600 font-bold mt-3 text-xl">
                      ₹{course.price}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(course._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg h-fit"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3 text-gray-600">
                <span>Total Courses</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg"
              >
                Checkout
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Secure checkout for instant course access
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
