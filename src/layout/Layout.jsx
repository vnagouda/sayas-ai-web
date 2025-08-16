import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ROUTES from "../routes";

export default function Layout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication on mount and history changes
    const checkAuth = () => {
      const stored = localStorage.getItem('sayasUser');
      if (!stored) {
        navigate(ROUTES.HOME, { replace: true });
      }
    };

    checkAuth();
    window.addEventListener('popstate', checkAuth);
    
    return () => {
      window.removeEventListener('popstate', checkAuth);
    };
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}>
        <Sidebar role={user?.role} collapsed={collapsed} toggleCollapse={() => setCollapsed(!collapsed)} />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 overflow-auto">
        <Navbar user={user} />
        <main className="flex-1 bg-slate-50 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
