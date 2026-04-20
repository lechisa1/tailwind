"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import React from "react";
import { ProjectList } from "@/features/projects/ProjectList";

export default function ProjectPage() {
  return (
    <div className="p-6">
      <ProjectList />
    </div>
  );
}
