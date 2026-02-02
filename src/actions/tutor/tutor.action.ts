"use server";

import { TutorProfile } from "@/components/modules/tutor/TutorProfileForm";
import tutorService, { Availability } from "@/services/tutor/tutor.service";
import { updateTag } from "next/cache";

export const createTutorProfile = async (tutor: TutorProfile) => {
  const data = await tutorService.createTutorProfile(tutor);
  updateTag("tutor-profile");
  return data;
};

export const createTutorAvailability = async (payload: Availability) => {
  const data = await tutorService.createTutorAvailability(payload);
  updateTag("tutor-availability");
  return data;
};
