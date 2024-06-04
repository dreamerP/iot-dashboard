import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/core/context/AuthContext.jsx";
import PrivateRoute from "@/core/router/PrivateRoute.jsx";
import Login from "@/core/components/Login/LoginForm";
import DefaultLayout from "@/core/components/Layout/DefaultLayout";
import ElementList from "@/core/components/Elements/ElementList";
import Dashboard from "@/pages/Dashboard";

const AppRouter = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/sensors"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/elements"
          element={
            <PrivateRoute
              element={
                <DefaultLayout>
                  <ElementList />
                </DefaultLayout>
              }
            />
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default AppRouter;
