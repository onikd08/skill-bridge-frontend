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
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        error: data?.error ?? { message: data?.message ?? res.statusText },
      };
    }
    return { data, error: null };
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

const getAllTutors = async () => {
  try {
    const res = await fetch(`${API_URL}/tutor/profile/all-tutors`);
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Something went wrong",
      },
    };
  }
};

const getTutorWithId = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/tutor/profile/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Something went wrong",
      },
    };
  }
};

export type Availability = {
  startAt: string;
  endAt: string;
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

const updateTutorProfile = async (payload: TutorProfile) => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      console.log("not okay");
      return {
        data: null,
        error: data?.error ?? { message: data?.message ?? res.statusText },
      };
    }
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Profile not found",
      },
    };
  }
};

const deleteAvailability = async (id: string) => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor/availability/${id}`, {
      method: "DELETE",
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

const updateAvailabilityStatus = async (id: string) => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor/availability/${id}`, {
      method: "PUT",
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

const tutorService = {
  getTutorProfile,
  createTutorProfile,
  getTutorAvailability,
  createTutorAvailability,
  getAllTutors,
  getTutorWithId,
  updateTutorProfile,
  deleteAvailability,
  updateAvailabilityStatus,
};

export default tutorService;
