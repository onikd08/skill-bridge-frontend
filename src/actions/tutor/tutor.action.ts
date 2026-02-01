"use server";

import { TutorProfile } from "@/components/modules/tutor/TutorProfileForm";
import tutorService from "@/services/tutor/tutor.service";
import { updateTag } from "next/cache";

export const createTutorProfile = async (tutor: TutorProfile) => {
  const data = await tutorService.createTutorProfile(tutor);
  updateTag("tutor-profile");
  return data;
};
