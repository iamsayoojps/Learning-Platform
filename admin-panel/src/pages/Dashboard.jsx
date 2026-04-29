import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueRes = await axios.get(
          "http://localhost:5000/api/orders/revenue",
        );

        const usersRes = await axios.get(
          "http://localhost:5000/api/users/count",
        );

        const coursesRes = await axios.get(
          "http://localhost:5000/api/courses/count",
        );

        setRevenue(revenueRes.data.totalRevenue);
        setOrders(revenueRes.data.totalOrders);
        setTotalUsers(usersRes.data.totalUsers);
        setTotalCourses(coursesRes.data.totalCourses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Courses */}
        <div
          onClick={() => navigate("/courses")}
          className="bg-blue-500 text-white p-4 rounded cursor-pointer hover:scale-105 transition"
        >
          <p className="font-bold text-lg">Total Courses</p>
          <p>{totalCourses}</p>
        </div>

        {/* Users */}
        <div
          onClick={() => navigate("/users")}
          className="bg-green-500 text-white p-4 rounded cursor-pointer hover:scale-105 transition"
        >
          <p className="font-bold text-lg">Total Users</p>
          <p>{totalUsers}</p>
        </div>

        {/* Revenue */}
        <div
          onClick={() => navigate("/revenue")}
          className="bg-purple-500 text-white p-4 rounded cursor-pointer hover:scale-105 transition"
        >
          <p className="font-bold text-lg">Revenue</p>
          <p>₹{revenue}</p>
          <p>{orders} Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
