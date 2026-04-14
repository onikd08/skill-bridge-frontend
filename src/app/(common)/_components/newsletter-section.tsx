"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function NewsletterSection() {
  return (
    <section className="py-24 border-t border-muted/50 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Start Learning</h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Want to learn something new today? Join our community of students
            and start your journey today.
          </p>
          <Button className="h-10 w-40">
            <Link href="/register?role=STUDENT">Become a Student</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
