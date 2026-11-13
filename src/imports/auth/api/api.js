import { getAuthToken, setAuthToken } from "../utils/auth";

const api = () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  const getMe = async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Server error: ${response.status}`);
    }
    return data;
  };

  const createUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }
      setAuthToken(data.token);
      const user = await getMe();
      return { ...data, user };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }
      setAuthToken(data.token);
      const user = await getMe();
      return { ...data, user };
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  return { createUser, getMe, loginUser };
};

export default api;
