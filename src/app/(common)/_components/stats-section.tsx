"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Students", value: "50,000+" },
  { label: "Expert Tutors", value: "2,500+" },
  { label: "5-Star Reviews", value: "100k+" },
  { label: "Subjects Covered", value: "150+" },
];

export default function StatsSection() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </h3>
              <p className="text-primary-foreground/80 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
