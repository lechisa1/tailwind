export type Permission =
  | "projects:view"
  | "projects:create"
  | "projects:edit"
  | "projects:delete"
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "settings:view"
  | "settings:edit";

export type Role = "Admin" | "Editor" | "Viewer";

export interface RoutePermission {
  path: string;
  requiredPermissions: Permission[];
  exact?: boolean;
}

export interface PermissionMatrix {
  [role: string]: Permission[];
}
