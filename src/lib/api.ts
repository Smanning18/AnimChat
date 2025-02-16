const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Add /api to the base URL
const API_BASE = `${API_URL}/api`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

export async function sendChatMessage(message: string, characterId: string) {
  console.log("Sending chat message:", { message, characterId });

  const headers = {
    "Content-Type": "application/json",
    Authorization: getAuthHeader(),
  };
  console.log("Request headers:", headers);

  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        userMessage: message,
        characterId,
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send message");
    }

    try {
      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
}

export async function register(username: string, password: string) {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}
