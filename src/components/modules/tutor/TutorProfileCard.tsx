"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, CheckCircle2 } from "lucide-react";
import { getInitials } from "@/lib/utils"; // Assuming you have this util
import { Tutor } from "@/app/(common)/_components/AllTutorsPage";

interface ICategory {
  id: string;
  categoryName: string;
}

export default function TutorProfileCard({ tutor }: { tutor: Tutor }) {
  const initials = getInitials(tutor.user.name);

  return (
    <Card className="w-full max-w-3xl mx-auto rounded-3xl shadow-sm border-border/50 overflow-hidden mt-10 sm:mt-15">
      <CardHeader className="flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6 pb-4">
        {/* Avatar Section - Centered on mobile, Left-aligned on Desktop */}
        <div className="relative mx-auto sm:mx-0">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background shadow-xl">
            <AvatarImage src={tutor.user.imageUrl ?? undefined} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span
            className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-card rounded-full"
            title="Online"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center sm:text-left w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {tutor.user.name}
            </h2>
            <div className="flex justify-center sm:justify-start gap-2">
              {tutor.isFeatured && (
                <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-none rounded-full px-3">
                  <Star className="w-3 h-3 fill-current mr-1" />
                  Featured
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="rounded-full bg-primary/5 text-primary border-none"
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-medium mb-3">
            {tutor.user.email}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm bg-muted/50 w-fit mx-auto sm:mx-0 px-3 py-1 rounded-full border border-border/50">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">
                {Number(tutor.averageRating).toFixed(1)}
              </span>
            </div>
            <span className="text-muted-foreground/60">|</span>
            <span className="text-muted-foreground">
              {tutor.totalReviews} reviews
            </span>
          </div>
        </div>

        {/* Pricing Section - Becomes a row-like highlight on mobile */}
        <div className="w-full sm:w-auto text-center sm:text-right p-4 sm:p-0 bg-primary/5 sm:bg-transparent rounded-2xl border border-primary/10 sm:border-none">
          <div className="flex flex-row sm:flex-col items-center justify-center sm:items-end gap-1">
            <span className="text-3xl font-bold text-primary sm:text-foreground">
              ${tutor.hourlyRate}
            </span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              / hour
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2 space-y-6">
        {/* Bio */}
        {tutor.bio && tutor.bio.trim() !== "" && (
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/20 rounded-full hidden sm:block" />
            <p className="text-base leading-relaxed text-muted-foreground italic px-0 sm:px-2">
              &quot;{tutor.bio}&quot;
            </p>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {tutor.categories.map((tc: ICategory) => (
            <Badge
              key={tc.id}
              variant="outline"
              className="px-4 py-1 rounded-full bg-background border-border/50 text-xs font-semibold uppercase tracking-tight"
            >
              {tc.categoryName}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
