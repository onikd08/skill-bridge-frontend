"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, BookOpen, DollarSign } from "lucide-react";
import { format } from "date-fns";

type TutorDashboardProps = {
  tutor: any;
};

export default function TutorDashboard({ tutor }: TutorDashboardProps) {
  const upcomingSlots = tutor.availability.filter(
    (slot: any) => !slot.isBooked,
  );

  return (
    <div className="space-y-8 p-6">
      {/* ================= HEADER ================= */}
      <Card className="bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-xl rounded-2xl">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{tutor.user.name}</h2>
            <p className="text-sm opacity-90">{tutor.user.email}</p>

            <div className="flex items-center gap-3 mt-3">
              <Badge className="bg-white text-indigo-600 font-semibold">
                {tutor.user.role}
              </Badge>

              <Badge className="bg-green-400 text-black">
                {tutor.user.status}
              </Badge>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1">
              <Star className="fill-yellow-400 text-yellow-400" size={20} />
              <span className="text-lg font-bold">
                {tutor.averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm opacity-90">{tutor.totalReviews} Reviews</p>
          </div>
        </CardContent>
      </Card>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-md rounded-xl">
          <CardContent className="flex items-center gap-4 p-6">
            <BookOpen className="text-indigo-600" />
            <div>
              <p className="text-sm text-muted-foreground">Experience</p>
              <p className="text-lg font-bold">{tutor.experience} Years</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardContent className="flex items-center gap-4 p-6">
            <DollarSign className="text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Hourly Rate</p>
              <p className="text-lg font-bold">${tutor.hourlyRate}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardContent className="flex items-center gap-4 p-6">
            <Clock className="text-purple-600" />
            <div>
              <p className="text-sm text-muted-foreground">Available Slots</p>
              <p className="text-lg font-bold">{upcomingSlots.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= BIO & CATEGORIES ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tutor.bio}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {tutor.categories.map((cat: any) => (
              <Badge key={cat.id} className="bg-indigo-100 text-indigo-700">
                {cat.categoryName}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ================= REVIEWS ================= */}
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-72 overflow-y-auto">
          {tutor.reviews.map((review: any) => (
            <div key={review.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(review.createdAt), "PPP")}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ================= AVAILABILITY ================= */}
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tutor.availability.map((slot: any) => (
            <div
              key={slot.id}
              className={`flex justify-between items-center p-3 rounded-lg border ${
                slot.isBooked
                  ? "bg-red-50 border-red-200"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div>
                <p className="text-sm font-medium">
                  {format(new Date(slot.startTime), "PPP p")} -{" "}
                  {format(new Date(slot.endTime), "p")}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${slot.totalPrice}
                </p>
              </div>

              <Badge className={slot.isBooked ? "bg-red-500" : "bg-green-500"}>
                {slot.isBooked ? "Booked" : "Available"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
