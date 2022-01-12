import {
  rejectWithToast,
  apiUrl,
  errorWithToast,
} from '../utils/serviceHelpers';


export const getUsers = async () => {
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }
  try {
    const res = await fetch(`${apiUrl}/users/all`, {
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


export const deleteUser = async (userId) => {
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }
  try {
    const res = await fetch(`${apiUrl}/users`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: userId }),
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

const listingsService = { getUsers, deleteUser };

export default listingsService;
