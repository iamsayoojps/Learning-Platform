import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourses";
import ViewCourse from "./pages/ViewCourse";
import EditCourse from "./pages/EditCourse";
import Revenue from "./pages/Revenue";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/add" element={<AddCourse />} />
          <Route path="/courses/view/:id" element={<ViewCourse />} />
          <Route path="/courses/edit/:id" element={<EditCourse />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
