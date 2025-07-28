import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_URL;

//Auth login 
export async function authLogin({ user, password }) {
  try {
    const res = await axios.post(`${API_ENDPOINT}/auth/login`, {
      user,
      password,
    });

    return res.data; 

  } catch (error) {
    console.log(API_ENDPOINT);
    const errMsg = error.response?.data?.message || 'Login failed!';
    throw new Error(errMsg);
    
  }
}

//Auth profile
export async function getUserProfile(token) {
  try {
    const res = await axios.get(`${API_ENDPOINT}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (error) {
    throw new Error('Failed get profile!');
  }
}
