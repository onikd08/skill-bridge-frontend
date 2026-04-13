"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FeaturedCard = ({ tutor }: { tutor: any }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-muted-foreground/10 flex flex-col">
        {/* Header with Image & Featured Badge */}
        <div className="relative pt-6 px-6 flex items-start justify-between">
          <div className="flex gap-4 items-center">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarImage src={tutor.user.imageUrl} alt={tutor.user.name} />
              <AvatarFallback className="bg-primary/5 text-primary font-bold">
                {tutor.user.name
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg leading-tight">
                {tutor.user.name}
              </CardTitle>
              <p className="text-xs font-medium text-primary mt-1">
                {tutor.categories?.map((c: any) => c.categoryName).join(" • ")}
              </p>
            </div>
          </div>
          {tutor.isFeatured && (
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none"
            >
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="mt-4 flex flex-col gap-4 grow">
          {/* Bio Snippet */}
          <p className="text-sm text-muted-foreground line-clamp-2 italic">
            "{tutor.bio || "No bio available"}"
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/50">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
              <span className="text-sm font-semibold">
                {tutor.averageRating?.toFixed(1) || "0.0"}
                <span className="text-muted-foreground font-normal ml-1">
                  ({tutor.totalReviews})
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {tutor.experience} yrs exp.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-xl font-bold text-foreground">
                ${tutor.hourlyRate}
              </span>
              <span className="text-xs text-muted-foreground ml-1">/ hr</span>
            </div>
            <Button asChild size="sm" className="rounded-full px-5 shadow-md">
              <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function TutorGrid({
  featuredTutors,
}: {
  featuredTutors: any[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {featuredTutors.map((tutor) => (
        <FeaturedCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
