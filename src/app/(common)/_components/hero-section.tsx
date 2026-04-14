"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const images = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop",
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[currentIndex]}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge className="mb-6 px-4 py-1.5 text-sm bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
            Learn Anything, Anytime
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-white drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Connect with Expert Tutors Across Every Subject
        </motion.h1>

        <motion.p
          className="text-gray-200 text-lg md:text-xl max-w-2xl mt-6 drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          SkillBridge helps you find verified tutors, book sessions instantly,
          and learn at your own pace.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button size="lg" className="h-12 px-8 text-base shadow-lg" asChild>
            <Link href="/tutors">Find a Tutor</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base bg-white/10 text-white border-white/30 hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-sm"
          >
            Become a Tutor
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
