import { env } from "@/env";

const API_URl = env.API_URL;
const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_URl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
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

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
  imageUrl?: string;
}) => {
  try {
    const res = await fetch(`${API_URl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Registration failed",
      },
    };
  }
};

const authService = { login, registerUser };

export default authService;
