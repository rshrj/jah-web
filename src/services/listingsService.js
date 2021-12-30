import {
  rejectWithToast,
  apiUrl,
  errorWithToast
} from '../utils/serviceHelpers';

import { listingKeys } from '../constants/listingTypes';

export const addNewListing = async ({ type, ...listingData }) => {
  if (!listingKeys.includes(type)) {
    return rejectWithToast('Listing type is incorrect');
  }
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }
  try {
    const res = await fetch(`${apiUrl}/listings/add/${type}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(listingData)
    });

    if (!res) {
      throw errorWithToast('Server did not respond');
    }

    const data = await res.json();

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

const listingsService = { addNewListing };

export default listingsService;
