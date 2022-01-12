import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addToast, createFormErrors } from '../errors/errorsSlice';

import authService from '../../../services/authService';

const initialState = {
  loading: 'init',
  user: {},
  forgotPassword: {
    requestSent: false,
    isValidToken: false,
    token: '',
    resetDone: false,
  },
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

      dispatch(addToast({ type: 'success', message: data.message }));
      const data2 = await authService.loadUserByToken(data.payload);
      return data2.payload;
    } catch (error) {
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }
      if (error.cause.errors !== undefined || error.cause.errors !== {}) {
        dispatch(createFormErrors(error.cause.errors));
      }

      if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  }
);

const signup = createAsyncThunk(
  'auth/signup',
  async (formData, { dispatch }) => {
    try {
      const data = await authService.signup(formData);

      localStorage.setItem('token', data.payload);
      dispatch(addToast({ type: 'success', message: data.message }));

      const data2 = await authService.loadUserByToken(data.payload);
      return data2.payload;
    } catch (error) {
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }
      if (error.cause.errors !== undefined || error.cause.errors !== {}) {
        dispatch(createFormErrors(error.cause.errors));
      }

      if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  }
);

const logout = createAsyncThunk('auth/logout', async (data, { dispatch }) => {
  if (localStorage.getItem('token') !== null) {
    localStorage.removeItem('token');
    return;
  }

  dispatch(addToast({ type: 'error', message: 'Logged out successfully!' }));

  return Promise.reject('Not logged in');
});

const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { dispatch }) => {
    try {
      const data = await authService.forgotPassword(email);
      dispatch(addToast({ type: 'success', message: data.message }));
      return;
    } catch (error) {
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }
      if (error.cause.errors !== undefined || error.cause.errors !== {}) {
        dispatch(createFormErrors(error.cause.errors));
      }

      if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  }
);

const verifyResetToken = createAsyncThunk(
  'auth/verifyResetToken',
  async ({ token }, { dispatch }) => {
    try {
      const data = await authService.verifyResetToken(token);
      dispatch(addToast({ type: 'success', message: data.message }));
      return data.payload;
    } catch (error) {
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }
      if (error.cause.errors !== undefined || error.cause.errors !== {}) {
        dispatch(createFormErrors(error.cause.errors));
      }

      if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  }
);

const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async ({ setCheck, setVerified, token }, { dispatch }) => {
    try {
      const data = await authService.verifyToken(token);
      setCheck(false);
      setVerified(true);
      dispatch(addToast({ type: 'success', message: data.message }));
      return data.payload;
    } catch (error) {
      setCheck(false);
      setVerified(false);
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }
      if (error.cause.errors !== undefined || error.cause.errors !== {}) {
        dispatch(createFormErrors(error.cause.errors));
      }

      if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  }
);

const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password, password2 }, { dispatch }) => {
    try {
      const data = await authService.resetPassword({
        token,
        password,
        password2,
      });
      dispatch(addToast({ type: 'success', message: data.message }));
      return;
    } catch (error) {
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }
      if (error.cause.errors !== undefined || error.cause.errors !== {}) {
        dispatch(createFormErrors(error.cause.errors));
      }

      if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyToken.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.forgotPassword.resetDone = true;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(verifyResetToken.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(verifyResetToken.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.forgotPassword.isValidToken = true;
      state.user = action.payload;
    });
    builder.addCase(verifyResetToken.rejected, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.forgotPassword.requestSent = true;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(signup.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = 'loggedIn';
      state.user = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = 'idle';
    });

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
  },
});

export {
  loadUserByToken,
  login,
  logout,
  signup,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  verifyToken,
};

export default authSlice.reducer;
