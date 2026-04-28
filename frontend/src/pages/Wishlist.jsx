import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWishlist(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/wishlist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {wishlist.map((course) => (
            <div key={course._id} className="border p-4 rounded">
              <img
                src={course.thumbnail}
                className="h-40 w-full object-cover"
              />
              <h2>{course.title}</h2>
              <p>{course.instructor}</p>

              <button
                onClick={() => handleRemove(course._id)}
                className="bg-red-500 text-white px-3 py-1 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
