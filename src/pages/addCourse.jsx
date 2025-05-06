import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../features/courses/coursesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddCourse = React.memo(() => {
  const dispatch = useDispatch();
  const professors = useSelector((state) => state.professor.professors);

  // Validation schema خاص بالكورسات فقط
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Course name must be at least 3 characters")
      .required("Course name is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    type: Yup.string().required("Course type is required"),
    professorName: Yup.string().required("Professor is required"),
  });

  const initialValues = {
    name: "",
    description: "",
    professorName: "",
    students: [],
    type: "Course",
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      addCourse({
        ...values,
        id: Date.now(),
      })
    );
    toast.success("Course added successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
    resetForm();
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add New Course
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-6">
          {/* Course Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2 text-sm">
              Course Name *
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Enter course name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2 text-sm">
              Description *
            </label>
            <Field
              as="textarea"
              name="description"
              rows="4"
              placeholder="Enter course description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Course Type */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2 text-sm">
              Course Type *
            </label>
            <Field
              as="select"
              name="type"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Course">Course</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
            </Field>
            <ErrorMessage
              name="type"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Professor Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2 text-sm">
              Professor *
            </label>
            <Field
              as="select"
              name="professorName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Professor</option>
              {professors?.map((professor) => (
                <option key={professor.id} value={professor.name}>
                  {professor.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="professorName"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add Course
            </button>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
});

export default AddCourse;