"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Permission, Role } from "@/types/permission";
import { ROUTE_PERMISSIONS } from "@/config/routes";

// ============================================================================
// PERMISSIONS - All available permissions
// ============================================================================

export const ALL_PERMISSIONS: Permission[] = [
  "projects:view",
  "projects:create",
  "projects:edit",
  "projects:delete",
  "users:view",
  "users:create",
  "users:edit",
  "users:delete",
  "settings:view",
  "settings:edit",
];

export const PERMISSION_LABELS: Record<Permission, string> = {
  "projects:view": "View Projects",
  "projects:create": "Create Projects",
  "projects:edit": "Edit Projects",
  "projects:delete": "Delete Projects",
  "users:view": "View Users",
  "users:create": "Create Users",
  "users:edit": "Edit Users",
  "users:delete": "Delete Users",
  "settings:view": "View Settings",
  "settings:edit": "Edit Settings",
};

// ============================================================================
// ROLES - Role-based permissions
// ============================================================================

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  Admin: [
    "projects:view",
    "projects:create",
    "projects:edit",
    "projects:delete",
    "users:view",
    "users:create",
    "users:edit",
    "users:delete",
    "settings:view",
    "settings:edit",
  ],
  Editor: [
    "projects:view",
    "projects:create",
    "projects:edit",
    "users:view",
    "settings:view",
  ],
  Viewer: ["projects:view", "users:view", "settings:view"],
};

export const ROLE_PERMISSION_MATRIX = ROLE_PERMISSIONS;

// ============================================================================
// HOOKS - Main permissions hook
// ============================================================================

export function usePermissions() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role].includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some((p) => ROLE_PERMISSIONS[user.role].includes(p));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every((p) => ROLE_PERMISSIONS[user.role].includes(p));
  };

  const getUserPermissions = (): Permission[] => {
    if (!user) return [];
    return ROLE_PERMISSIONS[user.role];
  };

  const hasRoutePermission = (path: string): boolean => {
    const routeConfig = ROUTE_PERMISSIONS.find((r) =>
      r.exact ? r.path === path : path.startsWith(r.path),
    );

    if (!routeConfig) return false;
    if (routeConfig.requiredPermissions.length === 0) return true;
    if (!isAuthenticated || !user) return false;

    return hasAnyPermission(routeConfig.requiredPermissions);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions,
    hasRoutePermission,
    userRole: user?.role,
    isLoading,
  };
}

// ============================================================================
// GUARDS - Route and Permission guards
// ============================================================================

interface RouteGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function RouteGuard({ children, fallback }: RouteGuardProps) {
  const { hasRoutePermission, isLoading } = usePermissions();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!hasRoutePermission(pathname)) {
      router.replace("/auth");
    }
  }, [pathname, hasRoutePermission, isLoading, router]);

  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      )
    );
  }

  if (!hasRoutePermission(pathname)) {
    return fallback || null;
  }

  return <>{children}</>;
}

export function requireRole(allowedRoles: Role[]) {
  return function <P extends object>(
    WrappedComponent: React.ComponentType<P>,
  ): React.FC<P> {
    return function ProtectedComponent(props: P) {
      const { user, isAuthenticated } = useAuth();
      const router = useRouter();

      useEffect(() => {
        if (!isAuthenticated) {
          router.replace("/auth");
          return;
        }
        if (!allowedRoles.includes(user!.role)) {
          router.replace("/auth");
        }
      }, [user, isAuthenticated, router]);

      if (!isAuthenticated || !allowedRoles.includes(user!.role)) {
        return null;
      }

      return <WrappedComponent {...props} />;
    };
  };
}

interface PermissionGuardProps {
  requiredPermission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({
  requiredPermission,
  children,
  fallback,
}: PermissionGuardProps) {
  const { hasPermission } = usePermissions();

  if (!hasPermission(requiredPermission)) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

// ============================================================================
// UTILITIES - Helper functions
// ============================================================================

export function useRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role];
}

export function getPermissionByRole(role: Role): {
  role: Role;
  permissions: Permission[];
  permissionCount: number;
} {
  return {
    role,
    permissions: ROLE_PERMISSIONS[role],
    permissionCount: ROLE_PERMISSIONS[role].length,
  };
}
