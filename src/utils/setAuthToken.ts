import API from '../api/api';
const setAuthToken = async (token: string | null) => {
  if (token) {
    // Apply to every request
    API.defaults.headers.common['Authorization'] = await `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    // Delete auth header
    await delete API.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
