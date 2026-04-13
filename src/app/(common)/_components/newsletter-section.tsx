"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

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
          <h2 className="text-3xl font-bold mb-4">Stay Up to Date</h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Subscribe to our newsletter for the latest learning tips, new course announcements, and exclusive discount codes right to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 h-12"
              required
            />
            <Button type="submit" size="lg" className="h-12 px-8">Subscribe</Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
