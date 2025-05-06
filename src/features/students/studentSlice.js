import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    students: [],
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.students.push(action.payload)
        },
        deleteStudent: (state, action) => {
            state.students = state.students.filter(student => student.id !== action.payload)
        },
        editStudent: (state, action) => {
            state.students = state.students.map(student => student.id === action.payload.id ? action.payload : student)
        }
    }
})

export const { addStudent, deleteStudent, editStudent } = studentSlice.actions
export default studentSlice.reducer

