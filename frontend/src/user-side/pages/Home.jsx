import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterBar from "../components/FilterBar";
import WishlistButton from "../common/WishlistButton";
import CartButton from "../common/CartButton";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [priceType, setPriceType] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
        setFilteredCourses(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Fetch purchased courses
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:5000/api/purchase/my-learning",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setPurchasedCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPurchasedCourses();
  }, []);

  useEffect(() => {
    let updated = [...courses];

    if (searchQuery) {
      updated = updated.filter((course) => {
        const text = `${course.title || ""} ${course.description || ""} ${course.instructor || ""}`;
        return text.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    if (category) {
      updated = updated.filter(
        (course) =>
          course.category &&
          course.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (priceType === "free") {
      updated = updated.filter((course) => course.price === 0);
    } else if (priceType === "paid") {
      updated = updated.filter((course) => course.price > 0);
    }

    if (sort === "low-high") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      updated.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "oldest") {
      updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredCourses(updated);
  }, [searchQuery, sort, category, priceType, courses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Explore Courses
        </h1>

        {searchQuery && (
          <p className="text-gray-500 mt-1 text-sm">
            {filteredCourses.length} results for "{searchQuery}"
          </p>
        )}
      </div>

      <FilterBar
        onSortChange={setSort}
        onCategoryChange={setCategory}
        onPriceTypeChange={setPriceType}
        onClearFilters={() => {
          setSort("");
          setCategory("");
          setPriceType("");
        }}
      />

      {loading && (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500 animate-pulse">Loading courses...</p>
        </div>
      )}

      {!loading && filteredCourses.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">
            😕 No courses found for "{searchQuery}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredCourses.map((course) => {
          const isPurchased = purchasedCourses.some(
            (item) => item._id === course._id,
          );

          return (
            <div
              key={course._id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
                />

                {course.price > 0 && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                    Bestseller
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 sm:line-clamp-2">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2 sm:line-clamp-3">
                  {course.description}
                </p>

                <p className="text-sm mt-2">
                  Instructor:{" "}
                  <span className="font-medium text-gray-700">
                    {course.instructor || "Unknown"}
                  </span>
                </p>

                <div className="flex items-center gap-1 mt-2 text-sm">
                  <span className="text-yellow-500 font-medium">4.5</span>
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-gray-400 text-xs">(1,234)</span>
                </div>

                <div className="mt-2">
                  {course.price === 0 ? (
                    <span className="text-green-600 font-bold text-lg">
                      Free
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 font-bold text-lg">
                        ₹{course.price}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{course.price + 500}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-auto pt-4">
                  {isPurchased ? (
                    <button
                      onClick={() => navigate(`/learn/${course._id}`)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 transition"
                    >
                      Start Learning
                    </button>
                  ) : (
                    <>
                      <CartButton courseId={course._id} />
                      <WishlistButton courseId={course._id} />
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
