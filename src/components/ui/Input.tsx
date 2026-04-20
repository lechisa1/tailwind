import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[var(--brand)]",
        className,
      )}
    />
  );
}
