import {
  rejectWithToast,
  apiUrl,
  errorWithToast,
} from '../utils/serviceHelpers';

import { listingKeys } from '../constants/listingTypes';

export const addNewListing = async ({ type, ...listingFormData }) => {
  if (!listingKeys.includes(type)) {
    return rejectWithToast('Listing type is incorrect');
  }
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }
  try {
    if (listingFormData.pictures.length < 6) {
      throw errorWithToast(
        'Please upload atleast six pictures of the property'
      );
    }
    let featuredIndex = listingFormData.pictures.indexOf(
      listingFormData.featuredPicture
    );
    if (featuredIndex === -1) {
      throw errorWithToast('Please set a featured picture');
    }
    const uploadRes = await Promise.all(
      listingFormData.pictures.map(async (picture) => {
        let body = new FormData();
        body.append('picture', picture);

        let res = await fetch(`${apiUrl}/upload/picture`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body,
        });
        return res;
      })
    );

    if (!uploadRes.every((res) => res)) {
      throw errorWithToast('Server did not respond');
    }

    let picturesData = await Promise.all(
      uploadRes.map(async (res) => {
        let d = await res.json();
        return d;
      })
    );

    if (!uploadRes.every((res) => res.ok)) {
      throw new Error('Request error', {
        cause: {
          success: false,
          toasts: [].concat(picturesData.map((data) => data.toasts)),
        },
      });
    }

    let links = picturesData.map((data) => data.payload.path);
    let featuredLink = links[featuredIndex];

    const res = await fetch(`${apiUrl}/listings/add/${type}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...listingFormData,
        pictures: links,
        featuredPicture: featuredLink,
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

export const updateListing = async ({
  type,
  newPictures,
  ...listingFormData
}) => {
  console.log(listingFormData);
  if (!listingKeys.includes(type)) {
    return rejectWithToast('Listing type is incorrect');
  }
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }
  try {
    if (listingFormData.pictures.length + newPictures.length < 6) {
      throw errorWithToast(
        'Please upload atleast six pictures of the property'
      );
    }
    // let featuredIndex = listingFormData.pictures.indexOf(
    //   listingFormData.featuredPicture
    // );
    // if (featuredIndex === -1) {
    //   throw errorWithToast('Please set a featured picture');
    // }

    let indOld = listingFormData.pictures.indexOf(
      listingFormData.featuredPicture
    );
    let indNew = newPictures.indexOf(listingFormData.featuredPicture);

    if (indNew === -1 && indOld === -1) {
      throw errorWithToast('Please set a featured picture');
    }

    let newLinks = [];
    if (newPictures.length > 0) {
      const uploadRes = await Promise.all(
        newPictures.map(async (picture) => {
          let body = new FormData();
          body.append('picture', picture);

          let res = await fetch(`${apiUrl}/upload/picture`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body,
          });
          return res;
        })
      );

      if (!uploadRes.every((res) => res)) {
        throw errorWithToast('Server did not respond');
      }

      let picturesData = await Promise.all(
        uploadRes.map(async (res) => {
          let d = await res.json();
          return d;
        })
      );

      if (!uploadRes.every((res) => res.ok)) {
        throw new Error('Request error', {
          cause: {
            success: false,
            toasts: [].concat(picturesData.map((data) => data.toasts)),
          },
        });
      }
      newLinks = picturesData.map((data) => data.payload.path);
    }

    let featuredLink =
      indNew === -1 ? listingFormData.featuredPicture : newLinks[indNew];
    let links = listingFormData.pictures.concat(newLinks);

    console.log({
      ...listingFormData,
      pictures: links,
      featuredPicture: featuredLink,
    });
    const res = await fetch(`${apiUrl}/listings/update/${type}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...listingFormData,
        pictures: links,
        featuredPicture: featuredLink,
      }),
    });
    console.log(res);

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
    console.log(e);
    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      return rejectWithToast('Server is offline');
    }
    return Promise.reject(e);
  }
};

export const getParticularListing = async (type, page = 1, size = 10) => {
  try {
    const res = await fetch(`${apiUrl}/listings/particular`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ type, page, size }),
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

export const deleteListing = async (listingId) => {
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }

  try {
    const res = await fetch(`${apiUrl}/listings/delete`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listingId: listingId }),
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

export const updateListingState = async ({ listingId, state }) => {
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }

  try {
    const res = await fetch(`${apiUrl}/listings/updateState`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listingId, state }),
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

export const getListings = async () => {
  let token = localStorage.getItem('token');
  if (!token) {
    return rejectWithToast('Not authorized to perform this action');
  }
  try {
    const res = await fetch(`${apiUrl}/listings/all`, {
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

export const getListingsFuzzy = async (query, type) => {
  try {
    const res = await fetch(`${apiUrl}/listings/fuzzy`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        query,
        type,
      }),
    });

    // const g = await (() =>
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('Good');
    //     }, 5000);
    //   }))();

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

export const getFeaturedListings = async () => {
  try {
    const res = await fetch(`${apiUrl}/listings/featured`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
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

export const getPublicListingById = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${apiUrl}/listings/${id}`, {
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

export const getRelatedListings = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/listings/related/${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
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

const listingsService = {
  addNewListing,
  updateListing,
  getListings,
  getListingsFuzzy,
  getParticularListing,
  getFeaturedListings,
  getPublicListingById,
  getRelatedListings,
  deleteListing,
  updateListingState,
};

export default listingsService;
