"use server";

import authService from "@/services/auth/auth.service";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (email: string, password: string) => {
  const data = await authService.login(email, password);
  return data;
};

export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;
  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode(token);
  }
  return decodedData;
};

export const logoutUser = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
