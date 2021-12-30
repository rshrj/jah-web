import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth/authSlice';
import errorsReducer from './slices/errors/errorsSlice';
import miscReducer from './slices/misc/miscSlice';
import propertyReducer from './slices/property/propertySlice';
import listingsReducer from './slices/listings/listingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorsReducer,
    misc: miscReducer,
    property: propertyReducer,
    listings: listingsReducer
  }
});

export default store;
