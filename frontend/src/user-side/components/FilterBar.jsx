import React, { useState } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

const FilterBar = ({
  onSortChange,
  onCategoryChange,
  onPriceTypeChange,
  onClearFilters,
}) => {
  const [sort, setSort] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [priceType, setPriceType] = useState("");

  const categories = ["Development", "AI", "Fitness", "Cooking"];

  const handleSort = (value) => {
    setSort(value);
    onSortChange(value);
  };

  const handleCategory = (cat) => {
    if (activeCategory === cat) {
      setActiveCategory("");
      onCategoryChange("");
    } else {
      setActiveCategory(cat);
      onCategoryChange(cat);
    }
  };

  const handlePriceType = (type) => {
    if (priceType === type) {
      setPriceType("");
      onPriceTypeChange("");
    } else {
      setPriceType(type);
      onPriceTypeChange(type);
    }
  };

  const handleClear = () => {
    setSort("");
    setActiveCategory("");
    setPriceType("");
    onClearFilters();
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm rounded-xl p-4 md:p-5 mb-6 border">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium shadow-sm">
            <SlidersHorizontal size={16} />
            Filters
          </div>

          <button
            onClick={handleClear}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 shadow-sm
              ${
                !activeCategory && !priceType
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            🧾 All
          </button>

          <button
            onClick={() => handlePriceType("free")}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 shadow-sm
              ${
                priceType === "free"
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white scale-105"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            💸 Free
          </button>

          <button
            onClick={() => handlePriceType("paid")}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 shadow-sm
              ${
                priceType === "paid"
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white scale-105"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            💰 Paid
          </button>

          <button className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-yellow-400 hover:text-white transition-all duration-200 shadow-sm">
            ⭐ Top Rated
          </button>

          <button
            onClick={handleClear}
            className="px-3 py-1.5 text-sm text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition-all duration-200"
          >
            ✖ Clear
          </button>
        </div>

        {/* 🔥 Styled Sort Section */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition">
          <ArrowUpDown size={16} className="text-gray-600" />

          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
          >
            <option value="">Sort</option>
            <option value="low-high">💰 Price: Low → High</option>
            <option value="high-low">💸 Price: High → Low</option>
            <option value="newest">🆕 Newest</option>
            <option value="oldest">📅 Oldest</option>
          </select>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t my-4"></div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 shadow-sm
              ${
                activeCategory === cat
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
