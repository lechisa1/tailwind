import React from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  total: number;
  current: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  total,
  current,
  pageSize,
  className,
}: PaginationProps) {
  return (
    <div className={cn("flex items-center justify-between px-2", className)}>
      <div className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium">{(current - 1) * pageSize + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(current * pageSize, total)}
        </span>{" "}
        of <span className="font-medium">{total}</span> results
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={current === 1}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={current * pageSize >= total}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
