import { env } from "@/env";

const API_URL = env.API_URL;
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

const userService = {
  updateUserRole,
};

export default userService;
