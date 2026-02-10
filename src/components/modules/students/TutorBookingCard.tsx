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

// ---------------- Types ----------------
type Availability = {
  id: string;
  startAt: string;
  endAt: string;
  isActive: boolean;
};

export default function TutorBookingCard({
  tutorName,
  tutorProfileId,
  availability,
}: {
  tutorName: string;
  tutorProfileId: string;
  availability: Availability[];
}) {
  const [selected, setSelected] = useState<Availability | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleBooking = () => {
    if (!selected) return;

    startTransition(async () => {
      try {
        const { data, error } = await bookSlot({
          tutorProfileId,
          startTime: selected.startAt,
          endTime: selected.endAt,
        });
        if (!data) {
          toast.error(error?.message || "Failed to book slot");
          setSelected(null);
          return;
        }
        toast.success("Booking confirmed");
        setSelected(null);
      } catch (err: any) {
        toast.error(err.message || "Failed to book slot");
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
        {availability.length === 0 && (
          <p className="text-sm text-muted-foreground">No available slots</p>
        )}

        {availability.map((slot) => (
          <button
            key={slot.id}
            onClick={() => setSelected(slot)}
            className="w-full rounded-lg border p-3 text-left transition hover:bg-muted"
          >
            <div className="flex justify-between text-sm">
              <span className="font-medium">{formatDate(slot.startAt)}</span>
              <span>
                {formatTime(slot.startAt)} – {formatTime(slot.endAt)}
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
                  `${formatDate(selected.startAt)} • ${formatTime(
                    selected.startAt,
                  )} – ${formatTime(selected.endAt)}`}
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
