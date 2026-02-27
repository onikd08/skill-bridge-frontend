import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getAllBookings = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      next: { revalidate: 60 },
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

const bookingService = { getAllBookings };
export default bookingService;
