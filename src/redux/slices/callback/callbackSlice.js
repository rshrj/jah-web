import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addToast, createFormErrors } from '../errors/errorsSlice';
import { clearTopLoader, setTopLoader } from '../misc/miscSlice';
import callbackService from '../../../services/callbackService';
import { arrayToObject } from '../../../utils/helpers';

const initialState = {
  loading: 'init',
  content:{
    ids:[],
    callbackrequests:{}
  }
};

const submitCallBackRequest = createAsyncThunk(
  'callback/submitCallBackRequest',
  async ({ name, phone, message }, { dispatch }) => {
    try {
      const data = await callbackService.submitCallBackRequest(
        name,
        phone,
        message
      );

      dispatch(addToast({ type: 'success', message: data.message }));
    } catch (error) {
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



const fetchCallBackRequests = createAsyncThunk(
  'callback/fetchCallBackRequests',
  async (arg, { dispatch }) => {
    dispatch(setTopLoader());
    try {
      const data = await callbackService.fetchCallBackRequests();
      dispatch(clearTopLoader());
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

      return Promise.reject(error);
    }
  }
);

const updateState = createAsyncThunk(
  'callback/updateState',
  async ({callbackId, state}, { dispatch }) => {
    try {
     
      const data = await callbackService.updateState(callbackId, state);
      if(data.message){
        dispatch(addToast({ type: 'success', message: data.message }));
      }
      dispatch(fetchCallBackRequests());
      
    } catch (error) {
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

export const callbackSlice = createSlice({
  name: 'callback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitCallBackRequest.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(submitCallBackRequest.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(submitCallBackRequest.rejected, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(fetchCallBackRequests.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchCallBackRequests.fulfilled, (state, action) => {
      state.loading = 'idle';
         state.content.callbackrequests = arrayToObject('_id', action.payload);
         state.content.ids = action.payload.map((r) => r._id);
    });
    builder.addCase(fetchCallBackRequests.rejected, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(updateState.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(updateState.fulfilled, (state, action) => {
      state.loading = 'idle';
    });
    builder.addCase(updateState.rejected, (state, action) => {
      state.loading = 'idle';
    });
  }
});

export { submitCallBackRequest, fetchCallBackRequests, updateState };

export default callbackSlice.reducer;
