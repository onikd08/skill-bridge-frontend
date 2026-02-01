import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getAllCategories = async () => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API_URL}/category`, {
      next: { tags: ["categories"] },
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
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
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
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

const createCategory = async (name: string) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ name }),
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

const updateCategory = async (id: string, name: string) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ name }),
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
