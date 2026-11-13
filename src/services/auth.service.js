import { getAuthToken } from "@/utils/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMe = async () => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};
