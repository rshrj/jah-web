import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import miscService from '../../../services/miscService';
import { addToast } from '../errors/errorsSlice';

const initialState = {
  topLoading: false,
  homead: {
    title: '',
    tagline: '',
    image: '',
    buttonTitle: '',
    buttonLink: ''
  }
};

const getHomeAd = createAsyncThunk(
  'misc/getHomeAd',
  async (arg, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await miscService.getHomeAd();

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

export const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setTopLoader: (state) => {
      state.topLoading = true;
    },
    clearTopLoader: (state) => {
      state.topLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeAd.fulfilled, (state, action) => {
      state.homead.title = action.payload.title;
      state.homead.tagline = action.payload.tagline;
      state.homead.image = action.payload.image;
      state.homead.buttonTitle = action.payload.buttonTitle;
      state.homead.buttonLink = action.payload.buttonLink;
    });
  }
});

export const { setTopLoader, clearTopLoader } = miscSlice.actions;
export { getHomeAd };

export default miscSlice.reducer;
