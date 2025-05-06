import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const FormComponent = ({ onSubmit, title, type }) => {
  const initialValues = {
    name: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    type: type,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    age: Yup.number()
      .min(0, "Age cannot be negative")
      .required("Age is required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Select a valid gender")
      .required("Gender is required"),
    address: Yup.string(),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must be numbers only")
      .min(10, "Phone must be at least 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ ...values, id: Date.now() });
    toast.success("Data saved successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
    resetForm();
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {title}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-6">
          {/* Full Name & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Enter full name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Age *
              </label>
              <Field
                type="number"
                name="age"
                placeholder="Enter age"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Gender *
            </label>
            <Field
              as="select"
              name="gender"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Address
            </label>
            <Field
              type="text"
              name="address"
              placeholder="Enter address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone *
            </label>
            <Field
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email *
            </label>
            <Field
              type="email"
              name="email"
              placeholder="Enter email address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password *
            </label>
            <Field
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Save Data
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormComponent;
