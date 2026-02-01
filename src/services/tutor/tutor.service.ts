import { TutorProfile } from "@/components/modules/tutor/TutorProfileForm";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
const getTutorProfile = async () => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor/profile`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Profile not found",
      },
    };
  }
};

const createTutorProfile = async (tutor: TutorProfile) => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },

      body: JSON.stringify(tutor),
      next: { tags: ["tutor-profile"] },
    });
    return await res.json();
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Profile not found",
      },
    };
  }
};

const tutorService = {
  getTutorProfile,
  createTutorProfile,
};

export default tutorService;
