import { API_BASE } from "./api";

export async function testBackendConnection() {
  try {
    const response = await fetch(`${API_BASE}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Backend connection successful:", data);
    return true;
  } catch (error) {
    console.error("Backend connection failed:", error);
    return false;
  }
}
