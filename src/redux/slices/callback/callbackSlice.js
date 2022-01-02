import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addToast, createFormErrors } from '../errors/errorsSlice';

import callbackService from '../../../services/callbackService';

const initialState = {
  loading: 'init'
};

const submitCallBackRequest = createAsyncThunk(
  'callback/submitCallBackRequest',
  async ({ name, phone, message }, { dispatch }) => {
    try {
      const data = await callbackService.submitCallBackRequest(
        name,
        phone,
        message
      );

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

export const callbackSlice = createSlice({
  name: 'callback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitCallBackRequest.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(submitCallBackRequest.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(submitCallBackRequest.rejected, (state, action) => {
      state.loading = 'idle';
    });
  }
});

export { submitCallBackRequest };

export default callbackSlice.reducer;
