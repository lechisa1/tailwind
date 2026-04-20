import { ReactNode } from "react";

export interface ColumnDef<T = unknown> {
  header: string;
  accessor: keyof T | string;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  hidden?: boolean;
  className?: string;
}

export interface DataTableProps<T = unknown> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  selectedRows?: T[];
  onSelectRows?: (rows: T[]) => void;
  emptyMessage?: string;
  page?: number;
  limit?: number;
  total?: number;
  onPageChange?: (page: number, limit: number) => void;
}
