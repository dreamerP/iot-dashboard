import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/components/Login/LoginForm';
import Dashboard from '@/pages/Dashboard';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard" element={<Dashboard/>} />
      <Route path="/sensors" element={<Login />} />
    </Routes>
  </Router>
);

export default AppRouter;
