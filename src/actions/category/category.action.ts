"use server";

import categoryService from "@/services/category/category.service";
import { updateTag } from "next/cache";

export const getAllCategories = async () => {
  const data = await categoryService.getAllCategories();
  return data;
};

export const deleteCategory = async (id: string) => {
  const data = await categoryService.deleteCategory(id);

  updateTag("categories");
  return data;
};

export const createCategory = async (categoryName: string) => {
  const data = await categoryService.createCategory(categoryName);

  updateTag("categories");
  return data;
};

export const updateCategory = async (id: string, name: string) => {
  const data = await categoryService.updateCategory(id, name);

  updateTag("categories");
  return data;
};
