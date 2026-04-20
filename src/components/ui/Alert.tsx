import React from "react";
import { cn } from "@/lib/utils";

type AlertProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Alert({
  children,
  variant = "default",
  title,
  className,
  ...props
}: AlertProps) {
  const variants = {
    default: "bg-gray-100 border-gray-300 text-gray-800",
    success: "bg-green-100 border-green-300 text-green-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
    error: "bg-red-100 border-red-300 text-red-800",
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        variants[variant],
        className
      )}
      {...props}
    >
      {title && <p className="font-semibold">{title}</p>}
      <div>{children}</div>
    </div>
  );
}