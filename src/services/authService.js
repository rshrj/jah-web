const apiUrl = process.env.REACT_APP_APIURL || 'http://localhost:5000';

export const login = async (email, password) => {
  try {
    console.log(email);
    console.log(password);
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    console.log(res);
    if (!res) {
      console.log('boop');
      throw new Error('Server did not respond', {
        cause: {
          success: false,
          message: { email: 'Server did not respond' }
        }
      });
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error('Request error', { cause: data });
    }

    return data;
  } catch (e) {
    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      return Promise.reject(
        new Error('Server is offline', {
          cause: {
            message: {
              email: 'Server is offline'
            }
          }
        })
      );
    }
    return Promise.reject(e);
  }
};

export const signup = async (email, name, password, password2) => {
  try {
    const res = await fetch(`${apiUrl}/users/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        email,
        name,
        password,
        password2
      })
    });

    if (!res) {
      throw new Error({
        success: false,
        message: 'Server did not respond'
      });
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data);
    }

    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const loadUserByToken = async (token) => {
  try {
    const res = await fetch(`${apiUrl}/users/me`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`
      }
    });

    if (!res) {
      throw new Error({
        success: false,
        message: 'Server did not respond'
      });
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data);
    }

    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const verifyEmail = async (token) => {
  try {
    const res = await fetch(`${apiUrl}/auth/verify/${token}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });

    if (!res) {
      throw new Error({
        success: false,
        message: 'Server did not respond'
      });
    }

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      throw new Error(data);
    }

    console.log(data);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const authService = { login, signup, loadUserByToken, verifyEmail };

export default authService;
