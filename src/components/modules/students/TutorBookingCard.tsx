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

// ---------------- Types ----------------
type Availability = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Replace with your real action
async function bookSlot(availabilityId: string) {
  await new Promise((r) => setTimeout(r, 800));
}

export default function TutorBookingCard({
  tutorName,
  availability,
}: {
  tutorName: string;
  availability: Availability[];
}) {
  const [selected, setSelected] = useState<Availability | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleBooking = () => {
    if (!selected) return;

    startTransition(async () => {
      try {
        await bookSlot(selected.id);
        toast.success("Booking confirmed");
        setSelected(null);
      } catch {
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
              <span className="font-medium">{DAYS[slot.dayOfWeek]}</span>
              <span>
                {slot.startTime} – {slot.endTime}
              </span>
            </div>
          </button>
        ))}
      </CardContent>

      <CardFooter />

      {/* Booking confirmation dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Book a session with <b>{tutorName}</b> on
              <br />
              <span className="font-medium">
                {selected && DAYS[selected.dayOfWeek]} • {selected?.startTime} –{" "}
                {selected?.endTime}
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
    </Card>
  );
}
