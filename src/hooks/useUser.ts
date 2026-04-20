"use client";

import { useAuth } from "./useAuth";

export function useUser() {
  const { user, isAuthenticated } = useAuth();
  
  return {
    user,
    isAuthenticated,
    isAdmin: user?.role === "Admin",
    isEditor: user?.role === "Editor",
    isViewer: user?.role === "Viewer",
  };
}