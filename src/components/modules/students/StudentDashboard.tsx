"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CalendarDays, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

type StudentDashboardProps = {
  student: any;
};

export default function StudentDashboard({ student }: StudentDashboardProps) {
  const completedBookings = student.bookings.filter(
    (b: any) => b.status === "COMPLETED",
  );

  const confirmedBookings = student.bookings.filter(
    (b: any) => b.status === "CONFIRMED",
  );

  return (
    <div className="p-6 space-y-8">
      {/* ================= HEADER ================= */}
      <Card className="bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-xl rounded-2xl">
        <CardContent className="flex justify-between items-center p-6">
          <div className="flex items-center gap-4">
            {student.imageUrl && (
              <Image
                src={student.imageUrl}
                alt={student.name}
                width={70}
                height={70}
                className="rounded-full border-4 border-white object-cover"
              />
            )}

            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-sm opacity-90">{student.email}</p>

              <div className="flex gap-2 mt-2">
                <Badge className="bg-white text-blue-600 font-semibold">
                  {student.role}
                </Badge>

                <Badge className="bg-green-400 text-black">
                  {student.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <CalendarDays className="text-indigo-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-lg font-bold">{student.bookings.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <CheckCircle className="text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-lg font-bold">{completedBookings.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <Star className="text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Reviews Given</p>
              <p className="text-lg font-bold">{student.reviews.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= BOOKINGS ================= */}
      <Card className="rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>Your Bookings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 max-h-80 overflow-y-auto">
          {student.bookings.map((booking: any) => (
            <div
              key={booking.id}
              className={`p-4 rounded-lg border flex justify-between items-center ${
                booking.status === "COMPLETED"
                  ? "bg-green-50 border-green-200"
                  : booking.status === "CONFIRMED"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50"
              }`}
            >
              <div>
                <p className="text-sm font-medium">
                  Booking ID: {booking.id.slice(0, 8)}...
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(booking.createdAt), "PPP")}
                </p>
              </div>

              <Badge
                className={
                  booking.status === "COMPLETED"
                    ? "bg-green-500"
                    : "bg-blue-500"
                }
              >
                {booking.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ================= REVIEWS ================= */}
      <Card className="rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>Your Reviews</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 max-h-72 overflow-y-auto">
          {student.reviews.map((review: any) => (
            <div key={review.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex gap-1">
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
    </div>
  );
}
