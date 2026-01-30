"use server";
import userService from "@/services/user/user.service";

export const updateUserRole = async (userId: string, role: string) => {
  const data = await userService.updateUserRole(userId, role);
  return data;
};
