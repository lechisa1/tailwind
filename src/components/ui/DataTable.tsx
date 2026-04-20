import React from "react";
import { cn } from "@/lib/utils";
import { Pagination } from "./Pagination";

interface DataTableProps {
  headers: React.ReactNode; // Slot for Search/Filters
  columns: {
    header: string;
    accessor: string;
    cell?: (row: any) => React.ReactNode;
  }[];
  data: any[];
  className?: string;
}

export function DataTable({
  headers,
  columns,
  data,
  className,
}: DataTableProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Table Toolbar: Search & Filters */}
      <div className="flex items-center justify-between gap-4">{headers}</div>

      {/* The Table Container - responsive with horizontal scroll on mobile */}
      <div className="rounded-md border border-gray-200 bg-white overflow-x-auto -mx-4 md:mx-0">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-4 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-900 whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.length > 0 ? (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-gray-700"
                    >
                      {col.cell ? col.cell(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 md:px-6 md:py-10 text-center text-gray-500"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <Pagination total={20} current={1} pageSize={data.length} />
    </div>
  );
}
