import React from "react";
import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-gray-300 text-[var(--brand)] focus:ring-[var(--brand)] cursor-pointer transition-colors",
        className,
      )}
      {...props}
    />
  );
}
