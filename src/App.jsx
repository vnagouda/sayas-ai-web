import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Components
import { Login, Logout, Unauthorized } from './pages/auth';

// Admin Components
import { AdminDashboard, UploadLeads, AllLeads } from './pages/admin';

// Agent Components
import { AgentDashboard, CustomerRecord, LeadDetails } from './pages/agent';

// Other Components
import NotFound from './pages/NotFound';
import Layout from './layout/Layout';

import ROUTES from './routes';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('sayasUser');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const handleLogin = (mockUser) => {
    setUser(mockUser);
    localStorage.setItem('sayasUser', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sayasUser');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Always show login page if not authenticated */}
        {!user && (
          <>
            <Route path={ROUTES.HOME} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.NOT_FOUND} element={<Login onLogin={handleLogin} />} />
            {/* Redirect all other routes to login */}
            <Route path={ROUTES.ADMIN} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.AGENT} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.RECORDS} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.UPLOAD_LEADS} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.ALL_LEADS} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.ANALYTICS} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.LEAD_DETAILS} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.LOGOUT} element={<Logout onLogout={handleLogout} />} />
          </>
        )}
        {/* Protected routes for authenticated users */}
        {user && (
          <>
            <Route path={ROUTES.HOME} element={<Login onLogin={handleLogin} />} />
            <Route path={ROUTES.LOGOUT} element={<Logout onLogout={handleLogout} />} />
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
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
