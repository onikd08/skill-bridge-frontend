"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient matching brand */}
      <div className="absolute inset-0 bg-primary z-0" />
      <div className="absolute inset-0 bg-black/10 z-0" />
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10 text-center text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Unlock Your Potential?</h2>
          <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 font-medium">
            Join thousands of students who have already accelerated their learning journey with our expert tutors. 
            The first step to mastery is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-14 font-semibold px-8 text-primary border-0 hover:bg-white/90" asChild>
              <Link href="/register/student">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 text-white border-white/30 bg-transparent hover:bg-white hover:text-primary px-8" asChild>
              <Link href="/tutors" className="flex items-center">
                Browse Tutors <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
