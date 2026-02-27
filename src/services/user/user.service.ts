import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getAllUsers = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;

  try {
    const res = await fetch(`${API_URL}/users/all-users`, {
      next: { tags: ["users"] },
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });
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

const updateIsFeatured = async (userId: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/tutors/featured/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });
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

const updateUserStatus = async (userId: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/users/status/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });
    const data = await res.json();
    console.log(data);
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
const userService = {
  getAllUsers,
  updateIsFeatured,
  updateUserStatus,
};

export default userService;
