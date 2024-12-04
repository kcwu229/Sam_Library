import axios from "axios";
import Cookies from "js-cookie";

// Create an axios instance for JSON requests
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PROD_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

// Create an axios instance for file uploads
const axiosFileInstance = axios.create({
  baseURL: process.env.REACT_APP_PROD_BACKEND_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Cache-Control": "no-cache",
  },
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken"); // Assuming you store the refresh token as well
    const response = await axiosInstance.post("/auth/refresh-token", {
      refreshToken,
    });
    const newAccessToken = response.data.accessToken;

    // Store the new access token in cookies
    Cookies.set("token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Unable to refresh token:", error);
    // Handle refresh token failure (e.g., redirect to login)
    window.location.href = "/login";
    throw error;
  }
};

// Function to check if the token is expired
const isTokenExpired = (token) => {
  if (!token || typeof token !== "string") {
    console.error("Token is missing or is not a string");
    return true; // Treat invalid token as expired
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      )
    );

    //console.log("Decoded Payload:", jsonPayload); // Consider removing this in production

    // Check expiration
    return jsonPayload.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Treat invalid token as expired
  }
};

// Request interceptor for axiosInstance
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = Cookies.get("token");

    // Check if the token is expired and refresh if needed
    if (token && isTokenExpired(token)) {
      try {
        token = await refreshAccessToken(); // Refresh the token
      } catch (error) {
        // Token refresh failed, handle accordingly (e.g., redirect to login)
        return Promise.reject(error);
      }
    }

    // Set the token in the header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for axiosFileInstance
axiosFileInstance.interceptors.request.use(
  async (config) => {
    let token = Cookies.get("token");

    // Check if the token is expired and refresh if needed
    if (token && isTokenExpired(token)) {
      try {
        token = await refreshAccessToken(); // Refresh the token
      } catch (error) {
        // Token refresh failed, handle accordingly (e.g., redirect to login)
        return Promise.reject(error);
      }
    }

    // Set the token in the header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosFileInstance, axiosInstance };
