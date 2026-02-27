import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const updateUserRole = async (userId: string, role: string) => {
  const cookieStorage = await cookies();

  try {
    const res = await fetch(`${API_URL}/user/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
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

const deleteUser = async (userId: string) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Could not delete user",
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
const userService = {
  updateUserRole,
  getAllUsers,
  deleteUser,
  updateIsFeatured,
};

export default userService;
