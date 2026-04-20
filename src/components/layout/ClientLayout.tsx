"use client";

import { usePathname } from "next/navigation";
import { DashboardLayout } from "./DashboardLayout";
import { RouteGuard } from "@/hooks/usePermissions";

type Props = {
  children: React.ReactNode;
};

export function ClientLayout({ children }: Props) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth" || pathname === "/";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <RouteGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </RouteGuard>
  );
}