import React, { useState } from "react";
import { Button } from "./ui/button";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import ROUTES from "../routes";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    navigate(ROUTES.LOGOUT);
  };

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
        
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
            </DialogHeader>
            <p className="text-slate-600">Are you sure you want to logout?</p>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
