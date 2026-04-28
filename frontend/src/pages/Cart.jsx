import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

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

  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCart(cart.filter((course) => course._id !== id));
    alert("Course removed from cart ❌");
  };

  const total = cart.reduce((acc, course) => acc + course.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          My Cart ({cart.length})
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Your cart is empty 🛒
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Side */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow p-4 flex gap-4 hover:shadow-lg transition"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-40 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800">
                      {course.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      By {course.instructor}
                    </p>

                    <p className="text-indigo-600 font-bold mt-2 text-lg">
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
            <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3 text-gray-600">
                <span>Total Courses</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
