"use server";

import { env } from "@/env";

export const chatWithAi = async (message: string, history: any[]) => {
  try {
    const res = await fetch(`${env.API_URL}/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to communicate with AI",
    };
  }
};
