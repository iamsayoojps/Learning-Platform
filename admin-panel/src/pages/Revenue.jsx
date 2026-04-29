import React, { useEffect, useState } from "react";
import axios from "axios";

const Revenue = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    orders: [],
  });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/revenue");

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Revenue Report</h1>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-purple-500 text-white p-6 rounded">
          <h2>Total Revenue</h2>
          <p className="text-2xl font-bold">₹{data.totalRevenue}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded">
          <h2>Total Orders</h2>
          <p className="text-2xl font-bold">{data.totalOrders}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

      <div className="space-y-3">
        {data.orders.slice(0, 5).map((order) => (
          <div key={order._id} className="bg-white shadow p-4 rounded border">
            <p>{order.username}</p>
            <p>₹{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Revenue;
