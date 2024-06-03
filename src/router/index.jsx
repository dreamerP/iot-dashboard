import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext.jsx';
import PrivateRoute from '@/router/PrivateRoute.jsx';
import Login from '@/components/Login/LoginForm';
import Dashboard from '@/pages/Dashboard';

const AppRouter = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/sensors" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default AppRouter;
