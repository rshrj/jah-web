import {
  rejectWithToast,
  apiUrl,
  errorWithToast,
} from '../utils/serviceHelpers';

export const getAllTestimonials = async () => {
  try {
    let token = localStorage.getItem('token');
    if (!token) {
      return rejectWithToast('Not authorized to perform this action');
    }
    const res = await fetch(`${apiUrl}/testimonials/all`, {
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
    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      return rejectWithToast('Server is offline');
    }
    return Promise.reject(e);
  }
};

export const updateTestimonialState = async ({ testimonialId, show }) => {
  try {
    let token = localStorage.getItem('token');
    if (!token) {
      return rejectWithToast('Not authorized to perform this action');
    }

    const res = await fetch(`${apiUrl}/testimonials/updateState`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ testimonialId: testimonialId, show: show }),
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

export const updateTestimonial = async ({
  testimonialId,
  name,
  company,
  message,
  phone,
}) => {
  try {
    let token = localStorage.getItem('token');
    if (!token) {
      return rejectWithToast('Not authorized to perform this action');
    }

    const res = await fetch(`${apiUrl}/testimonials/update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ testimonialId, name, company, message, phone }),
    });
    console.log(res);

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

export const deleteTestimonial = async ({ testimonialId }) => {
  try {
    let token = localStorage.getItem('token');
    if (!token) {
      return rejectWithToast('Not authorized to perform this action');
    }

    const res = await fetch(`${apiUrl}/testimonials/delete`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ testimonialId: testimonialId }),
    });

    console.log(res)

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

export const getTestimonials = async () => {
  try {
    const res = await fetch(`${apiUrl}/testimonials/show`, {
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

export const submitTestimonial = async (formData) => {
  try {
    const res = await fetch(`${apiUrl}/testimonials/add`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(formData),
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

const testimonialsService = {
  getTestimonials,
  submitTestimonial,
  getAllTestimonials,
  updateTestimonialState,
  updateTestimonial,
  deleteTestimonial,
};

export default testimonialsService;
