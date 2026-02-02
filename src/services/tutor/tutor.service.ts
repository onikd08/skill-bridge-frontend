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

const getTutorAvailability = async () => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor/availability`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["tutor-availability"] },
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

export type Availability = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

const createTutorAvailability = async (payload: Availability) => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify(payload),
      next: { tags: ["tutor-availability"] },
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

const tutorService = {
  getTutorProfile,
  createTutorProfile,
  getTutorAvailability,
  createTutorAvailability,
};

export default tutorService;
