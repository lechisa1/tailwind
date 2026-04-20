"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

interface UserDetailProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onEdit: (user: User) => void;
}

export function UserDetail({ isOpen, onClose, user, onEdit }: UserDetailProps) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details" footer={
      <>
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={() => onEdit(user)}>Edit User</Button>
      </>
    }>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand)] to-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
            {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Role</p>
            <p className="text-sm font-medium text-gray-900">{user.role}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Status</p>
            <span
              className={cn(
                "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              {user.status}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-gray-400">User ID: {user.id}</p>
        </div>
      </div>
    </Modal>
  );
}
