import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const bookSlot = async (payload: {
  tutorProfileId: string;
  startTime: string;
  endTime: string;
}) => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/bookings/${payload.tutorProfileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify({
        startTime: payload.startTime,
        endTime: payload.endTime,
      }),
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

const getMyBookings = async () => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["bookings"] },
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

const cancelBooking = async (bookingId: string) => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify({ bookingId }),
    });
    if (!res.ok) {
      return {
        data: null,
        error: {
          message: "Something went wrong",
        },
      };
    }
    const data = await res.json();
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Profile not found",
      },
    };
  }
};

const getStudentInfo = async () => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/student/profile`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["student-profile"] },
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

const updateStudentInfo = async (payload: {
  image?: string | null;
  name?: string;
}) => {
  const cookieStorage = await cookies();
  try {
    const res = await fetch(`${API_URL}/student/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["student-profile"] },
      body: JSON.stringify(payload),
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
const studentService = {
  bookSlot,
  cancelBooking,
  getMyBookings,
  getStudentInfo,
  updateStudentInfo,
};

export default studentService;
