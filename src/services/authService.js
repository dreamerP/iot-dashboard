import axios from "@/core/axios/Axios";

/**
 * AuthService
 *
 * Servicio para gestionar la autenticación del usuario, incluyendo login, logout,
 * refresco de tokens y verificación de autenticación.
 */
class AuthService {
  constructor() {
    this.apiURL = "/auth";
  }

  /**
   * Inicia sesión del usuario.
   *
   * @param {string} [username] - Nombre de usuario.
   * @param {string} [password] - Contraseña del usuario.
   * @returns {Promise<Object>} Datos de la respuesta incluyendo el token.
   * @throws {Error} Error durante el inicio de sesión.
   */
  async login(username = "admin", password = "admin") {
    try {
      const response = await axios.post(`${this.apiURL}/login`, {
        username,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

 
  /**
   * Refresca el token de autenticación.
   *
   * @param {string} refreshToken - El token de refresco.
   * @returns {Promise<Object>} Datos de la respuesta incluyendo el nuevo token.
   * @throws {Error} Error durante el refresco del token.
   */
  async refreshTokens(refreshToken) {
    try {
      const response = await axios.post(`${this.apiURL}/refresh`, {
        refreshToken,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      return response.data;
    } catch (error) {
      console.error("Error during token refresh:", error);
      throw error;
    }
  }

  /**
   * Verifica la autenticación del usuario.
   *
   * @returns {Promise<Object>} Datos de la respuesta de la verificación de autenticación.
   * @throws {Error} Error durante la verificación de autenticación.
   */
  async checkAuth() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
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
