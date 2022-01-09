import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addToast } from '../errors/errorsSlice';

import usersService from '../../../services/usersService';
import { clearTopLoader, setTopLoader } from '../misc/miscSlice';
import { arrayToObject } from '../../../utils/helpers';

const initialState = {
  loading: 'idle',
  fetchLoading: 'idle',
  content: {
    ids: [],
    users: {},
  },
};

const getUsers = createAsyncThunk(
  'users/getUsers',
  async (arg, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await usersService.getUsers();

      dispatch(clearTopLoader());
      return data.payload;
    } catch (error) {
      console.log(error);
      error.cause?.toasts.forEach((toastMessage) =>
        dispatch(addToast({ type: 'error', message: toastMessage }))
      );
      return Promise.reject(error);
    }
  }
);

const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ userId }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await usersService.deleteUser(userId);
      dispatch(addToast({ type: 'success', message: data.message }));
      dispatch(clearTopLoader());
      dispatch(getUsers());
      return data.payload;
    } catch (error) {
      console.log(error);
      error.cause?.toasts.forEach((toastMessage) =>
        dispatch(addToast({ type: 'error', message: toastMessage }))
      );
      return Promise.reject(error);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      console.log(action.payload);
      state.content.users = arrayToObject('_id', action.payload);
      state.content.ids = action.payload.map((listing) => listing._id);
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
  },
});

export { getUsers, deleteUser };

export default usersSlice.reducer;
