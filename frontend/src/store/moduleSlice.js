import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modules: [],
  currentModule: null,
  loading: false,
  error: null
};

const moduleSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    fetchModulesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchModulesSuccess: (state, action) => {
      state.loading = false;
      state.modules = action.payload || [];
      state.error = null;
    },
    fetchModulesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentModule: (state, action) => {
      state.currentModule = action.payload;
    }
  }
});

export const {
  fetchModulesStart,
  fetchModulesSuccess,
  fetchModulesFailure,
  setCurrentModule
} = moduleSlice.actions;

export default moduleSlice.reducer;
