"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { Input } from "../ui/Input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";

export function Header() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { userRole } = usePermissions();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    auth?.logout();
    router.push("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const canAccessUser = userRole === "Admin";
  const canAccessSettings = userRole === "Admin" || userRole === "Editor";

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-white/80 backdrop-blur-md px-8 flex items-center justify-between">
      <div className="w-full max-w-sm">
        <Input
          placeholder="Search documentation..."
          className="bg-gray-100/50 border-transparent focus:bg-white text-black focus:ring-[var(--brand)] transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Notification System */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="px-4 py-3 border-b bg-gray-50/50">
                <h3 className="text-sm font-semibold text-black">
                  Notifications
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors group">
                  <p className="text-sm font-medium text-black group-hover:text-[var(--brand)] transition-colors">
                    New project assigned
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    You have been added to E-commerce Redesign
                  </p>
                </div>
                <div className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors group">
                  <p className="text-sm font-medium text-black group-hover:text-[var(--brand)] transition-colors">
                    System Update
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Platform will be offline for maintenance at 2 AM UTC.
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-50/50 text-center border-t">
                <button className="text-xs font-semibold text-[var(--brand)] hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pl-3 border border-gray-200 rounded-full hover:shadow-md transition-all bg-white focus:outline-none"
          >
            <span className="text-sm font-medium text-black hidden sm:inline">
              {auth?.user?.name || "User"}
            </span>
            <div className="h-8 w-8 rounded-full bg-[var(--brand)] flex items-center justify-center text-white font-semibold text-xs border border-white">
              {auth?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl py-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="px-4 py-3 border-b mb-1">
                <p className="text-sm font-semibold text-black">{auth?.user?.name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">
                  {auth?.user?.email || "user@example.com"}
                </p>
              </div>

              {canAccessUser && (
                <Link
                  href="/user"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile Settings
                </Link>
              )}

              {canAccessSettings && (
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                  </svg>
                  Account Preferences
                </Link>
              )}

              <div className="border-t my-1"></div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
