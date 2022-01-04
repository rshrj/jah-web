import {
  rejectWithToast,
  apiUrl,
  errorWithToast
} from '../utils/serviceHelpers';

export const submitCallBackRequest = async (name, phone, message) => {
  try {
    const res = await fetch(`${apiUrl}/callbackrequests/new`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        name,
        phone,
        message
      })
    });

    if (!res) {
      throw errorWithToast('Server did not respond');
    }

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error('Request error', { cause: data });
    }

    return data;
  } catch (e) {
    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      return rejectWithToast('Server is offline');
    }
    return Promise.reject(e);
  }
};

export const updateState = async (callbackId, state) => {
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }

  try {
    const res = await fetch(`${apiUrl}/callbackrequests/updateState`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        callbackId: callbackId,
        state: state,
      }),
    });

    if (!res) {
      throw errorWithToast('Server did not respond');
    }

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error('Request error', { cause: data });
    }

    return data;
  } catch (e) {
    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      return rejectWithToast('Server is offline');
    }
    return Promise.reject(e);
  }
};

export const fetchCallBackRequests = async (name, phone, message) => {
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }

  try {
    const res = await fetch(`${apiUrl}/callbackrequests/all`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res) {
      throw errorWithToast('Server did not respond');
    }

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error('Request error', { cause: data });
    }

    return data;
  } catch (e) {
    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      return rejectWithToast('Server is offline');
    }
    return Promise.reject(e);
  }
};

const callbackService = {
  submitCallBackRequest,
  fetchCallBackRequests,
  updateState,
};

export default callbackService;
