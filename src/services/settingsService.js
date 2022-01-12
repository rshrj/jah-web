import {
  rejectWithToast,
  apiUrl,
  errorWithToast
} from '../utils/serviceHelpers';

// export const submitHomeAdChange = async (formData) => {
//   let token = localStorage.getItem('token');
//   if (!token) {
//     return rejectWithToast('Not authorized to perform this action');
//   }
//   try {
//     const res = await fetch(`${apiUrl}/settings/homead`, {
//       method: 'POST',
//       mode: 'cors',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json;charset=UTF-8',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(formData)
//     });

//     if (!res) {
//       throw errorWithToast('Server did not respond');
//     }

//     const data = await res.json();
//     console.log(data);

//     if (!res.ok) {
//       throw new Error('Request error', { cause: data });
//     }

//     return data;
//   } catch (e) {
//     if (e instanceof TypeError && e.message === 'Failed to fetch') {
//       return rejectWithToast('Server is offline');
//     }
//     return Promise.reject(e);
//   }
// };

export const submitHomeAdChange = async (formData) => {
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }
  try {
    if (!formData.image) {
      throw errorWithToast('Please upload one picture for HomeAd.');
    }

    let body = new FormData();
    body.append('picture', formData.image);

    let res = await fetch(`${apiUrl}/upload/picture`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (!res) {
      throw errorWithToast('Server did not respond');
    }

    let data = await res.json();
    

    if (!res.ok) {
      throw new Error('Request error', { cause: data });
    }

    formData.image = data.payload.path;

    res = await fetch(`${apiUrl}/settings/homead`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res) {
      throw errorWithToast('Server did not respond');
    }

    data = await res.json();
   
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

const settingsService = { submitHomeAdChange };

export default settingsService;
