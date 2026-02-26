"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Booking } from "./BookingList";
import { createReview } from "@/actions/student/student.action";
import { useRouter } from "next/navigation";

export default function ReviewSection({ booking }: { booking: Booking }) {
  const review = booking.review;
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    const { success, message } = await createReview({
      rating,
      comment,
      bookingId: booking.id,
    });
    if (success) {
      toast.success(message);
      router.refresh();
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="w-full border-t pt-4 space-y-3">
      {review ? (
        <>
          {/* ⭐ Display Existing Review */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={
                  star <= review.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {formatDate(review.createdAt)}
          </p>

          <p className="text-sm">{review.comment}</p>
        </>
      ) : (
        <>
          {/* 📝 Create Review Form */}
          <p className="font-medium">Leave a Review</p>

          {/* ⭐ Star Selector */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={22}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <Textarea
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button size="sm" onClick={handleSubmit}>
            Submit Review
          </Button>
        </>
      )}
    </div>
  );
}
