import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topLoading: false
};

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
  }
});

export const { setTopLoader, clearTopLoader } = miscSlice.actions;

export default miscSlice.reducer;
