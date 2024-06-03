import axios from '@/core/axios/Axios';

class AuthService {
  constructor() {
    this.apiURL = '/auth';
  }

  async login(username = "admin", password = "admin") {
    try {
      const response = await axios.post(`${this.apiURL}/login`, { username, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
      }
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token');
      await axios.post(`${this.apiURL}/logout`);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }

  async refreshTokens(refreshToken) {
    try {
      const response = await axios.post(`${this.apiURL}/refresh`, { refreshToken });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
      }
      return response.data;
    } catch (error) {
      console.error("Error during token refresh:", error);
      throw error;
    }
  }

  async checkAuth() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const response = await axios.get(`${this.apiURL}/checkAuth`);
      return response.data;
    } catch (error) {
      console.error("Error during authentication check:", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
