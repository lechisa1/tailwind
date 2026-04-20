import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, changeType = "neutral", icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p
                className={`text-xs font-medium flex items-center gap-1 ${
                  changeType === "positive"
                    ? "text-green-600"
                    : changeType === "negative"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {changeType === "positive" && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {changeType === "negative" && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span>{change}</span>
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-lg bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)]">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
