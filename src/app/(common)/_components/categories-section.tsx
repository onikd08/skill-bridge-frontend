"use client";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Globe,
  Calculator,
  Music,
  Palette,
  FlaskConical,
  Briefcase,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CategoriesSection({ categories }: { categories: any }) {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Popular Subjects
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our most sought-after subjects and find the perfect tutor to
          master your skills.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.length &&
          categories.map((cat: any, idx: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <Link href={`/tutors`}>
                <Card className="h-full hover:shadow-xl transition-all cursor-pointer text-center py-6 border-muted bg-card hover:border-primary/50">
                  <CardHeader className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-primary/10 rounded-full text-primary">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg">
                      {cat.categoryName}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
