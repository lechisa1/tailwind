"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", progress: 45 },
  { name: "Feb", progress: 52 },
  { name: "Mar", progress: 48 },
  { name: "Apr", progress: 61 },
  { name: "May", progress: 55 },
  { name: "Jun", progress: 67 },
  { name: "Jul", progress: 78 },
];

export function ProjectProgressChart() {
  return (
    <div className="p-6 bg-white border rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Project Progress
          </h3>
          <p className="text-sm text-gray-500">Overall completion rate trend</p>
        </div>
        <select className="text-sm border-none bg-gray-50 rounded-md px-2 py-1 focus:ring-0 cursor-pointer text-gray-600">
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--brand, #3b82f6)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--brand, #3b82f6)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="var(--brand, #3b82f6)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProgress)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
