import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  formErrors: {},
  toastErrors: {
    ids: [],
    errors: {}
  }
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    createFormErrors: (state, action) => {
      state.formErrors = { ...action.payload };
    },
    clearFormErrors: (state) => {
      state.formErrors = {};
    },
    addToast: (state, action) => {
      let id = nanoid(6);
      state.toastErrors.ids.push(id);
      state.toastErrors.errors[id] = action.payload;
    },
    clearToast: (state, action) => {
      delete state.toastErrors.errors[action.payload];
      state.toastErrors.ids = state.toastErrors.ids.filter(
        (id) => id !== action.payload
      );
    }
  }
});

export const { createFormErrors, clearFormErrors, addToast, clearToast } =
  errorsSlice.actions;

export default errorsSlice.reducer;
