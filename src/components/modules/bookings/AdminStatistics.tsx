"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { format } from "date-fns";

interface Booking {
  id: string;
  status: string;
  createdAt: string;
  review: { rating: number } | null;
  availability: {
    totalPrice: number;
  };
}

export default function AdminStatistics({ bookings }: { bookings: Booking[] }) {
  /* ===================== CALCULATIONS ===================== */

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + b.availability.totalPrice,
    0,
  );

  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;

  const totalReviews = bookings.filter((b) => b.review !== null).length;

  const avgRating =
    bookings
      .filter((b) => b.review)
      .reduce((sum, b) => sum + (b.review?.rating || 0), 0) /
    (totalReviews || 1);

  /* ===================== STATUS DATA ===================== */

  const statusData = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => {
      map[b.status] = (map[b.status] || 0) + 1;
    });

    return Object.entries(map).map(([status, count]) => ({
      status,
      count,
    }));
  }, [bookings]);

  /* ===================== REVENUE PER DAY ===================== */

  const revenueData = useMemo(() => {
    const map: Record<string, number> = {};

    bookings.forEach((b) => {
      const date = format(new Date(b.createdAt), "MMM dd");
      map[date] = (map[date] || 0) + b.availability.totalPrice;
    });

    return Object.entries(map).map(([date, revenue]) => ({
      date,
      revenue,
    }));
  }, [bookings]);

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* ===================== STAT CARDS ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Bookings" value={bookings.length} />
        <StatCard title="Completed" value={completed} />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
        <StatCard title="Avg Rating" value={avgRating.toFixed(1)} />
      </div>

      {/* ===================== CHARTS ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Chart */}
        <Card className="bg-white dark:bg-gray-900 border dark:border-gray-800">
          <CardHeader>
            <CardTitle>Bookings by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-white dark:bg-gray-900 border dark:border-gray-800">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ===================== STAT CARD COMPONENT ===================== */

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <Card className="bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-sm hover:shadow-md transition rounded-xl">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </CardContent>
    </Card>
  );
}
