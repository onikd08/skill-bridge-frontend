"use server";

import studentService from "@/services/student/student.service";
import { updateTag } from "next/cache";

export const bookSlot = async (payload: {
  tutorProfileId: string;
  startTime: string;
  endTime: string;
}) => {
  const data = await studentService.bookSlot(payload);
  return data;
};

export const getMyBookings = async () => {
  const data = await studentService.getMyBookings();
  return data;
};

export const cancelBooking = async (bookingId: string) => {
  const data = await studentService.cancelBooking(bookingId);
  updateTag("bookings");
  return data;
};
