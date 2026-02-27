import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getAllCategories = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { tags: ["categories"], revalidate: 60 },
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

const deleteCategory = async (categoryId: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "DELETE",
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
        message: "Could not delete category",
      },
    };
  }
};

const createCategory = async (categoryName: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  try {
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify({ categoryName }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Could not create category",
      },
    };
  }
};

const updateCategory = async (id: string, categoryName: string) => {
  const cookieStorage = await cookies();
  const cookieStore = cookieStorage.get("token")?.value;

  try {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookieStore!,
      },
      body: JSON.stringify({ categoryName }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Could not update category",
      },
    };
  }
};

const categoryService = {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
};

export default categoryService;
