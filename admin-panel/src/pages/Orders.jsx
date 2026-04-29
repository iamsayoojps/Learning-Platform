import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = async () => {
    if (!window.confirm("Clear all orders?")) return;

    try {
      await axios.delete("http://localhost:5000/api/orders");
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>

        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded p-4 border">
            <p>
              <strong>Name:</strong> {order.username}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={() => handleDelete(order._id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
