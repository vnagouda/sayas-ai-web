import React from "react";
import { Button } from "../components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-blue-700 h-6 w-6" />
        <h1 className="text-lg font-semibold text-gray-800">
          {user?.role?.toUpperCase()} Panel
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-700">
          Logged in as: <strong>{user?.role}</strong>
        </p>
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
          onClick={() => navigate("/logout")}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
