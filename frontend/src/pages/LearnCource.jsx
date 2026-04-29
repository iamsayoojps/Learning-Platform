import React from "react";
import { useParams } from "react-router-dom";

const LearnCourse = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Start Learning 📚
        </h1>

        <p className="text-gray-600 mb-6">Course ID: {id}</p>

        <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center text-white text-xl">
          Course Video Section
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Course Content</h2>

          <ul className="space-y-2 text-gray-700">
            <li>✔ Introduction</li>
            <li>✔ Module 1</li>
            <li>✔ Module 2</li>
            <li>✔ Final Project</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LearnCourse;
