"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Switch({
  checked,
  onChange,
  disabled,
  className,
  type,
  onClick,
  ...props
}: SwitchProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        checked ? "bg-[var(--brand)]" : "bg-gray-300",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}