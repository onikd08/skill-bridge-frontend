"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Calendar,
  Sparkles,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

export default function LandingFeatures() {
  return (
    <div className="space-y-32 py-20">
      {/* 2️⃣ Why Choose SkillBridge */}
      <section className="bg-muted/30 py-24 relative overflow-hidden">
        {/* Subtle background decorative element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Why Choose SkillBridge?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built a platform focused on trust, flexibility, and real
              educational results.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Verified Tutors",
                icon: ShieldCheck,
                desc: "All tutors are carefully reviewed to ensure high-quality teaching experience.",
              },
              {
                title: "Flexible Scheduling",
                icon: Calendar,
                desc: "Book sessions at times that work for you — no hassle, no back-and-forth.",
              },
              {
                title: "Top Rated Instructors",
                icon: Sparkles,
                desc: "Learn from tutors with proven success and outstanding student feedback.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-none shadow-sm bg-background/60 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ How It Works */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            How SkillBridge Works
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 relative"
        >
          {[
            {
              step: "01",
              title: "Choose a Tutor",
              icon: Users,
              desc: "Browse verified tutors, compare profiles, reviews, and hourly rates.",
            },
            {
              step: "02",
              title: "Book a Session",
              icon: Calendar,
              desc: "Select an available time slot and book instantly with secure payment.",
            },
            {
              step: "03",
              title: "Learn & Review",
              icon: Star,
              desc: "Attend sessions, achieve your goals, and leave reviews for your tutor.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connection Line (Desktop only) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-[2px] bg-muted -z-10" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-500">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed px-4">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
