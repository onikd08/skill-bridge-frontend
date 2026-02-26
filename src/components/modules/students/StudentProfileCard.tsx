"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { updateStudentInfo } from "@/actions/student/student.action";

type Student = {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  role: string;
  status: string;
};

export default function StudentProfileCard({ student }: { student: Student }) {
  const [name, setName] = useState(student.name);
  const [image, setImage] = useState(student.imageUrl ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    startTransition(async () => {
      try {
        const { data, success, message } = await updateStudentInfo({
          name,
          imageUrl: image,
        });

        if (!success) {
          toast.error(message);
          return;
        }
        toast.success(message);
      } catch {
        toast.error("Failed to update profile");
      }
    });
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image || undefined} />
            <AvatarFallback>
              {student.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <Input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Email (readonly) */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <Input value={student.email} disabled />
        </div>

        {/* Role & Status */}
        <div className="flex gap-2">
          <Badge variant="outline">{student.role}</Badge>
          <Badge variant="secondary">{student.status}</Badge>
        </div>

        {/* Save */}
        <Button onClick={handleSave} disabled={isPending} className="w-full">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
        {/* <Button disabled={isPending} className="w-full">
          {isPending ? "Saving..." : "Save Changes"}
        </Button> */}
      </CardContent>
    </Card>
  );
}
