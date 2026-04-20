"use client";

import React, { createContext, useState, useEffect } from "react";
import type { Role } from "@/types/permission";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

const DEMO_USERS: Record<string, User> = {
  "admin@example.com": {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
  },
  "editor@example.com": {
    id: "2",
    name: "Editor User",
    email: "editor@example.com",
    role: "Editor",
  },
  "viewer@example.com": {
    id: "3",
    name: "Viewer User",
    email: "viewer@example.com",
    role: "Viewer",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const userEmail = email.toLowerCase();
    const loggedInUser = DEMO_USERS[userEmail] || {
      id: "1",
      name: email.split("@")[0],
      email,
      role: "Admin",
    };
    
    setUser(loggedInUser);
    localStorage.setItem("auth_user", JSON.stringify(loggedInUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}