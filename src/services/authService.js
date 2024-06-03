import axios from "axios";

const API_URL = "http://localhost:3000/api";

const authService = {
  login: async (username = "admin", password = "admin") => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('token');
    await axios.post(`${API_URL}/auth/logout`);
  },

  refreshTokens: async (refreshToken) => {
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken,
    });
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const response = await axios.get(`${API_URL}/auth/checkAuth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default authService;
