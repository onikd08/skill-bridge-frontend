"use client";

import { motion } from "framer-motion";
import {
  Target,
  Rocket,
  ShieldCheck,
  Calendar,
  Star,
  Users,
  BookOpen,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 🌌 Hero Section with Animated Background */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-600/20 to-purple-600/20 mix-blend-multiply" />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-6 text-center"
        >
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-1 rounded-full">
            Our Story
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Empowering Learning <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Through Connection
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
            Skill-Bridge is more than a platform; it's a global community where
            curiosity meets expertise. We're rewriting the rules of modern
            education.
          </p>
        </motion.div>
      </section>

      {/* 🎯 Mission & Vision: Floating Glass Cards */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 -mt-32 relative z-20">
          <motion.div
            {...fadeInUp}
            className="group p-10 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-2xl hover:border-indigo-500/50 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8 text-indigo-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To democratize elite tutoring by connecting students with
              world-class mentors who inspire confidence and academic mastery.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="group p-10 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-2xl hover:border-purple-500/50 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="w-8 h-8 text-purple-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To build the world's most intelligent learning bridge, where
              innovation and human empathy coexist to unlock human potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ✨ Why Choose Us: Feature Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Why Skill-Bridge?</h2>
            <p className="text-muted-foreground">
              The standard for personalized digital education.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Verified Tutors",
                icon: ShieldCheck,
                color: "text-blue-500",
                desc: "Rigorous background checks and skill assessments for every mentor.",
              },
              {
                title: "Flexible Scheduling",
                icon: Calendar,
                color: "text-green-500",
                desc: "Our smart-calendar syncs across your devices for seamless booking.",
              },
              {
                title: "Trusted Reviews",
                icon: Star,
                color: "text-yellow-500",
                desc: "Verified student feedback ensures consistent quality and transparency.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="p-8 bg-background rounded-3xl border border-transparent hover:border-primary/20 hover:shadow-xl transition-all"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-6`} />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 📊 High-Impact Stats */}
      <section className="py-24 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Tutors", val: "500+", icon: Users },
              { label: "Students", val: "2,000+", icon: BookOpen },
              { label: "Sessions", val: "10k+", icon: Award },
              { label: "Rating", val: "4.9★", icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <stat.icon className="w-6 h-6 text-primary mb-4 opacity-50" />
                <span className="text-4xl font-black mb-2">{stat.val}</span>
                <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CTA Section: Dark & Bold */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-indigo-600 p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20"
        >
          {/* Decorative Circle */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
            Ready to Start Your <br className="hidden md:block" /> Learning
            Journey?
          </h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Join thousands of students who have already bridged the gap to their
            academic goals.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-indigo-600 hover:bg-slate-100 rounded-full px-10 h-14 text-lg font-bold"
          >
            <Link href="/register">
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

// Ensure you import Badge from your UI library or create a small local component
function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`inline-flex items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    >
      {children}
    </span>
  );
}
