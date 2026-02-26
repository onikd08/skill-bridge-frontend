"use server";
import userService from "@/services/user/user.service";
import { updateTag } from "next/cache";

export const updateUserRole = async (userId: string, role: string) => {
  const data = await userService.updateUserRole(userId, role);
  return data;
};

export const getAllUsers = async () => {
  const data = await userService.getAllUsers();
  return data;
};

export const deleteUser = async (userId: string) => {
  const data = await userService.deleteUser(userId);
  updateTag("users");
  return data;
};
