import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addToast, createFormErrors } from '../errors/errorsSlice';

import settingsService from '../../../services/settingsService';
import { clearTopLoader, setTopLoader } from '../misc/miscSlice';

const initialState = {
  loading: 'idle'
};

const submitHomeAdChange = createAsyncThunk(
  'settings/submitHomeAdChange',
  async ({ setValues, ...formData }, { dispatch }) => {
    
    dispatch(setTopLoader());
    try {
      const data = await settingsService.submitHomeAdChange(formData);

      dispatch(addToast({ type: 'success', message: data.message }));
      dispatch(clearTopLoader());
      setValues({
        title: '',
        tagline: '',
        image: '',
        buttonTitle: '',
        buttonLink: '',
        adImage: undefined,
      });
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

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitHomeAdChange.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(submitHomeAdChange.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(submitHomeAdChange.rejected, (state, action) => {
      state.loading = 'idle';
    });
  }
});

export { submitHomeAdChange };

export default settingsSlice.reducer;
