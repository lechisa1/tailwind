import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search } from "@/components/ui/Search";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { UserForm } from "./UserForm";
import { UserDetail } from "./UserDetail";
import type { User } from "@/types/user";
import { INITIAL_USERS } from "./data";

export function UserList() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = (data: UserFormData) => {
    const newUser: User = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
    };
    setUsers((prev) => [...prev, newUser]);
    toast(`User "${data.name}" created successfully`, "success");
  };

  const handleUpdateUser = (data: UserFormData) => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id ? { ...user, ...data } : user,
      ),
    );
    toast(`User "${data.name}" updated successfully`, "success");
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    toast(`User "${userName}" deleted`, "error");
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const openDetailModal = (user: User) => {
    setSelectedUser(user);
    setDetailModalOpen(true);
  };

  const closeModals = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDetailModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-xl text-black">Team Members</CardTitle>
          <p className="text-sm text-gray-500">
            Manage your team and their access levels.
          </p>
        </div>
        <Button size="sm" onClick={() => setCreateModalOpen(true)}>
          + Invite User
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          headers={
            <>
              <Search placeholder="Search members..." />
              <div className="flex gap-2">
                <Select className="w-32 text-black">
                  <option value="">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </Select>
              </div>
            </>
          }
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Role", accessor: "role" },
            {
              header: "Status",
              accessor: "status",
              cell: (row) => (
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    row.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700",
                  )}
                >
                  {row.status}
                </span>
              ),
            },
            {
              header: "Actions",
              accessor: "id",
              cell: (row) => (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDetailModal(row)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteUser(row.id, row.name)}
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
          data={users}
        />
      </CardContent>

      {/* Create User Modal */}
      <UserForm
        isOpen={createModalOpen}
        onClose={closeModals}
        onSubmit={handleCreateUser}
      />

      {/* Edit User Modal */}
      <UserForm
        key={selectedUser ? `edit-${selectedUser.id}` : "edit"}
        isOpen={editModalOpen}
        onClose={closeModals}
        onSubmit={handleUpdateUser}
        initialData={selectedUser || undefined}
      />

      {/* User Detail Modal */}
      <UserDetail
        isOpen={detailModalOpen}
        onClose={closeModals}
        user={selectedUser}
        onEdit={openEditModal}
      />
    </Card>
  );
}
