import { env } from "@/env";
import { cookies } from "next/headers";

const API_URl = env.API_URL;
const login = async (email: string, password: string) => {
  const cookieStorage = await cookies();

  try {
    const res = await fetch(`${API_URl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    const storeCookie = await cookies();
    if (result.success) {
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Login failed",
      },
    };
  }
};

const authService = { login };

export default authService;
