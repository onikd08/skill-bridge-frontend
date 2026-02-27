"use server";
import userService from "@/services/user/user.service";

export const getAllUsers = async () => {
  const data = await userService.getAllUsers();
  return data;
};

export const updateIsFeatured = async (userId: string) => {
  const data = await userService.updateIsFeatured(userId);
  return data;
};

export const updateUserStatus = async (userId: string) => {
  const data = await userService.updateUserStatus(userId);
  return data;
};
