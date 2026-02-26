"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import {
  createTutorAvailability,
  deleteAvailability,
  updateAvailabilityStatus,
} from "@/actions/tutor/tutor.action";

type Availability = {
  id: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  isBooked: boolean;
};

function toISO(date: string, time: string) {
  return new Date(`${date}T${time}`).toISOString();
}

export default function TutorAvailabilityForm({
  availability,
}: {
  availability: Availability[];
}) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async () => {
    if (!date || !startTime || !endTime) {
      toast.error("All fields are required");
      return;
    }

    const startAt = toISO(date, startTime);
    const endAt = toISO(date, endTime);

    if (new Date(startAt) >= new Date(endAt)) {
      toast.error("Start time must be before end time");
      return;
    }

    try {
      const { success, message } = await createTutorAvailability({
        startTime: startAt,
        endTime: endAt,
      });
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);

      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      toast.error("Failed to add availability");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          Set your availability using date & time
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date */}
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Time */}
        <div className="flex gap-3">
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Add Availability
        </Button>

        {/* Existing availability */}
        {availability.length > 0 && (
          <div className="pt-4 space-y-2">
            <h4 className="text-sm font-semibold">Current Availability</h4>

            {availability.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between rounded border p-3 text-sm"
              >
                <div>
                  <div>
                    {new Date(slot.startTime).toLocaleString()} –{" "}
                    {new Date(slot.endTime).toLocaleTimeString()}
                  </div>

                  <span
                    className={
                      slot.isBooked ? "text-green-600" : "text-muted-foreground"
                    }
                  >
                    {slot.isBooked ? "Booked" : "Available"}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={async () => {
                    try {
                      const { success, message } = await deleteAvailability(
                        slot.id,
                      );
                      if (!success) {
                        toast.error(message);
                        return;
                      }
                      toast.success(message);
                    } catch {
                      toast.error("Failed to delete availability");
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter />
    </Card>
  );
}
