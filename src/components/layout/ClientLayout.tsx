"use client";

import { usePathname } from "next/navigation";
import { DashboardLayout } from "./DashboardLayout";
import { RouteGuard } from "@/hooks/usePermissions";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  children: React.ReactNode;
};

export function ClientLayout({ children }: Props) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Auth pages (no layout)
  const isAuthPage = pathname === "/auth";
  // Dashboard pages (with layout)
  const isDashboardPage = pathname === "/" || pathname === "/project" || pathname === "/user" || pathname.startsWith("/settings");

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (isAuthenticated && isDashboardPage) {
    return (
      <RouteGuard>
        <DashboardLayout>{children}</DashboardLayout>
      </RouteGuard>
    );
  }

  // If not authenticated and trying to access protected page, show loading (RouteGuard redirects)
  return null;
}