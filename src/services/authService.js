import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  },

  logout: async () => {
    await axios.post(`${API_URL}/auth/logout`);
  },

  refreshTokens: async (refreshToken) => {
    const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
    return response.data;
  },
};

export default authService;
