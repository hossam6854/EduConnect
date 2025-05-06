import { useDispatch } from "react-redux";
import { addProfessor } from "../features/professors/professorSlice";
import Form from "../components/form";
import React, { useCallback } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProfessor = React.memo(() => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((formData) => {
    dispatch(addProfessor(formData));
  }, [dispatch]);

  return (
    <div>
      <Form onSubmit={handleSubmit} title="Add Professor" type="Professor"/>
      <ToastContainer />
    </div>
  );
});

export default AddProfessor;