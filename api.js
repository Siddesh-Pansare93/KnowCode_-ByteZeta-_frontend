import axios from "axios";

// Base URL of your backend
const BASE_URL = "http://192.168.151.250:8000"; // Replace with your backend's URL

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// Example: User registration
export const registerUser = async () => {
  try {
    const response = await api.post("/users/register");
    return response;
  } catch (error) {
    throw error.response|| "An error occurred";
  }
};

// Example: User login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

// Example: Fetch user profile
export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export default api;
