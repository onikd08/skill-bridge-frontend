"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Star, GraduationCap } from "lucide-react";

// Shadcn UI Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Utils
import { cn, getInitials } from "@/lib/utils";
import { Tutor } from "./AllTutorsPage";

interface TutorCardProps {
  tutor: Tutor;
  className?: string;
}

export default function TutorCard({ tutor, className }: TutorCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn("h-full", className)}
    >
      <Card className="h-full flex flex-col overflow-hidden border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-300">
        {/* Card Header: Avatar, Status, and Rate */}
        <CardHeader className="p-6 pb-2">
          <div className="flex justify-between items-start">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-background shadow-md group-hover:border-primary/50 transition-colors">
                <AvatarImage
                  src={tutor.user.imageUrl || ""}
                  alt={tutor.user.name}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg uppercase">
                  {getInitials(tutor.user.name)}
                </AvatarFallback>
              </Avatar>
              {/* Online Status Dot */}
              <span
                className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full shadow-sm"
                title="Online"
              />
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                ${tutor.hourlyRate}
                <span className="text-xs text-muted-foreground font-normal ml-0.5">
                  /hr
                </span>
              </div>
              {tutor.isFeatured && (
                <Badge className="mt-2 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-none rounded-full px-2 py-0 hover:bg-yellow-500/20">
                  <Star className="w-3 h-3 fill-current mr-1" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    Featured
                  </span>
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Card Content: Name, Categories, and Bio */}
        <CardContent className="p-6 pt-2 grow">
          <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {tutor.user.name}
          </h2>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {tutor.categories.slice(0, 2).map((cat) => (
              <Badge
                key={cat.id}
                variant="secondary"
                className="text-[10px] font-bold px-2 py-0 rounded-md uppercase tracking-widest bg-muted text-muted-foreground"
              >
                {cat.categoryName}
              </Badge>
            ))}
          </div>

          <p className="text-sm mt-4 text-muted-foreground line-clamp-3 leading-relaxed italic">
            "
            {tutor.bio ||
              "Experience the joy of learning with personalized sessions."}
            "
          </p>

          {/* Stats Section */}
          <div className="mt-6 pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4 text-primary" />
              <span>{tutor.experience} yrs exp.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-end">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-foreground">
                {tutor.averageRating > 0
                  ? tutor.averageRating.toFixed(1)
                  : "New"}
              </span>
              <span className="text-xs font-normal">
                ({tutor.totalReviews})
              </span>
            </div>
          </div>
        </CardContent>

        {/* Card Footer: Action Button */}
        <CardFooter className="p-6 pt-0">
          <Button
            asChild
            className="w-full rounded-2xl py-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all"
          >
            <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
