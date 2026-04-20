// Base entity interface
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Deletable entity marker
export interface SoftDeletable {
  deletedAt?: string;
  isDeleted: boolean;
}

// Audit fields
export interface AuditFields {
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

// Common select option
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Table state
export interface TableState<T = unknown> {
  data: T[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  searchQuery: string;
  sortBy: keyof T | null;
  sortOrder: "asc" | "desc";
}

// Modal state
export interface ModalState<T = unknown> {
  isOpen: boolean;
  data?: T | null;
  mode: "create" | "edit" | "view";
}

// Toast notification
export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}
