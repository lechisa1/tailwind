import React from "react";
import { Input } from "./Input";
import { cn } from "@/lib/utils";

type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Search({ className, ...props }: SearchProps) {
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <Input className="pl-10 text-black" {...props} />
    </div>
  );
}
