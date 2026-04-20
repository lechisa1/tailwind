import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search } from "@/components/ui/Search";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "E-commerce Redesign",
    client: "Global Retail",
    budget: "$12,000",
    progress: 75,
    status: "active",
  },
  {
    id: 2,
    name: "Mobile App Alpha",
    client: "Startup Co",
    budget: "$8,500",
    progress: 30,
    status: "active",
  },
  {
    id: 3,
    name: "Internal CRM",
    client: "Internal",
    budget: "$5,000",
    progress: 100,
    status: "completed",
  },
];

export function ProjectList() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6">
        <div className="space-y-1">
          <CardTitle className="text-xl">Active Projects</CardTitle>
          <p className="text-sm text-gray-500">
            Monitor budget and progress across all initiatives.
          </p>
        </div>
        <Button size="sm" className="w-full sm:w-auto" onClick={() => setModalOpen(true)}>
          New Project
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          headers={<Search placeholder="Filter projects..." />}
          columns={[
            { header: "Project Name", accessor: "name" },
            { header: "Client", accessor: "client" },
            { header: "Budget", accessor: "budget" },
            {
              header: "Progress",
              accessor: "progress",
              cell: (row) => (
                <div className="w-full max-w-[100px] space-y-1">
                  <div className="flex justify-between text-[10px] font-medium">
                    <span>{row.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-[var(--brand)] transition-all"
                      style={{ width: `${row.progress}%` }}
                    />
                  </div>
                </div>
              ),
            },
            {
              header: "Actions",
              accessor: "id",
              cell: () => (
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              ),
            },
          ]}
          data={MOCK_PROJECTS}
        />
      </CardContent>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Project"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Enter the project details below to add a new initiative to your
            dashboard.
          </p>
        </div>
      </Modal>
    </Card>
  );
}
