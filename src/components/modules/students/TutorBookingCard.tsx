"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { bookSlot } from "@/actions/student/student.action";
import { formatDate, formatTime } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Availability = {
  id: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  isBooked: boolean;
  tutorId: string;
};

export default function TutorBookingCard({
  tutorName,
  availability,
  userData,
}: {
  tutorName: string;
  availability: Availability[];
  userData: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    image: string | null;
  };
}) {
  const [selected, setSelected] = useState<Availability | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleBooking = () => {
    if (!userData) {
      router.push("/login");
      toast.error("Please login to book a slot");
      return;
    }
    if (!selected) return;

    startTransition(async () => {
      try {
        const { success, message } = await bookSlot({
          studentId: userData.id,
          availabilityId: selected.id,
        });

        if (!success) {
          toast.error(message || "Failed to book slot");
          setSelected(null);
          return;
        }
        toast.success(message);
        setSelected(null);
      } catch (err) {
        toast.error("Failed to book slot");
      }
    });
  };

  return (
    <Card className="max-w-3xl mx-auto mt-5">
      <CardHeader>
        <CardTitle>{tutorName}</CardTitle>
        <CardDescription>Available time slots</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {availability?.length === 0 && (
          <p className="text-sm text-muted-foreground">No available slots</p>
        )}

        {availability?.map((slot) => (
          <button
            disabled={slot.isBooked}
            key={slot.id}
            onClick={() => setSelected(slot)}
            className="w-full rounded-lg border p-3 text-left transition hover:bg-muted"
          >
            <div className="flex justify-between text-sm">
              <span className="font-medium">{formatDate(slot.startTime)}</span>
              <span
                className={
                  slot.isBooked ? "text-muted-foreground" : "text-green-400"
                }
              >
                {slot.isBooked ? "Already Booked" : "Available"}
              </span>
              <span>${slot.totalPrice}</span>
              <span>
                {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
              </span>
            </div>
          </button>
        ))}
      </CardContent>

      {/* Booking confirmation dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Book a session with <b>{tutorName}</b> on
              <br />
              <span className="font-medium">
                {selected &&
                  `${formatDate(selected.startTime)} • ${formatTime(
                    selected.startTime,
                  )} – ${formatTime(selected.endTime)}`}
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleBooking}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CardFooter />
    </Card>
  );
}
