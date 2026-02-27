"use client";

import { updateIsFeatured, updateUserStatus } from "@/actions/user/user.action";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { useState, useMemo } from "react";
import { toast } from "sonner";

export interface IUser {
  id: string;
  name: string;
  status: "ACTIVE" | "BANNED";
  email: string;
  createdAt: string;
  updatedAt: string;
  role: "STUDENT" | "TUTOR";
  tutorProfile: {
    isFeatured: boolean;
  } | null;
}

const UserManagement = ({ users }: { users: IUser[] }) => {
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [localUsers, setLocalUsers] = useState(users);

  /* ================= Update Status ================= */
  const handleUpdateStatus = async (id: string) => {
    const toastId = toast.loading("Updating User Status...");

    const { success, message } = await updateUserStatus(id);

    if (!success) {
      toast.error(message, { id: toastId });
      return;
    }

    // 🔥 UPDATE UI IMMEDIATELY
    setLocalUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "ACTIVE" ? "BANNED" : "ACTIVE",
            }
          : user,
      ),
    );

    toast.success(message, { id: toastId });
  };

  /* ================= TOGGLE FEATURED ================= */
  const handleToggleFeatured = async (user: IUser) => {
    if (!user.tutorProfile) return;

    const toastId = toast.loading("Updating...");

    const { success, message } = await updateIsFeatured(user.id);

    if (!success) {
      toast.error(message, { id: toastId });
      return;
    }

    setLocalUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? {
              ...u,
              tutorProfile: {
                ...u.tutorProfile!,
                isFeatured: !u.tutorProfile!.isFeatured,
              },
            }
          : u,
      ),
    );

    toast.success(message, { id: toastId });
  };
  /* ================= ROLE FILTER ================= */
  const filteredUsers = useMemo(() => {
    if (selectedRole === "ALL") return localUsers;
    return localUsers.filter((u) => u.role === selectedRole);
  }, [selectedRole, localUsers]);

  return (
    <div className="space-y-6">
      {/* 🔽 Filter Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Management</h2>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 rounded-lg border 
          bg-white dark:bg-gray-900 
          border-gray-200 dark:border-gray-700"
        >
          <option value="ALL">All Roles</option>
          <option value="STUDENT">Student</option>
          <option value="TUTOR">Tutor</option>
        </select>
      </div>

      {/* 📋 Table */}
      <Table className="border rounded-lg overflow-hidden">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/40 transition">
                {/* Name */}
                <TableCell>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell>
                  <Badge variant="outline" className="font-medium">
                    {user.role}
                  </Badge>
                </TableCell>

                {/* Featured */}
                <TableCell>
                  {user.role === "TUTOR" && user.tutorProfile ? (
                    <Button
                      size="sm"
                      variant={
                        user.tutorProfile.isFeatured ? "default" : "outline"
                      }
                      onClick={() => handleToggleFeatured(user)}
                    >
                      {user.tutorProfile.isFeatured
                        ? "⭐ Featured"
                        : "Mark Featured"}
                    </Button>
                  ) : (
                    <span className="text-muted-foreground text-sm">N/A</span>
                  )}
                </TableCell>

                {/* Dates */}
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>{formatDate(user.updatedAt)}</TableCell>

                {/* Action */}
                <TableCell>
                  <Button
                    onClick={() => handleUpdateStatus(user.id)}
                    variant="destructive"
                    size="sm"
                  >
                    {user.status === "ACTIVE" ? "Ban" : "Unban"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
