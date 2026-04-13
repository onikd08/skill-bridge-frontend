"use client";
import { CheckCircle2 } from "lucide-react";
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
import { formatDate, formatTime, cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, DollarSign } from "lucide-react";

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
    <Card className="w-full max-w-3xl mx-auto mt-6 md:mt-10 border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="p-4 md:p-6 bg-muted/30">
        <CardTitle className="text-xl md:text-2xl">{tutorName}</CardTitle>
        <CardDescription>
          Select an available time slot to book your session
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 md:p-6 space-y-3">
        {availability?.length === 0 && (
          <div className="text-center py-10">
            <CalendarDays className="mx-auto h-10 w-10 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              No available slots at this time
            </p>
          </div>
        )}

        {availability?.map((slot) => (
          <button
            disabled={slot.isBooked}
            key={slot.id}
            onClick={() => setSelected(slot)}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-all relative group",
              slot.isBooked
                ? "opacity-60 cursor-not-allowed bg-muted/20"
                : "hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98]",
            )}
          >
            {/* Grid Layout for Slots */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              {/* Date & Icon */}
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary shrink-0" />
                <span className="font-semibold text-sm truncate">
                  {formatDate(slot.startTime)}
                </span>
              </div>

              {/* Time Range */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm">
                  {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-1 md:justify-center">
                <DollarSign className="h-4 w-4 text-green-600 shrink-0" />
                <span className="font-bold text-sm">
                  {slot.totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex md:justify-end">
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full",
                    slot.isBooked
                      ? "bg-muted text-muted-foreground"
                      : "bg-green-500/10 text-green-600 dark:text-green-400",
                  )}
                >
                  {slot.isBooked ? "Booked" : "Available"}
                </span>
              </div>
            </div>
          </button>
        ))}
      </CardContent>

      {/* Confirmation Dialog - Optimized for Mobile */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-2xl">
          <DialogHeader className="text-left">
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Confirm Booking
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-3">
              <p>
                You are booking a session with{" "}
                <span className="font-bold text-foreground">{tutorName}</span>.
              </p>

              <div className="p-4 rounded-xl bg-muted/50 border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {selected && formatDate(selected.startTime)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">
                    {selected &&
                      `${formatTime(selected.startTime)} - ${formatTime(selected.endTime)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2 mt-2">
                  <span className="text-muted-foreground font-bold text-foreground">
                    Total:
                  </span>
                  <span className="font-bold text-primary text-lg">
                    ${selected?.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 mt-4">
            <Button
              variant="ghost"
              className="rounded-xl"
              onClick={() => setSelected(null)}
            >
              Maybe Later
            </Button>
            <Button
              disabled={isPending}
              onClick={handleBooking}
              className="rounded-xl px-8 shadow-lg shadow-primary/20"
            >
              {isPending ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// Added CheckCircle2 import for the dialog icon
