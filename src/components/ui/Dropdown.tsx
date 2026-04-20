"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
};

export function Dropdown({ trigger, children, align = "left" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-1 min-w-[150px] rounded-md border bg-white py-1 shadow-lg",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

type DropdownItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function DropdownItem({ children, onClick, className, ...props }: DropdownItemProps) {
  return (
    <div
      className={cn(
        "cursor-pointer px-4 py-2 text-sm hover:bg-gray-100",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}