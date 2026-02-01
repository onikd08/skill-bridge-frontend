"use client";
import { deleteUser } from "@/actions/user/user.action";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

const UserManagement = ({ users }: { users: User[] }) => {
  const handleDeleteUser = async (id: string) => {
    const toastId = toast.loading("Deleting user...");
    const { error } = await deleteUser(id);

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    toast.success("User deleted successfully", { id: toastId });
  };
  return (
    <div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-left">Role</TableHead>
            <TableHead className="text-left">Email Verified</TableHead>
            <TableHead className="text-left">Image URL</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead className="text-left">Update At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow className="w-full">
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No user found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="max-w-100">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {user.email}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-left">{user.role}</TableCell>
                <TableCell className="text-left">
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </TableCell>
                <TableCell className="text-left">
                  {user.image ?? "Not given"}
                </TableCell>
                <TableCell className="text-left">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="text-left">
                  {formatDate(user.updatedAt)}
                </TableCell>
                <TableCell>
                  {
                    <Button
                      onClick={() => handleDeleteUser(user.id)}
                      type="button"
                      variant="destructive"
                      size="sm"
                    >
                      X
                    </Button>
                  }
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
