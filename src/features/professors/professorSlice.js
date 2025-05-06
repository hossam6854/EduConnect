import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    professors: [],
}

const professorSlice = createSlice({
    name: "professor",
    initialState,
    reducers: {
        addProfessor: (state, action) => {
            state.professors.push(action.payload)
        },
        deleteProfessor: (state, action) => {
            state.professors = state.professors.filter(professor => professor.id !== action.payload)
        },
        editProfessor: (state, action) => {
            state.professors = state.professors.map(professor => professor.id === action.payload.id ? action.payload : professor)
        }
    }
})

export const { addProfessor, deleteProfessor, editProfessor } = professorSlice.actions
export default professorSlice.reducer
