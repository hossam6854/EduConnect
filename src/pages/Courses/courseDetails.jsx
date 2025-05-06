import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  studentEnrolled,
  addRating,
} from "../../features/courses/coursesSlice";
import { useAuth } from "../../context/AuthContext";
import { FiX } from "react-icons/fi";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CourseDetails = React.memo(() => {
  const [rating, setRating] = useState("");
  const [hoverRating, setHoverRating] = useState(null);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.course);
  const courseId = useMemo(
    () => Number(window.location.pathname.split("/").pop()),
    []
  );
  const course = useMemo(
    () => courses.find((course) => course.id === courseId),
    [courses, courseId]
  );
  const { auth } = useAuth();
  const navigate = useNavigate();

  const isStudent = useMemo(() => auth.role === "Student", [auth.role]);

  const isEnrolled = useMemo(
    () => course?.students?.some((s) => s.userId === auth.userId),
    [course, auth.userId]
  );
  
  const userRating = useMemo(
    () => course?.ratings?.find((r) => r.userId === auth.userId),
    [course, auth.userId]
  );

  const averageRating = useMemo(
    () =>
      course?.ratings?.length
        ? (
            course.ratings.reduce((acc, r) => acc + r.rating, 0) /
            course.ratings.length
          ).toFixed(1)
        : 0,
    [course]
  );

  const handleEnroll = useCallback(() => {
    if (isStudent && !isEnrolled) {
      dispatch(
        studentEnrolled({
          id: course.id,
          student: auth.userId,
          userId: auth.userId,
          username: auth.username,
          role: auth.role,
        })
      );
    }
  }, [isStudent, isEnrolled, dispatch, course, auth]);

  const handleRating = useCallback(() => {
    if (isStudent) {
      dispatch(
        addRating({
          id: course.id,
          rating: Number(rating),
          userId: auth.userId,
          username: auth.username,
          role: auth.role,
        })
      );
    }
  }, [isStudent, dispatch, course, rating, auth]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);


  if (!course) return <p>Course not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handleBack}
                  >
                    <BiLeftArrow />
                    Back
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {course.name}
                  </h1>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiX
                          key={star}
                          className={`h-5 w-5 ${
                            star <= averageRating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">
                        {averageRating} ({course.ratings?.length || 0} ratings)
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-600">
                      {course.students?.length || 0} students enrolled
                    </span>
                  </div>
                </div>
                {auth.isLoggedIn && isStudent && !isEnrolled && (
                  <button
                    onClick={handleEnroll}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Enroll Now
                  </button>
                )}
              </div>

              <div className="prose max-w-none text-gray-700 mb-8">
                <p className="text-lg">{course.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Course Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Duration
                    </h3>
                    <p className="text-gray-900">8 weeks</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Level</h3>
                    <p className="text-gray-900">Intermediate</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Language
                    </h3>
                    <p className="text-gray-900">English</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Certificate
                    </h3>
                    <p className="text-gray-900">Yes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Student Reviews
              </h2>

              {auth.isLoggedIn && isStudent && isEnrolled && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">
                    {userRating ? "Update your rating" : "Rate this course"}
                  </h3>
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="focus:outline-none"
                      >
                        <FiX
                          className={`h-8 w-8 ${
                            (hoverRating || rating) >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleRating}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    {userRating ? "Update Rating" : "Submit Rating"}
                  </button>
                  {userRating && (
                    <p className="mt-2 text-sm text-gray-600">
                      Your current rating: {userRating.rating}/5
                    </p>
                  )}
                </div>
              )}

              {course.ratings?.length > 0 ? (
                <div className="space-y-6">
                  {course.ratings.map((r, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                          {r.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">
                            {r.username}
                          </h4>
                          <p className="text-sm text-gray-500">{r.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiX
                            key={star}
                            className={`h-5 w-5 ${
                              star <= r.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        {r.comment || "No additional comments provided."}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-80 space-y-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h3 className="font-bold text-lg mb-4">Course Highlights</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>30+ hours of video content</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>15 practical exercises</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Downloadable resources</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Certificate of completion</span>
              </li>
            </ul>
          </div>

          {isEnrolled && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <h3 className="font-bold text-lg mb-4">Your Progress</h3>
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>Completed</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <button className="mt-4 w-full bg-indigo-100 text-indigo-700 py-2 rounded-md font-medium hover:bg-indigo-200 transition-colors">
                Continue Learning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CourseDetails;
