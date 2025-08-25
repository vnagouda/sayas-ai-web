import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ChevronLeft, ChevronRight, UploadIcon } from "lucide-react";
import { Upload, UploadFile } from "@mui/icons-material";

const Sidebar = ({ role, collapsed, toggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems =
    role === "admin"
      ? [
          { text: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
          { text: "Upload Leads", icon: UploadIcon, path: "/admin/upload-leads" },
          { text: "All Leads", icon: Users, path: "/admin/all-leads" },
          { text: "Lead Sources", icon: Users, path: "/admin/sources" },
          { text: "Records", icon: Users, path: "/admin/records" },
          { text: "Agents", icon: Users, path: "/admin/agents" },
          { text: "Settings", icon: Users, path: "/admin/settings" },
        ]
      : [
          { text: "Dashboard", icon: LayoutDashboard, path: "/agent" },
          { text: "Customer Records", icon: Users, path: "/agent/records" },
        ];

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col shadow-lg transition-all duration-300">
      {/* Collapse Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <span className={`${collapsed ? "hidden" : "block"} font-semibold text-lg`}>Sayas AutoInsure</span>
        <button onClick={toggleCollapse}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map(({ text, icon: Icon, path }, i) => {
          const active = location.pathname === path;
          return (
            <button
              key={i}
              onClick={() => navigate(path)}
              className={`flex items-center w-full px-3 py-2 rounded-md text-sm transition
                ${active ? "bg-slate-700" : "hover:bg-slate-800"} 
                ${collapsed ? "justify-center" : "justify-start gap-3"}
              `}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && text}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
