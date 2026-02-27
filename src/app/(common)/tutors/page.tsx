"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API_URL = "https://skill-bridge-backend-iota.vercel.app/api";
interface Tutor {
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
  };
}

export default function AllTutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      const res = await fetch(`${API_URL}/tutors`);
      const data = await res.json();
      setTutors(data?.data || []);
    };
    fetchTutors();
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const all = tutors.flatMap((t) => t.categories.map((c) => c.categoryName));
    return ["all", ...Array.from(new Set(all))];
  }, [tutors]);

  // Filtered tutors
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
    <div className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Find Your Perfect Tutor
          </h1>
        </div>

        {/* 🔍 Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border
            bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-200
            border-gray-200 dark:border-gray-700"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Featured Toggle */}
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={() => setFeaturedOnly(!featuredOnly)}
              className="w-4 h-4 accent-indigo-600"
            />
            Featured Only
          </label>
        </div>

        {/* Tutors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutors.map((tutor) => {
            const availableSlots = tutor.availability.filter(
              (slot) => !slot.isBooked,
            ).length;

            return (
              <div
                key={tutor.id}
                className="rounded-2xl p-6 flex flex-col justify-between
                bg-white dark:bg-gray-900
                shadow-md hover:shadow-xl
                border border-gray-100 dark:border-gray-800
                transition-all"
              >
                <div>
                  {tutor.isFeatured && (
                    <span
                      className="inline-block mb-3 px-3 py-1 text-xs font-semibold 
                    bg-yellow-100 text-yellow-700 
                    dark:bg-yellow-500/20 dark:text-yellow-400 
                    rounded-full"
                    >
                      ⭐ Featured
                    </span>
                  )}

                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {tutor.user.name}
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {tutor.categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="px-3 py-1 text-xs rounded-full
                        bg-indigo-100 text-indigo-600
                        dark:bg-indigo-500/20 dark:text-indigo-400"
                      >
                        {cat.categoryName}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm mt-4 text-gray-600 dark:text-gray-400 line-clamp-3">
                    {tutor.bio}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>🎓 {tutor.experience} years</p>
                    <p>💰 ${tutor.hourlyRate} / hour</p>
                    <p>
                      ⭐{" "}
                      {tutor.averageRating > 0
                        ? tutor.averageRating.toFixed(1)
                        : "No ratings"}{" "}
                      ({tutor.totalReviews})
                    </p>
                    <p>
                      🟢 Available Slots:{" "}
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {availableSlots}
                      </span>
                    </p>
                  </div>
                </div>

                <Link
                  href={`/tutors/${tutor.id}`}
                  className="mt-6 text-center py-2 rounded-xl font-medium
                  bg-indigo-600 hover:bg-indigo-700
                  dark:bg-indigo-500 dark:hover:bg-indigo-600
                  text-white transition"
                >
                  View Profile
                </Link>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTutors.length === 0 && (
          <div className="text-center mt-16 text-gray-500 dark:text-gray-400">
            No tutors found for selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
