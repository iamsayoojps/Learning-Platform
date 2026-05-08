import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

/* ================= USER SIDE ================= */

import Navbar from "./user-side/components/Navbar";
import Footer from "./user-side/components/Footer";
import NotFound from "./user-side/components/NotFount";

import Home from "./user-side/pages/Home";
import Login from "./user-side/pages/Login";
import Register from "./user-side/pages/Register";
import Profile from "./user-side/pages/Profile";
import Wishlist from "./user-side/pages/Wishlist";
import Cart from "./user-side/pages/Cart";
import MyLearning from "./user-side/pages/MyLearning";
import Checkout from "./user-side/pages/Checkout";
import LearnCourse from "./user-side/pages/LearnCource";

/* ================= ADMIN SIDE ================= */

import AdminLogin from "./admin-panel/pages/AdminLogin";
import Dashboard from "./admin-panel/pages/Dashboard";
import Courses from "./admin-panel/pages/Courses";
import Users from "./admin-panel/pages/Users";
import Orders from "./admin-panel/pages/Orders";
import Revenue from "./admin-panel/pages/Revenue";
import AddCourse from "./admin-panel/pages/AddCourse";
import ViewCourse from "./admin-panel/pages/ViewCourse";
import EditCourse from "./admin-panel/pages/EditCourse";

import AdminNavbar from "./admin-panel/components/AdminNavbar";
import Sidebar from "./admin-panel/components/Sidebar";

/* ================= ADMIN LAYOUT ================= */

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

/* ================= MAIN LAYOUT ================= */

function Layout({ user, setUser, error, isLoading }) {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const adminToken = localStorage.getItem("adminToken");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}

      {!isAdminRoute ? (
        <Navbar user={user} setUser={setUser} />
      ) : (
        adminToken && <AdminNavbar />
      )}

      {/* ================= ROUTES ================= */}

      <Routes>
        {/* ================= USER ROUTES ================= */}

        <Route path="/" element={<Home user={user} error={error} />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />

        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/my-learning" element={<MyLearning />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/learn/:id" element={<LearnCourse />} />

        {/* ================= ADMIN LOGIN ================= */}

        <Route
          path="/admin"
          element={
            adminToken ? <Navigate to="/admin/dashboard" /> : <AdminLogin />
          }
        />

        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin/dashboard"
          element={
            adminToken ? (
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />

        {/* ================= COURSES ================= */}

        <Route
          path="/admin/courses"
          element={
            adminToken ? (
              <AdminLayout>
                <Courses />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />

        {/* ================= USERS ================= */}

        <Route
          path="/admin/users"
          element={
            adminToken ? (
              <AdminLayout>
                <Users />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />

        {/* ================= ORDERS ================= */}

        <Route
          path="/admin/orders"
          element={
            adminToken ? (
              <AdminLayout>
                <Orders />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />

        {/* ================= REVENUE ================= */}

        <Route
          path="/admin/revenue"
          element={
            adminToken ? (
              <AdminLayout>
                <Revenue />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/admin/courses/add"
          element={
            adminToken ? (
              <AdminLayout>
                <AddCourse />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/admin/courses/view/:id"
          element={
            adminToken ? (
              <AdminLayout>
                <ViewCourse />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/admin/courses/edit/:id"
          element={
            adminToken ? (
              <AdminLayout>
                <EditCourse />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        {/* ================= 404 ================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ================= FOOTER ================= */}

      {!isAdminRoute && <Footer />}
    </>
  );
}

/* ================= APP ================= */

function App() {
  const [user, setUser] = useState(null);

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(res.data);
        } catch (err) {
          localStorage.removeItem("token");
        }
      }

      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Layout
        user={user}
        setUser={setUser}
        error={error}
        isLoading={isLoading}
      />
    </Router>
  );
}

export default App;
