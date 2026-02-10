"use server";

import studentService from "@/services/student/student.service";

export const bookSlot = async (payload: {
  tutorProfileId: string;
  startTime: string;
  endTime: string;
}) => {
  const data = await studentService.bookSlot(payload);
  return data;
};
