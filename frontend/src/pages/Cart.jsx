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

    setCart(cart.filter((item) => item.course._id !== id));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.course.price * item.quantity,
    0,
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.course._id} className="border p-4 my-2">
              <h2>{item.course.title}</h2>
              <p>₹{item.course.price}</p>
              <p>Qty: {item.quantity}</p>

              <button
                onClick={() => handleRemove(item.course._id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="mt-4 text-xl font-bold">Total: ₹{total}</h2>
        </>
      )}
    </div>
  );
};

export default Cart;
