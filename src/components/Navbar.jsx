import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { auth, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolling ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">EduConnect</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-semibold">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          {auth.isLoggedIn && (
            <>
              <Link to="/courses" className="hover:text-blue-500 transition">
                Courses
              </Link>
              <Link
                to="/login"
                className="hover:text-blue-500 transition"
                onClick={logout}
              >
                Logout
              </Link>
             </>
          )}
          
        
          {!auth.isLoggedIn && (
            <>
            <Link to="/login" className="hover:text-blue-500 transition">
              Login
            </Link>
            <Link to="/addStudent" className="hover:text-blue-500 transition">
              Register
            </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden text-2xl text-gray-700" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pt-4 pb-6 space-y-4 text-gray-700 font-semibold shadow-md">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block hover:text-blue-500 transition"
          >
            Home
          </Link>

          {auth.isLoggedIn && (
            <>
            <Link
              to="/courses"
            className="block hover:text-blue-500 transition"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            <Link
            to="/login"
            className="block hover:text-blue-500 transition"
            onClick={toggleMenu}
          >
            Logout
          </Link>
          </>
          )}


          {!auth.isLoggedIn && (
            <>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block hover:text-blue-500 transition"
              >
              Login
            </Link>
            <Link
              to="/addStudent"
              onClick={toggleMenu}
              className="block hover:text-blue-500 transition"
              >
              Register
            </Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
}
