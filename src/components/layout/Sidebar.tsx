"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePermissions } from "@/hooks/usePermissions";
import { NAV_ITEMS } from "@/config/routes";

export function Sidebar({
  isMobileOpen = false,
  onCloseMobile,
}: {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const { hasRoutePermission } = usePermissions();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  const visibleItems = NAV_ITEMS.filter(
    (item) => item.showInSidebar && hasRoutePermission(item.href),
  );

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileOpen && onCloseMobile && prevPathnameRef.current !== pathname) {
      onCloseMobile();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, isMobileOpen, onCloseMobile]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 border-r bg-white flex flex-col z-50",
          "transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:z-10",
        )}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b md:hidden">
          <button
            onClick={onCloseMobile}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="h-8 w-8 rounded bg-[var(--brand)] flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="ml-2 font-bold text-xl tracking-tight text-black">
            AcmeCorp
          </span>
        </div>

        <div className="h-16 flex items-center px-6 border-b hidden md:flex">
          <div className="h-8 w-8 rounded bg-[var(--brand)] flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="ml-3 font-bold text-xl tracking-tight text-black">
            AcmeCorp
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {visibleItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90"
                    : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.icon}
                  />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500">
            <span className="truncate">v1.0.4-production</span>
          </div>
        </div>
      </aside>
    </>
  );
}
