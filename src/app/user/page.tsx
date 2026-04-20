"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import React from "react";
import { UserList } from "@/features/users/UserList";

export default function UserPage() {
  return (
    <div className="p-6">
      <UserList />
    </div>
  );
}
