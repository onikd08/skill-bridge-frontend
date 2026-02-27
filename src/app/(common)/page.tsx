import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Users, ShieldCheck, Sparkles } from "lucide-react";
import tutorService from "@/services/tutor/tutor.service";
import Link from "next/link";

export default async function HomePage() {
  const { data } = await tutorService.getAllTutors();
  const tutors = data || [];

  // ✅ Filter featured tutors
  const featuredTutors = tutors
    .filter((t: any) => t.isFeatured)
    .sort((a: any, b: any) => b.averageRating - a.averageRating)
    .slice(0, 3);

  return (
    <main className="flex flex-col gap-24">
      {/* 1️⃣ Hero Section */}
      <section className="container mx-auto flex flex-col items-center text-center gap-6 pt-20">
        <Badge variant="secondary">Learn Anything, Anytime</Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
          Connect with Expert Tutors Across Every Subject
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          SkillBridge helps you find verified tutors, book sessions instantly,
          and learn at your own pace.
        </p>
        <div className="flex gap-4 mt-4">
          <Button size="lg" asChild>
            <Link href="/tutors">Find a Tutor</Link>
          </Button>
          <Button size="lg" variant="outline">
            Become a Tutor
          </Button>
        </div>
      </section>

      {/* 2️⃣ Why Choose SkillBridge (NEW SECTION) */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto flex flex-col gap-12">
          <h2 className="text-3xl font-semibold text-center">
            Why Choose SkillBridge?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <CardTitle>Verified Tutors</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                All tutors are carefully reviewed to ensure high-quality
                teaching experience.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <CardTitle>Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Book sessions at times that work for you — no hassle, no
                back-and-forth.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <CardTitle>Top Rated Instructors</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Learn from tutors with proven success and outstanding student
                feedback.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3️⃣ How It Works */}
      <section className="container mx-auto flex flex-col gap-12">
        <h2 className="text-3xl font-semibold text-center">
          How SkillBridge Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8" />
              <CardTitle>Choose a Tutor</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Browse verified tutors, compare profiles, reviews, and hourly
              rates.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Calendar className="h-8 w-8" />
              <CardTitle>Book a Session</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Select an available time slot and book instantly.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Star className="h-8 w-8" />
              <CardTitle>Learn & Review</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Attend sessions, achieve your goals, and leave reviews.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4️⃣ Featured Tutors */}
      <section className="container mx-auto flex flex-col gap-12 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-semibold">Top Rated Tutors</h2>
          <Button variant="outline" asChild>
            <Link href="/tutors">View All Tutors</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredTutors.map((tutor: any) => (
            <Card
              key={tutor.id}
              className="hover:shadow-xl transition-all duration-300 border hover:border-primary"
            >
              <CardHeader>
                <CardTitle>{tutor.user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {tutor.categories?.map((c: any) => c.categoryName).join(", ")}
                </p>
              </CardHeader>

              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                  <span>
                    {tutor.averageRating?.toFixed(1) || "0.0"} (
                    {tutor.totalReviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  ${tutor.hourlyRate} / hour
                </p>

                <Button asChild size="sm" className="mt-2">
                  <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
