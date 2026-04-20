import React from "react";
import { cn } from "@/lib/utils";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
} & React.HTMLAttributes<HTMLDivElement>;

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-[var(--brand)]",
        sizes[size],
        className
      )}
      {...props}
    />
  );
}