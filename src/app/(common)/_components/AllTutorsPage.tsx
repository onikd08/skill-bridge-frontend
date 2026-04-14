"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import TutorSkeleton from "../_components/tutor-skeleton";
import TutorCard from "../_components/tutorCard";

const API_URL = "https://skill-bridge-backend-iota.vercel.app/api";
export interface Tutor {
  id: string;
  bio: string;
  experience: number;
  hourlyRate: number;
  isFeatured: boolean;
  totalReviews: number;
  averageRating: number;
  categories: { id: string; categoryName: string }[];
  availability: { isBooked: boolean }[];
  user: {
    name: string;
    imageUrl: string | undefined;
    email: string;
  };
}

export default function AllTutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`${API_URL}/tutors`);
        const data = await res.json();
        setTutors(data?.data || []);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const categories = useMemo(() => {
    const all = tutors.flatMap((t) => t.categories.map((c) => c.categoryName));
    return ["all", ...Array.from(new Set(all))];
  }, [tutors]);

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchesCategory =
        selectedCategory === "all" ||
        tutor.categories.some((c) => c.categoryName === selectedCategory);
      const matchesFeatured = !featuredOnly || tutor.isFeatured;
      return matchesCategory && matchesFeatured;
    });
  }, [tutors, selectedCategory, featuredOnly]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Find Your <span className="text-primary">Perfect</span> Tutor
          </h1>
          <p className="text-muted-foreground">
            Browse through our verified experts and start your learning journey
            today.
          </p>
        </motion.div>

        {/* Filters bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sticky top-20 z-30 mb-12 p-4 rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-4 h-4 text-primary" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer capitalize"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="dark:bg-gray-900">
                  {cat === "all" ? "All Subjects" : cat}
                </option>
              ))}
            </select>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={() => setFeaturedOnly(!featuredOnly)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            <span className="ml-3 text-sm font-medium text-muted-foreground">
              Featured Only
            </span>
          </label>
        </motion.div>

        {/* Tutors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => <TutorSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredTutors.map((tutor) => {
                return <TutorCard key={tutor.id} tutor={tutor} />;
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && filteredTutors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20 p-12 rounded-3xl border-2 border-dashed"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold">No tutors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find more experts.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedCategory("all");
                setFeaturedOnly(false);
              }}
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
