"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cancelBooking } from "@/actions/student/student.action";
import { formatDate, formatTime } from "@/lib/utils";

type Booking = {
  id: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
  tutorProfile: {
    subject: string;
    hourlyRate: string;
    user: {
      name: string;
      image: string | null;
    };
  };
};

export default function MyBookingsList({ bookings }: { bookings: Booking[] }) {
  const [selected, setSelected] = useState<Booking | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    if (!selected) return;

    startTransition(async () => {
      try {
        const data = await cancelBooking(selected.id);
        console.log(selected.id);
        if (!data) {
          toast.error("Failed to cancel booking");
          setSelected(null);
          return;
        }
        toast.success("Booking cancelled");
        setSelected(null);
      } catch (err: any) {
        toast.error(err.message || "Failed to cancel booking");
      }
    });
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const tutor = booking.tutorProfile.user;

        return (
          <Card key={booking.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={tutor.image ?? undefined} />
                <AvatarFallback>{tutor.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <CardTitle className="text-base">{tutor.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {booking.tutorProfile.subject}
                </p>
              </div>

              <Badge
                variant={
                  booking.status === "CANCELLED"
                    ? "destructive"
                    : booking.status === "COMPLETED"
                      ? "secondary"
                      : "default"
                }
              >
                {booking.status}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p>📅 {formatDate(booking.startTime)}</p>
              <p>
                ⏰ {formatTime(booking.startTime)} –{" "}
                {formatTime(booking.endTime)}
              </p>
              <p>💰 ${booking.tutorProfile.hourlyRate}/hour</p>

              {booking.status === "CONFIRMED" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setSelected(booking)}
                >
                  Cancel booking
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Cancel confirmation dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel booking?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The tutor will be notified.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelected(null)}>
              Keep booking
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleCancel}
            >
              {isPending ? "Cancelling..." : "Cancel booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
