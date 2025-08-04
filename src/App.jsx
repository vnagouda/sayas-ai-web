import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import CustomerRecord from './pages/CustomerRecord';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import Logout from './pages/Logout';
import Layout from './layout/Layout';
import UploadLeads from './pages/UploadLeads';
import AllLeads from './pages/AllLeads';
import LeadDetails from './pages/LeadDetails';

import ROUTES from './routes';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('sayasUser');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogin = (mockUser) => {
    setUser(mockUser);
    localStorage.setItem('sayasUser', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sayasUser');
  };

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Login onLogin={handleLogin} />} />
        <Route path={ROUTES.LOGOUT} element={<Logout onLogout={handleLogout} />} />

        {user ? (
          <Route element={<Layout user={user} onLogout={handleLogout} />}>
            {user.role === 'admin' && (
              <>
                <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
                <Route path={ROUTES.UPLOAD_LEADS} element={<UploadLeads />} />
                <Route path={ROUTES.ALL_LEADS} element={<AllLeads />} />
                <Route path={ROUTES.ANALYTICS} element={<div>Analytics Placeholder</div>} />
              </>
            )}
            {user.role === 'agent' && (
              <>
                <Route path={ROUTES.AGENT} element={<AgentDashboard />} />
                <Route path={ROUTES.LEAD_DETAILS} element={<LeadDetails />} />
                <Route path={ROUTES.RECORDS} element={<CustomerRecord />} />
              </>
            )}
          </Route>
        ) : (
          <>
            <Route path={ROUTES.ADMIN} element={<Unauthorized />} />
            <Route path={ROUTES.AGENT} element={<Unauthorized />} />
            <Route path={ROUTES.RECORDS} element={<Unauthorized />} />
          </>
        )}

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
