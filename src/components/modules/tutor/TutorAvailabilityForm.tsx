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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { createTutorAvailability } from "@/actions/tutor/tutor.action";

type Availability = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

const DAYS = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export default function TutorAvailabilityForm({
  availability,
}: {
  availability: Availability[];
}) {
  const [dayOfWeek, setDayOfWeek] = useState<number | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async () => {
    if (dayOfWeek === null || !startTime || !endTime) {
      toast.error("All fields are required");
      return;
    }

    if (startTime >= endTime) {
      toast.error("Start time must be before end time");
      return;
    }

    try {
      const data = await createTutorAvailability({
        dayOfWeek,
        startTime,
        endTime,
      });

      console.log(data);
      toast.success("Availability added");
      setStartTime("");
      setEndTime("");
    } catch {
      toast.error("Failed to add availability");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          Set your weekly availability for bookings
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Day of week */}
        <Select onValueChange={(v) => setDayOfWeek(Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            {DAYS.map((day) => (
              <SelectItem key={day.value} value={day.value.toString()}>
                {day.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Time inputs */}
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
                className="flex justify-between rounded border p-2 text-sm"
              >
                <span>
                  {DAYS.find((d) => d.value === slot.dayOfWeek)?.label} •{" "}
                  {slot.startTime} – {slot.endTime}
                </span>

                <span
                  className={
                    slot.isActive ? "text-green-600" : "text-muted-foreground"
                  }
                >
                  {slot.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter />
    </Card>
  );
}
