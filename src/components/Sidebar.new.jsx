import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  UserCog,
  Settings,
  BookOpen,
  Building
} from "lucide-react";

const Sidebar = ({ role, collapsed, toggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems =
    role === "admin"
      ? [
          { text: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
          { text: "Upload Leads", icon: Upload, path: "/admin/upload-leads" },
          { text: "All Leads", icon: FileText, path: "/admin/all-leads" },
          { text: "Lead Sources", icon: Building, path: "/admin/sources" },
          { text: "Records", icon: BookOpen, path: "/admin/records" },
          { text: "Agents", icon: Users, path: "/admin/agents" },
          { text: "Settings", icon: Settings, path: "/admin/settings" },
        ]
      : [
          { text: "Dashboard", icon: LayoutDashboard, path: "/agent" },
          { text: "Customer Records", icon: Users, path: "/agent/records" },
        ];

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <span className={`${true ? "hidden" : "block"} font-semibold text-base md:text-lg truncate`}>
          Sayas AutoInsure
        </span>
        <button 
          onClick={toggleCollapse}
          className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors hidden md:block"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menuItems.map(({ text, icon: Icon, path }, i) => {
          const active = location.pathname === path;
          return (
            <button
              key={i}
              onClick={() => {
                navigate(path);
                if (window.innerWidth < 768) {
                  toggleCollapse();
                }
              }}
              className={`
                flex items-center w-full px-3 py-2.5 rounded-lg text-sm transition-colors
                ${active 
                  ? "bg-slate-800 text-white" 
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                } 
                justify-center
              `}
              title={text}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">{text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
