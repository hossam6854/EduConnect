import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load page components
const AddStudent = lazy(() => import("./pages/addStudent"));
const AddProfessor = lazy(() => import("./pages/addProfessor"));
const AddCourse = lazy(() => import("./pages/addCourse"));
const Login = lazy(() => import("./pages/login"));
const Courses = lazy(() => import("./pages/courses"));
const CourseDetails = lazy(() => import("./pages/Courses/courseDetails"));
const Home = lazy(() => import("./pages/home"));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="pt-16 pb-10">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addStudent" element={<AddStudent />} />
            <Route path="/addProfessor" element={<AddProfessor />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/courses/courseDetails/:id"
              element={<CourseDetails />}
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}