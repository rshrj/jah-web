import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createFormErrors } from '../errors/errorsSlice';

import authService from '../../../services/authService';

const initialState = {
  loading: 'init',
  user: {}
};

const loadUserByToken = createAsyncThunk(
  'auth/loadUserByToken',
  async (token, thunkAPI) => {
    try {
      const data = await authService.loadUserByToken(token);

      return data.payload;
    } catch (e) {
      localStorage.removeItem('token');
      return Promise.reject(e);
    }
  }
);

const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch }) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.payload);

      const data2 = await authService.loadUserByToken(data.payload);
      return data2.payload;
    } catch (e) {
      dispatch(createFormErrors(e.cause.message));

      if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
      }
      return Promise.reject(e);
    }
  }
);

const logout = createAsyncThunk('auth/logout', async (data, { dispatch }) => {
  if (localStorage.getItem('token') !== null) {
    localStorage.removeItem('token');
    return;
  }

  return Promise.reject('Not logged in');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUserByToken.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(loadUserByToken.fulfilled, (state, action) => {
      state.loading = 'loggedIn';
      state.user = action.payload;
    });
    builder.addCase(loadUserByToken.rejected, (state, action) => {
      state.loading = 'idle';
    });

    builder.addCase(login.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = 'loggedIn';
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = 'idle';
      state.user = {};
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.loading = 'idle';
      state.user = {};
    });
  }
});

export { loadUserByToken, login, logout };

export default authSlice.reducer;
