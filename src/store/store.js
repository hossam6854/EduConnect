import { configureStore } from "@reduxjs/toolkit";
import professorReducer from "../features/professors/professorSlice";
import studentReducer from "../features/students/studentSlice";
import courseReducer from "../features/courses/coursesSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['student', 'professor', 'course']
}

const rootReducer = combineReducers({
    student: studentReducer,
    professor: professorReducer,
    course: courseReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export const persistor = persistStore(store)

