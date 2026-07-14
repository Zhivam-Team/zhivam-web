"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface AdminModeContextType {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
}

const AdminModeContext = createContext<AdminModeContextType>({
  isAdminMode: false,
  toggleAdminMode: () => {},
});

export function AdminModeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Auto-switch to admin mode if they become an admin, or turn off if they lose it
  useEffect(() => {
    if (user?.role === "admin") {
      const savedMode = localStorage.getItem("adminViewMode");
      setIsAdminMode(savedMode === "customer" ? false : true);
    } else {
      setIsAdminMode(false);
    }
  }, [user]);

  const toggleAdminMode = () => {
    setIsAdminMode((prev) => {
      const nextMode = !prev;
      localStorage.setItem("adminViewMode", nextMode ? "admin" : "customer");
      return nextMode;
    });
  };

  return (
    <AdminModeContext.Provider value={{ isAdminMode, toggleAdminMode }}>
      {children}
    </AdminModeContext.Provider>
  );
}

export const useAdminMode = () => useContext(AdminModeContext);
