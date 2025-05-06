import React from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
export default function Courses() { 
   const navigate = useNavigate();

  const courses = useSelector((state) => state.course.course);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Courses</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn from industry experts with hands-on projects and real-world applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map(course => {
  const averageRating = course.ratings?.length
    ? (course.ratings.reduce((acc, r) => acc + r.rating, 0) / course.ratings.length).toFixed(1)
    : 'غير مقيم';
    return (
      <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full" onClick={() => navigate(`/courses/courseDetails/${course.id}`)}>            {/* Course Image Placeholder - you might want to add imageUrl to your course data */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{course.name.charAt(0)}</span>
            </div>
            
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{course.name}</h2>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
        ⭐ {averageRating}
      </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="flex items-center mr-4">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {course.students.length} students
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {course.duration || '8 weeks'}
                </span>
              </div>
              
            </div>
            
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-sm">{course.professorName ? course.professorName.split(' ').map(n => n[0]).join('') : ''}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{course.professorName}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">${course.price || '49.99'}</span>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}