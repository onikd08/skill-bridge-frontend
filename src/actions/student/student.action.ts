"use server";

import studentService from "@/services/student/student.service";
import { updateTag } from "next/cache";

export const bookSlot = async (payload: {
  studentId: string;
  availabilityId: string;
}) => {
  const data = await studentService.bookSlot(payload);
  updateTag("bookings");
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

export const getStudentInfo = async () => {
  const data = await studentService.getStudentInfo();
  return data;
};

export const updateStudentInfo = async (payload: {
  image?: string | null;
  name?: string;
}) => {
  const data = await studentService.updateStudentInfo(payload);
  updateTag("student-profile");
  return data;
};
