"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/actions/category/category.action";

type Category = {
  id: string;
  categoryName: string;
};

export default function CategoryManagement({
  categories,
}: {
  categories: Category[];
}) {
  const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDeleteCategory = async (categoryId: string) => {
    const toastId = toast.loading("Deleting category...");
    const { error } = await deleteCategory(categoryId);

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    toast.success("Category deleted successfully", { id: toastId });
  };

  const openCreateDialog = () => {
    setEditingCategory(null);
    setName("");
    setOpenForm(true);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setName(category.categoryName);
    setOpenForm(true);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const toastId = toast.loading(
      editingCategory ? "Updating category..." : "Creating category...",
    );

    try {
      if (editingCategory) {
        const { success, message } = await updateCategory(
          editingCategory.id,
          name,
        );
        if (!success) {
          toast.error(message, { id: toastId });
          return;
        }
        toast.success(message, { id: toastId });
      } else {
        const { success, message } = await createCategory(name);
        if (!success) {
          toast.error(message, { id: toastId });
          return;
        }
        toast.success(message, { id: toastId });
      }

      setOpenForm(false);
      setName("");
      setEditingCategory(null);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Category Management</CardTitle>

        {/* Create Category */}
        <Button onClick={openCreateDialog}>Add Category</Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {categories.length === 0 && (
          <p className="text-sm text-muted-foreground">No categories found.</p>
        )}

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <span className="font-medium">{category.categoryName}</span>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog(category)}
              >
                Edit
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this category?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Yes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </CardContent>

      {/* Create / Update Dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Update Category" : "Create Category"}
            </DialogTitle>
            <DialogDescription>
              Enter a category name and submit.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Business"
            />
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>
              {editingCategory ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
