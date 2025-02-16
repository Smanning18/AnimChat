const API_BASE_URL = "https://dazzling-nash7-rabh7.dev-2.tempolabs.ai/api";

// Ensure we're using the full URL for all API calls
const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  chat: `${API_BASE_URL}/chat`,
  clearChat: `${API_BASE_URL}/chat/clear`,
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Request failed with status ${response.status}`,
    );
  }
  return response.json();
};

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

export async function sendChatMessage(
  message: string,
  characterId: string,
  temperature?: number,
) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(API_ENDPOINTS.chat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({
      userMessage: message,
      characterId,
      temperature,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send message");
  }

  return data;
}

export async function register(username: string, password: string) {
  const response = await fetch(API_ENDPOINTS.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  localStorage.setItem("token", data.token);
  return data;
}

export async function login(
  username: string,
  password: string,
  retryCount = 0,
) {
  const MAX_RETRIES = 2;
  const RETRY_DELAY = 1000; // 1 second

  try {
    const response = await fetch(API_ENDPOINTS.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || `Login failed with status ${response.status}`,
      );
    }

    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      if (retryCount < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return login(username, password, retryCount + 1);
      }
      throw new Error("Server appears to be offline. Please try again later.");
    }
    throw error;
  }
}
