import React, { createContext, useState, useContext } from "react";
import authService from "@/services/authService";
import Snackbar from "@/core/components/Notifications/Notification";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const login = async (username, password) => {
    setLoading(true);
    try {
      await authService.login(username, password);
      await checkAuth();
      showSnackbar("Login successful!", "success");
    } catch (error) {
      showSnackbar("Login failed. Please check your credentials.", "error");
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const userData = await authService.checkAuth();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      showSnackbar("Authentication failed. Please login again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    showSnackbar("Logout successful!", "success");
  };

  const refreshTokens = async (refreshToken) => {
    try {
      const userData = await authService.refreshTokens(refreshToken);
      setUser(userData);
      showSnackbar("Tokens refreshed!", "success");
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      showSnackbar("Failed to refresh tokens.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => {
      setSnackbar({ ...snackbar, open: false });
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        refreshTokens,
        checkAuth,
        showSnackbar,
        setLoading,
      }}
    >
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {children}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
