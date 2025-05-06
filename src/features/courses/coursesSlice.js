import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    course: [],
}

const coursesSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        addCourse: (state, action) => {
            if (!Array.isArray(state.course)) {
                state.course = [];
            }
            state.course.push(action.payload);
        },
        deleteCourse: (state, action) => {
            state.course = state.course.filter(course => course.id !== action.payload)
        },
        editCourse: (state, action) => {
            state.course = state.course.map(course => course.id === action.payload.id ? action.payload : course)
        },
        studentEnrolled: (state, action) => {
            state.course = state.course.map(course => {
                if (course.id === action.payload.id) {
                    if (!course.students) course.students = [];
                    const alreadyEnrolled = course.students.find(s => s.userId === action.payload.userId);
                    if (!alreadyEnrolled) {
                        course.students.push({
                            studentId: action.payload.student,
                            userId: action.payload.userId,
                            username: action.payload.username,
                            role: action.payload.role
                        });
                    }
                }
                return course;
            });
        },
        addRating: (state, action) => {
            state.course = state.course.map(course => {
                if (course.id === action.payload.id) {
                    if (!course.ratings) course.ratings = [];
                    const existingRating = course.ratings.find(r => r.userId === action.payload.userId);
                    if (existingRating) {
                        course.ratings = course.ratings.map(r =>
                            r.userId === action.payload.userId 
                                ? { ...r, rating: action.payload.rating }
                                : r
                        );
                    } else {
                        course.ratings.push({
                            rating: action.payload.rating,
                            userId: action.payload.userId,
                            username: action.payload.username,
                            role: action.payload.role
                        });
                    }
                }
                return course;
            });
        }
    }
});

export const { addCourse, deleteCourse, editCourse, studentEnrolled, addRating } = coursesSlice.actions
export default coursesSlice.reducer
