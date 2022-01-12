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

const getAllTestimonials = createAsyncThunk(
  'testimonials/getAllTestimonials',
  async (arg, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await testimonialsService.getAllTestimonials();

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

const updateTestimonialState = createAsyncThunk(
  'testimonials/updateTestimonialState',
  async ({ testimonialId, show }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await testimonialsService.updateTestimonialState({
        testimonialId,
        show
      });
      dispatch(addToast({ type: 'success', message: data.message }));
      dispatch(clearTopLoader());
      dispatch(getAllTestimonials());
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

const updateTestimonial = createAsyncThunk(
  'testimonials/updateTestimonial',
  async (
    { testimonialId, name, company, message, phone, cancelHandler },
    { dispatch }
  ) => {
    dispatch(setTopLoader());
    try {
      const data = await testimonialsService.updateTestimonial({
        testimonialId,
        name,
        company,
        message,
        phone,
        cancelHandler
      });
      dispatch(addToast({ type: 'success', message: data.message }));
      dispatch(clearTopLoader());
      cancelHandler();
      dispatch(getAllTestimonials());
      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
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

const deleteTestimonial = createAsyncThunk(
  'testimonials/deleteTestimonial',
  async ({ testimonialId }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await testimonialsService.deleteTestimonial({
        testimonialId
      });
      dispatch(addToast({ type: 'success', message: data.message }));
      dispatch(clearTopLoader());
      dispatch(getAllTestimonials());
    } catch (error) {
      dispatch(clearTopLoader());
      console.log(error);
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }
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
  extraReducers: (builder) => {
    builder.addCase(updateTestimonial.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(updateTestimonial.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(updateTestimonial.rejected, (state, action) => {
      state.loading = 'idle';
    });

    builder.addCase(submitTestimonial.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(submitTestimonial.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(submitTestimonial.rejected, (state, action) => {
      state.loading = 'idle';
    });

    builder.addCase(deleteTestimonial.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
    });
    builder.addCase(deleteTestimonial.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });

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

    builder.addCase(getAllTestimonials.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getAllTestimonials.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      state.content.testimonials = arrayToObject('_id', action.payload);
      state.content.ids = action.payload.map((listing) => listing._id);
    });
    builder.addCase(getAllTestimonials.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });

    builder.addCase(updateTestimonialState.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(updateTestimonialState.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
    });
    builder.addCase(updateTestimonialState.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
  }
});

export {
  getTestimonials,
  submitTestimonial,
  getAllTestimonials,
  updateTestimonialState,
  deleteTestimonial,
  updateTestimonial
};

export default testimonialsSlice.reducer;
