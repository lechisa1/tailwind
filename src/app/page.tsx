"use client";

import React from "react";
import { StatCard } from "@/features/dashboard/StatCard";
import { ProjectProgressChart } from "@/features/dashboard/ProjectProgressChart";
import { BudgetAllocationChart } from "@/features/dashboard/BudgetAllocationChart";
import { MonthlyRevenueChart } from "@/features/dashboard/MonthlyRevenueChart";
import { RecentActivity } from "@/features/dashboard/RecentActivity";
import { ProjectList } from "@/features/projects/ProjectList";

import { useAuth } from "@/contexts/AuthContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
// Icons
const ProjectsIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const BudgetIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CompletionIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-gray-500 mt-1">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div> */}
      <Breadcrumb items={[{ label: "Dashboard" }]} />
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Projects"
          value="12"
          change="+2 this month"
          changeType="positive"
          icon={<ProjectsIcon />}
        />
        <StatCard
          title="Active Users"
          value="24"
          change="+4 new"
          changeType="positive"
          icon={<UsersIcon />}
        />
        <StatCard
          title="Budget Used"
          value="$85,000"
          change="12% remaining"
          changeType="neutral"
          icon={<BudgetIcon />}
        />
        <StatCard
          title="Completion Rate"
          value="78%"
          change="+5% this week"
          changeType="positive"
          icon={<CompletionIcon />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <ProjectProgressChart />
        <BudgetAllocationChart />
        <MonthlyRevenueChart />
      </div>

      {/* Activity & Table Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <ProjectList />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Users Table */}
      {/* <div className="grid grid-cols-1 gap-4 md:gap-6">
        <UserList />
      </div> */}
    </div>
  );
}
