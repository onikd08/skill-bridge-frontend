import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const AUTH_URL = env.AUTH_URL;

const updateUserRole = async (userId: string, role: string) => {
  try {
    const res = await fetch(`${API_URL}/user/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, role }),
    });
    const data = await res.json();
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Role update failed",
      },
    };
  }
};

const getUserSession = async () => {
  try {
    const cookieStorage = await cookies();
    const response = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStorage.toString(),
      },
      cache: "no-cache",
    });
    const session = await response.json();
    if (!session) {
      return {
        data: null,
        message: "Seesion not found",
      };
    }
    return {
      data: session,
      message: "User seesion fetched successfully",
    };
  } catch (error) {
    return {
      error,
      message: "Something went wrong!",
    };
  }
};

const userService = {
  updateUserRole,
  getUserSession,
};

export default userService;
