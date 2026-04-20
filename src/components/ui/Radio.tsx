import React from "react";
import { cn } from "@/lib/utils";

type RadioGroupProps = {
  children: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export function RadioGroup({
  children,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <fieldset
      className={cn("space-y-2", className)}
      {...props}
    >
      {children}
    </fieldset>
  );
}

type RadioProps = {
  children: React.ReactNode;
  value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Radio({ children, value, className, ...props }: RadioProps) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2", className)}>
      <input
        type="radio"
        value={value}
        className="h-4 w-4 border-gray-300 text-[var(--brand)] focus:ring-[var(--brand)]"
        {...props}
      />
      <span>{children}</span>
    </label>
  );
}