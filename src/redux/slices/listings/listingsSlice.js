import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addToast, createFormErrors } from '../errors/errorsSlice';

import listingsService from '../../../services/listingsService';
import { clearTopLoader, setTopLoader } from '../misc/miscSlice';
import { arrayToObject } from '../../../utils/helpers';

const initialState = {
  loading: 'idle',
  fetchLoading: 'idle',
  content: {
    ids: [],
    listings: {}
  }
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

const getListings = createAsyncThunk(
  'listings/getListings',
  async (arg, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getListings();

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
    builder.addCase(getListings.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getListings.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      console.log(action.payload);
      state.content.listings = arrayToObject('_id', action.payload);
      state.content.ids = action.payload.map((listing) => listing._id);
    });
    builder.addCase(getListings.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
  }
});

export { addNewListing, getListings };

export default listingsSlice.reducer;
