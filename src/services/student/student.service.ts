import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const bookSlot = async (payload: {
  studentId: string;
  availabilityId: string;
}) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(
      `${API_URL}/bookings/availability/${payload.availabilityId}`,
      {
        next: { tags: ["bookings"] },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      },
    );
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
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      next: { tags: ["bookings"] },
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
  imageUrl?: string | null;
  name: string;
}) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
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

const getMyInfo = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
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

const createReview = async (payload: {
  rating: number;
  comment?: string;
  bookingId: string;
}) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/bookings/${payload.bookingId}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },

      body: JSON.stringify({
        rating: payload.rating,
        comment: payload.comment,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.message || "Failed to create review",
      },
    };
  }
};
const studentService = {
  bookSlot,
  cancelBooking,
  updateStudentInfo,
  getMyInfo,
  createReview,
};

export default studentService;
