"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a tutor?",
    answer: "You can browse our list of verified tutors, select one that meets your needs, and book a session directly through their calendar availability on their profile page."
  },
  {
    question: "Are the tutors verified?",
    answer: "Yes! Every single tutor on SkillBridge undergoes a rigorous background check and vetting process to ensure they have the expertise they claim. We review their credentials, teaching experience, and run identity verifications."
  },
  {
    question: "What happens if I need to cancel a session?",
    answer: "You can cancel a session up to 24 hours in advance for a full refund. Cancellations made within 24 hours may be subject to a cancellation fee. Our flexible policy ensures both students and tutors are respected."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Many of our tutors offer a discounted 15-minute introductory session. This gives you a chance to see if their teaching style, curriculum approach, and personality are a good fit for you before committing to a full lesson."
  },
  {
    question: "How are payments handled?",
    answer: "All payments are processed securely through our platform via Stripe. You pay at the time of booking, and funds are held securely until the session is completed and both parties are satisfied."
  }
];

export default function FAQSection() {
  return (
    <section className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Everything you need to know about SkillBridge, finding tutors, and succeeding in your learning.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-muted">
              <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
