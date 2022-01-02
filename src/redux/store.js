import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth/authSlice';
import errorsReducer from './slices/errors/errorsSlice';
import miscReducer from './slices/misc/miscSlice';
import propertyReducer from './slices/property/propertySlice';
import listingsReducer from './slices/listings/listingsSlice';
import usersReducer from './slices/users/usersSlice';
import testimonialsReducer from './slices/testimonials/testimonialsSlice';
import callbackReducer from './slices/callback/callbackSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorsReducer,
    misc: miscReducer,
    property: propertyReducer,
    listings: listingsReducer,
    users: usersReducer,
    testimonials: testimonialsReducer,
    callback: callbackReducer
  }
});

export default store;
