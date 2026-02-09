import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Calendar, Users } from "lucide-react";
import tutorService from "@/services/tutor/tutor.service";
import Link from "next/link";

export default async function HomePage() {
  const { data } = await tutorService.getAllTutors();
  const tutors = data || [];
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
          <Button size="lg">Find a Tutor</Button>
          <Button size="lg" variant="outline">
            Become a Tutor
          </Button>
        </div>
      </section>

      {/* 2️⃣ Search / Explore Section */}
      <section className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">
            Search tutors by subject, price, or rating
          </h2>
          <p className="text-muted-foreground">
            Explore hundreds of tutors filtered by expertise, availability, and
            student reviews.
          </p>
          <div className="flex gap-2 max-w-md">
            <Input placeholder="Search subjects (e.g. Math, Java, UI/UX)" />
            <Button size="icon">
              <Search />
            </Button>
          </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {[
              "Mathematics",
              "Programming",
              "Design",
              "Data Science",
              "Languages",
              "Marketing",
            ].map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="justify-center py-2"
              >
                {cat}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* 3️⃣ How It Works Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto flex flex-col gap-12">
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
                Select an available time slot and book instantly with no
                back-and-forth.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Star className="h-8 w-8" />
                <CardTitle>Learn & Review</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Attend sessions, achieve your goals, and leave reviews to help
                others.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4️⃣ Featured Tutors Section */}
      <section className="container mx-auto flex flex-col gap-12 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-semibold">Top Rated Tutors</h2>
          <Button variant="outline">View All Tutors</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tutors.length &&
            tutors.map((tutor: any) => (
              <Card
                key={tutor.id}
                className="hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <CardTitle>{tutor.user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {tutor.subject}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                    <span>
                      {tutor.averageRating} ({tutor.totalReviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">$40 / hour</p>
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
