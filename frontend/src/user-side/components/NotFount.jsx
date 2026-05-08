import React from "react";
import BackButton from "../common/BackButton";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-800 text-white">
      {/* Center Content */}
      <div className="flex items-center justify-center flex-1 text-2xl">
        404 - Page Not Found
      </div>

      {/*Back Button */}
      <div className="flex justify-center pb-70">
        <BackButton />
      </div>
    </div>
  );
};

export default NotFound;
