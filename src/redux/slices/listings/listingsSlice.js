import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addToast, createFormErrors } from '../errors/errorsSlice';

import listingsService from '../../../services/listingsService';

const initialState = {
  loading: 'idle'
};

const addNewListing = createAsyncThunk(
  'listings/addNewListing',
  async ({ navigate, listing }, { dispatch }) => {
    try {
      const data = await listingsService.addNewListing(listing);

      dispatch(addToast({ type: 'success', message: data.message }));
      navigate(`/dashboard/listing/${data.payload.id}`);
      return data.payload;
    } catch (error) {
      console.log(error);
      error.cause?.toasts.forEach((toastMessage) =>
        dispatch(addToast({ type: 'error', message: toastMessage }))
      );
      if (error.cause.errors === undefined || error.cause.errors === {}) {
        return Promise.reject(error);
      }

      dispatch(createFormErrors(error.cause.errors));
      return Promise.reject(error);
    }
  }
);

// const loadUserByToken = createAsyncThunk(
//   'auth/loadUserByToken',
//   async (token, thunkAPI) => {
//     try {
//       const data = await authService.loadUserByToken(token);

//       return data.payload;
//     } catch (e) {
//       localStorage.removeItem('token');
//       return Promise.reject(e);
//     }
//   }
// );

// const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { dispatch }) => {
//     try {
//       const data = await authService.login(email, password);
//       localStorage.setItem('token', data.payload);

//       const data2 = await authService.loadUserByToken(data.payload);
//       return data2.payload;
//     } catch (e) {
//       dispatch(createFormErrors(e.cause.message));

//       if (localStorage.getItem('token') !== null) {
//         localStorage.removeItem('token');
//       }
//       return Promise.reject(e);
//     }
//   }
// );

// const logout = createAsyncThunk('auth/logout', async (data, { dispatch }) => {
//   if (localStorage.getItem('token') !== null) {
//     localStorage.removeItem('token');
//     return;
//   }

//   return Promise.reject('Not logged in');
// });

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(loadUserByToken.pending, (state, action) => {
    //   state.loading = 'loading';
    // });
    // builder.addCase(loadUserByToken.fulfilled, (state, action) => {
    //   state.loading = 'loggedIn';
    //   state.user = action.payload;
    // });
    // builder.addCase(loadUserByToken.rejected, (state, action) => {
    //   state.loading = 'idle';
    // });
    builder.addCase(addNewListing.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(addNewListing.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(addNewListing.rejected, (state, action) => {
      state.loading = 'idle';
    });
  }
});

export { addNewListing };

export default listingsSlice.reducer;
