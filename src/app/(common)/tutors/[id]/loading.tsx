import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingTutorProfile() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* 1. Tutor Profile Card Skeleton */}
      <Card className="w-full max-w-3xl mx-auto rounded-3xl shadow-sm border-border/50 mt-10 sm:mt-15">
        <CardHeader className="flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6">
          {/* Avatar Skeleton */}
          <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-full mx-auto sm:mx-0" />

          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Skeleton className="h-8 w-48 mx-auto sm:mx-0" />
              <Skeleton className="h-6 w-24 mx-auto sm:mx-0 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32 mx-auto sm:mx-0" />
            <Skeleton className="h-8 w-40 mx-auto sm:mx-0 rounded-full" />
          </div>

          <div className="w-full sm:w-auto flex flex-col items-center sm:items-end gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
          <div className="flex gap-2 justify-center sm:justify-start">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* 2. Tutor Booking Card Skeleton */}
      <Card className="w-full max-w-3xl mx-auto border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="p-4 md:p-6 bg-muted/30 space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>

        <CardContent className="p-4 md:p-6 space-y-4">
          {/* Creating 3 placeholder slots */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full rounded-xl border p-4 flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="flex gap-4 w-full">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="flex justify-between md:justify-end gap-6 w-full">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
