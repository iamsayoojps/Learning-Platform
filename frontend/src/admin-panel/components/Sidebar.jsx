import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");

    navigate("/admin", {
      replace: true,
    });
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col justify-between p-5">
      <div>
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="block hover:bg-gray-800 p-3 rounded-lg"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/courses"
              className="block hover:bg-gray-800 p-3 rounded-lg"
            >
              Courses
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              className="block hover:bg-gray-800 p-3 rounded-lg"
            >
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="block hover:bg-gray-800 p-3 rounded-lg"
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 p-3 rounded-lg font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
