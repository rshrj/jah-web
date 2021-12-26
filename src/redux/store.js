import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth/authSlice';
import errorsReducer from './slices/errors/errorsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorsReducer
  }
});

export default store;
