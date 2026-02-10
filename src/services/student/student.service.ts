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

const studentService = {
  bookSlot,
};

export default studentService;
