import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Logo / Site Name */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold mb-4">EduConnect</h1>
          <p className="text-gray-400 text-sm">
            Empowering students and professors with modern education tools.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/services" className="hover:text-blue-400 transition">Services</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About Us</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-end space-x-5">
          <a href="#" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-xl">
            <FaFacebookF />
          </a>
          <a href="#" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-xl">
            <FaTwitter />
          </a>
          <a href="#" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-xl">
            <FaInstagram />
          </a>
          <a href="#" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-xl">
            <FaLinkedinIn />
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EduConnect. All Rights Reserved.
      </div>
    </footer>
  );
}
