const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Add /api to the base URL
export const API_BASE = `${API_URL}/api`;

// Default fetch options for CORS
const defaultOptions = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

export { mockSendChatMessage as sendChatMessage } from "./mockChat";

export async function register(username: string, password: string) {
  const response = await fetch(`${API_BASE}/register`, {
    ...defaultOptions,
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_BASE}/login`, {
    ...defaultOptions,
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}
