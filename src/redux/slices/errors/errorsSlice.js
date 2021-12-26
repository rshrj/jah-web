import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formErrors: {},
  toastErrors: {}
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    createFormErrors: (state, action) => {
      state.formErrors = action.payload;
    },
    clearFormErrors: (state) => {
      state.formErrors = {};
    },
    createToastErrors: (state, action) => {
      state.toastErrors = action.payload;
    },
    clearToastErrors: (state) => {
      state.toastErrors = {};
    }
  }
});

export const {
  createFormErrors,
  clearFormErrors,
  createToastErrors,
  clearToastErrors
} = errorsSlice.actions;

export default errorsSlice.reducer;
