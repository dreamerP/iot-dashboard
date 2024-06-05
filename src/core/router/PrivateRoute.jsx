import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/core/context/AuthContext.jsx";
import DefaultLayout from "@/core/components/Layout/DefaultLayout";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <DefaultLayout>{element}</DefaultLayout> : <Navigate to="/login" />;
};

export default PrivateRoute;
