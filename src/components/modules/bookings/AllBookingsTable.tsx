"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Star } from "lucide-react";

interface Booking {
  id: string;
  notes: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  review: {
    rating: number;
    comment: string;
  } | null;
  availability: {
    startTime: string;
    endTime: string;
    totalPrice: number;
  };
  student: {
    name: string;
    email: string;
    status: string;
  };
  tutor: {
    bio: string;
    experience: number;
    hourlyRate: number;
    isFeatured: boolean;
    user: {
      name: string;
      email: string;
      status: string;
    };
  };
}

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  COMPLETED:
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

const AllBookingsTable = ({ bookings }: { bookings: Booking[] }) => {
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + b.availability.totalPrice,
    0,
  );

  const completedCount = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  return (
    <div className="space-y-8">
      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-sm hover:shadow-md transition rounded-2xl">
          <CardContent className="p-5 sm:p-6 flex flex-col justify-between h-full">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 wrap-break-word">
              {bookings.length}
            </h2>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-sm hover:shadow-md transition rounded-2xl">
          <CardContent className="p-5 sm:p-6 flex flex-col justify-between h-full">
            <p className="text-sm text-muted-foreground">Completed</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 wrap-break-word">
              {completedCount}
            </h2>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-sm hover:shadow-md transition rounded-2xl">
          <CardContent className="p-5 sm:p-6 flex flex-col justify-between h-full">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 wrap-break-word">
              ${totalRevenue.toFixed(2)}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* ================= TABLE ================= */}
      <Card className="bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-md rounded-xl">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booked On</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    className="hover:bg-muted/40 transition"
                  >
                    {/* Student */}
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.student.email}
                        </p>
                      </div>
                    </TableCell>

                    {/* Tutor */}
                    <TableCell>
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {booking.tutor.user.name}
                          {booking.tutor.isFeatured && (
                            <Badge className="bg-purple-500/20 text-purple-500 text-xs">
                              Featured
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.tutor.experience} yrs exp
                        </p>
                      </div>
                    </TableCell>

                    {/* Schedule */}
                    <TableCell>
                      <p className="text-sm">
                        {format(
                          new Date(booking.availability.startTime),
                          "PPP p",
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        -{format(new Date(booking.availability.endTime), "p")}
                      </p>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="font-semibold">
                      ${booking.availability.totalPrice}
                    </TableCell>

                    {/* Review */}
                    <TableCell>
                      {booking.review ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star size={14} fill="currentColor" />
                            <span className="text-sm font-medium">
                              {booking.review.rating}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[150px]">
                            {booking.review.comment}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No review
                        </span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        className={`font-medium ${statusStyles[booking.status]}`}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>

                    {/* Created */}
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(booking.createdAt), "PPP")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllBookingsTable;
