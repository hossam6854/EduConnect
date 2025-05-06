import { useDispatch } from "react-redux";
import { addStudent } from "../features/students/studentSlice";
import Form from "../components/form";
import React, { useCallback } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddStudent = React.memo(() => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((formData) => {
    dispatch(addStudent(formData));
  }, [dispatch]);

  return (
    <div>
      <Form onSubmit={handleSubmit} title="Add Student" type="Student"/>
      <ToastContainer />

    </div>
  );
});

export default AddStudent;