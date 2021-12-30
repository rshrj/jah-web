export const apiUrl = process.env.REACT_APP_APIURL || 'http://localhost:5000';

export const errorWithToast = (message) =>
  new Error(message, {
    cause: {
      success: false,
      toasts: [message]
    }
  });

export const rejectWithToast = (message) =>
  Promise.reject(errorWithToast(message));
