import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

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
