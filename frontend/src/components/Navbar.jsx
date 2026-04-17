import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, Search, Menu, X, Bell, User } from "lucide-react";
import logo from "../assets/Logo.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // ✅ Sync input with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get("search") || "";
    setSearch(value);
  }, [location.search]);

  // ✅ Debounce + prevent unnecessary navigation
  useEffect(() => {
    const delay = setTimeout(() => {
      const trimmed = search.trim();

      const params = new URLSearchParams(location.search);
      const current = params.get("search") || "";

      if (trimmed !== current) {
        navigate(trimmed ? `/?search=${encodeURIComponent(trimmed)}` : "/");
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="LevelUp Logo"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
            <span className="font-extrabold tracking-wide text-lg sm:text-xl md:text-2xl">
              <span className="text-white">Level</span>
              <span className="text-orange-500">Up</span>
            </span>
          </Link>

          {/* ✅ Search */}
          <div className="hidden md:flex items-center bg-gray-800 px-4 py-2 rounded-lg w-1/3">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-3 w-full text-white placeholder-gray-400"
            />

            {/* ✅ Clear button */}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/wishlist" className="text-white hover:text-orange-400">
              <Heart size={27} />
            </Link>

            <Link to="/cart" className="text-white hover:text-orange-400">
              <ShoppingCart size={27} />
            </Link>

            {user ? (
              <>
                <Link
                  to="/notifications"
                  className="text-white hover:text-orange-400"
                >
                  <Bell size={27} />
                </Link>

                <Link
                  to="/Profile"
                  className="text-white hover:text-orange-400"
                >
                  <User size={27} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white border px-4 py-1.5 rounded-md hover:bg-gray-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-orange-500 px-4 py-1.5 rounded-md hover:bg-orange-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">
            <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none px-3 w-full text-white"
              />
            </div>

            <Link to="/wishlist" className="text-white">
              Wishlist
            </Link>
            <Link to="/cart" className="text-white">
              Cart
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white border px-4 py-2 rounded-md"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-orange-500 px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
