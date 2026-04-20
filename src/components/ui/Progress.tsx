import React from "react";
import { cn } from "@/lib/utils";

type ProgressProps = {
  value?: number;
  max?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function Progress({
  value = 0,
  max = 100,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full transition-all bg-[var(--brand)]"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}