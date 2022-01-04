import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addToast, createFormErrors } from '../errors/errorsSlice';

import testimonialsService from '../../../services/testimonialsService';
import { clearTopLoader, setTopLoader } from '../misc/miscSlice';
import { arrayToObject } from '../../../utils/helpers';

const initialState = {
  loading: 'idle',
  fetchLoading: 'idle',
  content: {
    ids: [],
    testimonials: {}
  }
};

const getTestimonials = createAsyncThunk(
  'testimonials/getTestimonials',
  async (arg, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await testimonialsService.getTestimonials();

      dispatch(clearTopLoader());
      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
      console.log(error);
      error.cause?.toasts.forEach((toastMessage) =>
        dispatch(addToast({ type: 'error', message: toastMessage }))
      );
      return Promise.reject(error);
    }
  }
);

const submitTestimonial = createAsyncThunk(
  'testimonials/submitTestimonial',
  async (formData, { dispatch }) => {
    try {
      const data = await testimonialsService.submitTestimonial(formData);

      dispatch(addToast({ type: 'success', message: data.message }));
    } catch (error) {
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }
      if (error.cause.errors !== undefined || error.cause.errors !== {}) {
        dispatch(createFormErrors(error.cause.errors));
      }

      return Promise.reject(error);
    }
  }
);

export const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTestimonials.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getTestimonials.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      state.content.testimonials = arrayToObject('_id', action.payload);
      state.content.ids = action.payload.map((listing) => listing._id);
    });
    builder.addCase(getTestimonials.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
  }
});

export { getTestimonials, submitTestimonial };

export default testimonialsSlice.reducer;
