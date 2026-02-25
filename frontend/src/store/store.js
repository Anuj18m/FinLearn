import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import moduleReducer from './moduleSlice';
import quizReducer from './quizSlice';
import progressReducer from './progressSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modules: moduleReducer,
    quiz: quizReducer,
    progress: progressReducer
  }
});

export default store;
