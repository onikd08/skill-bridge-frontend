"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Computer Science Student",
    content: "SkillBridge completely changed my learning trajectory. My programming tutor helped me ace my finals when I was struggling just weeks before.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Michael Chen",
    role: "Language Enthusiast",
    content: "Finding a native Spanish speaker who also knew how to teach was impossible until I found this platform. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
  {
    name: "Emily Rodriguez",
    role: "High School Junior",
    content: "The flexibility of scheduling and the quality of verified tutors gives my parents peace of mind and gives me the help I need for SAT prep.",
    avatar: "https://i.pravatar.cc/150?u=emily",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here is what our community has to say about their learning experience on SkillBridge.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <Card className="h-full border-muted/50 shadow-sm hover:shadow-md transition-shadow relative bg-background">
                <CardHeader>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-[calc(100%-4rem)]">
                  <p className="text-muted-foreground italic mb-6">"{test.content}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar>
                      <AvatarImage src={test.avatar} />
                      <AvatarFallback>{test.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm">{test.name}</h4>
                      <p className="text-xs text-muted-foreground">{test.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
