import React from 'react';
import { Link } from 'react-router-dom';
import Img from "../assets/hero1.png"

const Home = React.memo(function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">

      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 gap-10">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Discover <span className="text-blue-500">Your Future</span> with Us
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Connect with professors, explore new courses, and be part of an inspiring educational community.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        <div className="md:w-1/4 flex justify-center">
          <img
            src={Img}
            alt="Hero Illustration"
            className="w-full max-w-md"
            loading="lazy"
          />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Our Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Service 1 */}
            <div className="bg-blue-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Course Management</h3>
              <p className="text-gray-600">
                Manage your enrolled courses, track your progress, and access course materials easily.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-purple-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold text-purple-600 mb-4">Student-Professor Connect</h3>
              <p className="text-gray-600">
                Communicate directly with professors, ask questions, and get support anytime.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-pink-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold text-pink-600 mb-4">Secure Authentication</h3>
              <p className="text-gray-600">
                Sign up and login securely to protect your personal and academic information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADMIN TOOLS SECTION */}
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Admin Tools</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <Link to="/addStudent" className="bg-white border border-blue-100 hover:shadow-xl rounded-3xl p-6 transition">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Add Student</h3>
        <p className="text-gray-600">Register new students into the system.</p>
      </Link>

      <Link to="/addProfessor" className="bg-white border border-purple-100 hover:shadow-xl rounded-3xl p-6 transition">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">Add Professor</h3>
        <p className="text-gray-600">Add new professors with relevant info.</p>
      </Link>

      <Link to="/addCourse" className="bg-white border border-pink-100 hover:shadow-xl rounded-3xl p-6 transition">
        <h3 className="text-xl font-semibold text-pink-600 mb-2">Add Course</h3>
        <p className="text-gray-600">Create a course and assign a professor.</p>
      </Link>
    </div>
  </div>
</section>


      {/* ABOUT US SECTION */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">About Us</h2>
          <p className="text-gray-600 text-lg mb-10">
            We are a passionate team committed to transforming education through technology.
            Our mission is to empower students and professors by making learning and teaching
            accessible, interactive, and inspiring.
          </p>
          <Link
            to="/login"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Join Us Today
          </Link>
        </div>
      </section>

    </div>
  );
});
export default Home;
