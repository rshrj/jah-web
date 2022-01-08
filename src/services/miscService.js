import {
  rejectWithToast,
  apiUrl,
  errorWithToast
} from '../utils/serviceHelpers';

export const getHomeAd = async () => {
  try {
    const res = await fetch(`${apiUrl}/settings/homead`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
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
    console.log(e);
    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      return rejectWithToast('Server is offline');
    }
    return Promise.reject(e);
  }
};

const miscService = { getHomeAd };

export default miscService;
