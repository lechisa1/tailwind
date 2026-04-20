"use client";

import React from "react";
import { UserList } from "@/features/users/UserList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function UserPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Dashboard", href: "/" }, { label: "Users" }]}
      />

      <UserList />
    </div>
  );
}
