import { Button } from "@/components/ui/button";
import tutorService from "@/services/tutor/tutor.service";
import Link from "next/link";
import { HeroSection } from "./_components/hero-section";
import TutorGrid from "@/components/modules/tutor/FeaturedCard";
import LandingFeatures from "./_components/landing-features";
import StatsSection from "./_components/stats-section";
import CategoriesSection from "./_components/categories-section";
import TestimonialsSection from "./_components/testimonials-section";
import FAQSection from "./_components/faq-section";
import NewsletterSection from "./_components/newsletter-section";
import CTASection from "./_components/cta-section";
import { getAllCategories } from "@/actions/category/category.action";

export default async function HomePage() {
  const { data } = await tutorService.getAllTutors();
  const tutors = data || [];

  const { data: categories } = (await getAllCategories()) || [];

  // ✅ Filter featured tutors
  const featuredTutors = tutors
    .filter((t: any) => t.isFeatured)
    .sort((a: any, b: any) => b.averageRating - a.averageRating)
    .slice(0, 3);

  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 3. Features & How It Works */}
      <LandingFeatures />

      {/* 4. Subject Categories */}
      <CategoriesSection categories={categories.slice(0, 4)} />

      {/* 5. Featured Tutors / Highlights */}
      <section className="container mx-auto flex flex-col gap-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Top Rated Tutors
            </h2>
            <p className="text-muted-foreground">
              Learn from the highest rated instructors on our platform.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            asChild
          >
            <Link href="/tutors">View All Tutors</Link>
          </Button>
        </div>

        <TutorGrid featuredTutors={featuredTutors} />
      </section>

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. FAQs */}
      <FAQSection />

      {/* 2. Statistics Section */}
      <StatsSection />

      {/* 8. Newsletter */}
      <NewsletterSection />
    </main>
  );
}
