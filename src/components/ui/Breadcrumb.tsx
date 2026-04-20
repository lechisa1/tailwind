import React from "react";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
} & React.HTMLAttributes<HTMLElement>;

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      className={cn("flex items-center gap-2 text-sm", className)}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.href ? (
            <a
              href={item.href}
              className={cn(
                "text-gray-500 hover:text-gray-700",
                index === items.length - 1 && "font-semibold text-gray-900"
              )}
            >
              {item.label}
            </a>
          ) : (
            <span
              className={cn(
                "text-gray-500",
                index === items.length - 1 && "font-semibold text-gray-900"
              )}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}