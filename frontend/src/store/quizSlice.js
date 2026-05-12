import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuiz: null,
  quizResult: null,
  loading: false,
  error: null
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    fetchQuizStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchQuizSuccess: (state, action) => {
      state.loading = false;
      state.currentQuiz = action.payload.data;
      state.error = null;
    },
    fetchQuizFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    submitQuizStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    submitQuizSuccess: (state, action) => {
      state.loading = false;
      state.quizResult = action.payload.data;
      state.error = null;
    },
    submitQuizFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearQuizResult: (state) => {
      state.quizResult = null;
    }
  }
});

export const {
  fetchQuizStart,
  fetchQuizSuccess,
  fetchQuizFailure,
  submitQuizStart,
  submitQuizSuccess,
  submitQuizFailure,
  clearQuizResult
} = quizSlice.actions;

export default quizSlice.reducer;
