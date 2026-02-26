"use server";

import authService from "@/services/auth/auth.service";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (email: string, password: string) => {
  const result = await authService.login(email, password);
  const cookieStorage = await cookies();
  cookieStorage.set("token", result?.data?.token);
  return result;
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

export const registerUser = async (payload: any) => {
  const result = await authService.registerUser(payload);
  return result;
};
