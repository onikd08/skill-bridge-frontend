"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
} as const;

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Let&apos;s Start a{" "}
            <span className="text-primary">Conversation</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have questions about our tutors or need technical support? Our team
            is here to help you bridge the gap to your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* --- Left Column: Contact Form --- */}
          <motion.div {...fadeInUp}>
            <Card className="border-none shadow-2xl shadow-primary/5 bg-card/60 backdrop-blur-xl p-8 rounded-[2rem]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">
                      Full Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      className="rounded-xl h-12 bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="rounded-xl h-12 bg-background/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Subject</label>
                  <Input
                    placeholder="How can we help?"
                    className="rounded-xl h-12 bg-background/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Message</label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    className="rounded-xl min-h-[150px] bg-background/50 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* --- Right Column: Info & Details --- */}
          <div className="space-y-12">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <MessageSquare className="text-primary h-6 w-6" />
                Contact Information
              </h3>

              <div className="grid gap-6">
                {[
                  {
                    icon: Mail,
                    label: "Email us at",
                    val: "support@skillbridge.com",
                    color: "bg-blue-500/10 text-blue-500",
                  },
                  {
                    icon: Phone,
                    label: "Call us at",
                    val: "+880 1234-567890",
                    color: "bg-green-500/10 text-green-500",
                  },
                  {
                    icon: MapPin,
                    label: "Visit our office",
                    val: "Dhaka, Bangladesh",
                    color: "bg-red-500/10 text-red-500",
                  },
                  {
                    icon: Clock,
                    label: "Working Hours",
                    val: "Mon - Fri, 9am - 6pm",
                    color: "bg-purple-500/10 text-purple-500",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 p-4 rounded-2xl hover:bg-muted transition-colors group"
                  >
                    <div
                      className={`h-12 w-12 rounded-xl ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* --- Global Presence Small Card --- */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-[2rem] bg-indigo-600 text-white relative overflow-hidden"
            >
              <Globe className="absolute -right-8 -bottom-8 h-40 w-40 text-white/10" />
              <h4 className="text-xl font-bold mb-2">Global Support</h4>
              <p className="text-indigo-100 text-sm leading-relaxed relative z-10">
                Our support team operates across multiple time zones to ensure
                you get help whenever you need it.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
