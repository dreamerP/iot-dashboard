import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/core/context/AuthContext.jsx";
import PrivateRoute from "@/core/router/PrivateRoute.jsx";
import Login from "@/core/components/Login/LoginForm";
import ElementList from "@/core/components/Elements/ElementList";
import SensorList from "@/core/components/Sensors/SensorList";

const AppRouter = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<SensorList />} />}
        />
        <Route
          path="/elements"
          element={<PrivateRoute element={<ElementList />} />}
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default AppRouter;
