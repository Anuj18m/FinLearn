import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  progress: [],
  stats: null,
  loading: false,
  error: null
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    fetchProgressStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProgressSuccess: (state, action) => {
      state.loading = false;
      state.progress = action.payload || [];
      state.error = null;
    },
    fetchProgressFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchStatsSuccess: (state, action) => {
      state.stats = action.payload;
    }
  }
});

export const {
  fetchProgressStart,
  fetchProgressSuccess,
  fetchProgressFailure,
  fetchStatsSuccess
} = progressSlice.actions;

export default progressSlice.reducer;
