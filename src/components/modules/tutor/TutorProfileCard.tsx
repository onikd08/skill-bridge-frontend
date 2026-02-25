"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ITutor {
  bio: string | null;
  experience: number;
  hourlyRate: number;
  isFeatured: boolean;
  totalReviews: number;
  averageRating: number;
  categories: ICategory[];
  user: {
    name: string;
    image: string | null;
    email: string;
  };
}

interface ICategory {
  id: string;
  categoryName: string;
}

export default function TutorProfileCard({ tutor }: { tutor: ITutor }) {
  const initials = tutor.user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("");

  return (
    <Card className="w-full max-w-3xl mx-auto rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row gap-4 items-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src={tutor.user.image ?? undefined} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{tutor.user.name}</h2>
            {tutor.isFeatured && <Badge variant="secondary">Featured</Badge>}
          </div>

          <p className="text-sm text-muted-foreground">{tutor.user.email}</p>

          <div className="flex items-center gap-1 mt-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">
              {Number(tutor.averageRating).toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({tutor.totalReviews} reviews)
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">${tutor.hourlyRate}</p>
          <p className="text-sm text-muted-foreground">per hour</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bio */}
        {tutor.bio && tutor.bio.trim() !== "" && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {tutor.bio}
          </p>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {tutor.categories.map((tc: ICategory) => (
            <Badge key={tc.id} variant="outline">
              {tc.categoryName}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
