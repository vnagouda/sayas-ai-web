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

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  return (
    <div className="relative h-screen overflow-hidden bg-slate-50">
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 md:z-20
          transition-transform duration-300 ease-in-out
          ${collapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
          ${collapsed ? "md:w-20" : "w-[280px] md:w-20"}
          bg-slate-900
        `}
      >
        <Sidebar
          role={user?.role}
          collapsed={true}
          toggleCollapse={() => setCollapsed(!collapsed)}
        />
      </aside>

      {/* Main Content */}
      <div
        className={`
          relative min-h-screen transition-[margin] duration-300
          ${collapsed ? "md:ml-20" : "md:ml-20"}
        `}
      >
        <Navbar 
          user={user} 
          onMenuClick={() => setCollapsed(!collapsed)}
          showMenuButton={true}
        />
        <main 
          className={`
            overflow-auto p-4 md:p-6
            transition-all duration-300
          `}
        >
          <div className="max-w-[1920px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
