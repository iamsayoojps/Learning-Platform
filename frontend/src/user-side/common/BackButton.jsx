import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="
        flex items-center gap-2
        bg-gradient-to-r from-blue-600 to-red-600
        text-white font-semibold
        px-6 py-3
        rounded-full
        shadow-lg
        hover:scale-105 hover:shadow-xl
        transition-all duration-300
      "
    >
      <span className="text-lg"></span>
      Back to Home
    </button>
  );
};

export default BackButton;
