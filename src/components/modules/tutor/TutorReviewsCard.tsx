"use client";

import { motion } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student?: {
    name: string;
    imageUrl: string | null;
  } | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
} as const;

export default function TutorReviewsCard({ reviews }: { reviews: Review[] }) {
  const displayReviews = reviews?.slice(0, 3) || [];

  if (displayReviews.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="w-full max-w-3xl mx-auto rounded-3xl shadow-lg shadow-primary/5 border-border/50 overflow-hidden mt-6 md:mt-10 bg-card/60 backdrop-blur-xl">
        <CardHeader className="p-6 pb-4 bg-linear-to-r from-primary/10 via-transparent to-transparent border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-background shadow-sm text-primary">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold tracking-tight">
                Student Success Stories
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium">
                Hear what others have to say
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-5"
          >
            {displayReviews.map((review, i) => (
              <motion.div
                variants={itemVariants}
                key={review.id}
                className="relative p-6 rounded-3xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group overflow-hidden z-10"
              >
                {/* Background decorative blob */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors z-0" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-5 gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar container with hover effect */}
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-background shadow-md group-hover:scale-105 transition-transform">
                          <AvatarImage
                            src={review.student?.imageUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${review.id}&backgroundColor=ffffff`}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg uppercase">
                            {review.student?.name ? getInitials(review.student.name) : "S"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-background" />
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground">
                          {review.student?.name || "Verified Student"}
                        </h4>
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Rating stars rendering */}
                    <div className="flex gap-0.5 bg-muted/50 px-3 py-1.5 rounded-2xl border border-border/50">
                      {[...Array(5)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              idx < review.rating
                                ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                                : "fill-muted text-muted-foreground/30"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="relative pl-2">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 to-transparent rounded-full" />
                    <p className="text-[15px] text-foreground/90 leading-relaxed italic pr-8">
                      "{review.comment}"
                    </p>
                    <MessageSquareQuote className="absolute right-0 bottom-0 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors transform group-hover:scale-110 group-hover:-rotate-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
