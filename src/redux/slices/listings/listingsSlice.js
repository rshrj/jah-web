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
  },
  single: {},
  buyproperties: {
    ids: [],
    listings: {}
  },
  rentproperties: {
    ids: [],
    listings: {}
  },

  featured: {
    buy: {
      ids: [],
      listings: {}
    },
    rent: {
      ids: [],
      listings: {}
    }
  }
};

const getListingById = createAsyncThunk(
  'listings/getListingById',
  async ({ id, values, setValues }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getPublicListingById(id);

      dispatch(clearTopLoader());

      console.log(data.payload);
      let type = data.payload.type;
      setValues({
        ...values,
        _id: data.payload._id,
        type,
        [type]: { ...data.payload[type], name: data.payload.name }
      });

      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

const addNewListing = createAsyncThunk(
  'listings/addNewListing',
  async ({ navigate, listing }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.addNewListing(listing);
      dispatch(clearTopLoader());

      dispatch(addToast({ type: 'success', message: data.message }));
      navigate(`/listing/${data.payload._id}`);
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

const updateListing = createAsyncThunk(
  'listings/updateListing',
  async ({ navigate, listing }, { dispatch }) => {
    console.log(listing);
    dispatch(setTopLoader());
    try {
      const data = await listingsService.updateListing(listing);
      dispatch(clearTopLoader());

      dispatch(addToast({ type: 'success', message: data.message }));
      console.log(`/listing/${data.payload._id}`);
      navigate(`/listing/${data.payload._id}`);
      return data.payload;
    } catch (error) {
      console.log(error);
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

const getListings = createAsyncThunk(
  'listings/getListings',
  async (arg, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getListings();
      console.log('listings', data.payload);
      dispatch(clearTopLoader());
      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

const getFeaturedListings = createAsyncThunk(
  'listings/getFeaturedListings',
  async (arg, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getFeaturedListings();
      dispatch(clearTopLoader());

      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
      console.log(error.cause);
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

const getBuyProperties = createAsyncThunk(
  'listings/getBuyProperties',
  async ({ size, page }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getParticularListing(
        ['sellapartment', 'sellproject'],
        page,
        size
      );
      dispatch(clearTopLoader());

      return data.payload;
    } catch (error) {
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

const getRentBuyProperties = createAsyncThunk(
  'listings/getRentBuyProperties',
  async ({ size, page }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getParticularListing(
        ['rentlease'],
        page,
        size
      );
      dispatch(clearTopLoader());

      return data.payload;
    } catch (error) {
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

const getPublicListingById = createAsyncThunk(
  'listings/getPublicListingById',
  async (listingId, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getPublicListingById(listingId);

      dispatch(clearTopLoader());
      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

const getRelatedListings = createAsyncThunk(
  'listings/getRelatedListings',
  async (listingId, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getRelatedListings(listingId);

      dispatch(clearTopLoader());
      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

const getListingsFuzzy = createAsyncThunk(
  'listings/getListingsFuzzy',
  async ({ query, type }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.getListingsFuzzy(query, type);
      dispatch(clearTopLoader());
      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);


const deleteListing = createAsyncThunk(
  'listings/deleteListing',
  async ({ listingId }, { dispatch }) => {
    console.log(listingId);
    console.log('Called');
    dispatch(setTopLoader());
    try {
      const data = await listingsService.deleteListing(listingId);
      dispatch(addToast({ type: 'success', message: data.message }));
      dispatch(clearTopLoader());
      dispatch(getListings());
      return data.payload;
      
    } catch (error) {
      dispatch(clearTopLoader());
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

const updateListingState = createAsyncThunk(
  'listings/updateListingState',
  async ({ listingId, state }, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await listingsService.updateListingState({
        listingId,
        state,
      });
      dispatch(addToast({ type: 'success', message: data.message }));
      dispatch(clearTopLoader());
      dispatch(getListings());
      return data.payload;
    } catch (error) {
      dispatch(clearTopLoader());
      if (error.cause.toasts !== undefined && error.cause.toasts.length > 0) {
        error.cause.toasts.forEach((toastMessage) =>
          dispatch(addToast({ type: 'error', message: toastMessage }))
        );
      }

      return Promise.reject(error);
    }
  }
);

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateListingState.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(updateListingState.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(updateListingState.rejected, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteListing.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(deleteListing.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteListing.rejected, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(getListingById.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(getListingById.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(getListingById.rejected, (state, action) => {
      state.loading = 'idle';
    });

    builder.addCase(addNewListing.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(addNewListing.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(addNewListing.rejected, (state, action) => {
      state.loading = 'idle';
    });

    builder.addCase(updateListing.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(updateListing.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(updateListing.rejected, (state, action) => {
      state.loading = 'idle';
    });

    builder.addCase(getListings.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getListings.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      state.content.listings = arrayToObject('_id', action.payload);
      state.content.ids = action.payload.map((listing) => listing._id);
    });
    builder.addCase(getListings.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });

    builder.addCase(getPublicListingById.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getPublicListingById.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      state.single = { ...action.payload };
    });
    builder.addCase(getPublicListingById.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
    builder.addCase(getRelatedListings.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getRelatedListings.fulfilled, (state, action) => {
      state.content.listings = arrayToObject('_id', action.payload);
      state.content.ids = action.payload.map((listing) => listing._id);
      state.fetchLoading = 'idle';
    });
    builder.addCase(getRelatedListings.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });

    builder.addCase(getListingsFuzzy.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getListingsFuzzy.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      state.content.listings = arrayToObject('_id', action.payload);
      state.content.ids = action.payload.map((listing) => listing._id);
    });
    builder.addCase(getListingsFuzzy.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
    builder.addCase(getBuyProperties.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getBuyProperties.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      state.buyproperties.listings = arrayToObject('_id', action.payload);
      state.buyproperties.ids = action.payload.map((listing) => listing._id);
    });
    builder.addCase(getBuyProperties.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
    builder.addCase(getRentBuyProperties.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getRentBuyProperties.fulfilled, (state, action) => {
      state.fetchLoading = 'idle';
      state.rentproperties.listings = arrayToObject('_id', action.payload);
      state.rentproperties.ids = action.payload.map((listing) => listing._id);
    });
    builder.addCase(getRentBuyProperties.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });

    builder.addCase(getFeaturedListings.pending, (state, action) => {
      state.fetchLoading = 'loading';
    });
    builder.addCase(getFeaturedListings.fulfilled, (state, action) => {
      state.featured.buy.listings = arrayToObject('_id', action.payload.buy);
      state.featured.buy.ids = action.payload.buy.map((listing) => listing._id);
      state.featured.rent.listings = arrayToObject('_id', action.payload.rent);
      state.featured.rent.ids = action.payload.rent.map(
        (listing) => listing._id
      );
      state.fetchLoading = 'idle';
    });
    builder.addCase(getFeaturedListings.rejected, (state, action) => {
      state.fetchLoading = 'idle';
    });
  }
});

export {
  getListingById,
  addNewListing,
  updateListing,
  getListings,
  getPublicListingById,
  getListingsFuzzy,
  getBuyProperties,
  getRentBuyProperties,
  getFeaturedListings,
  getRelatedListings,
  deleteListing,
  updateListingState,
};

export default listingsSlice.reducer;
