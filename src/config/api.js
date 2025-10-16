import authService from "../services/authService";

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://pets-v2.dev-apis.com",
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

export const authenticatedFetch = async (url, options = {}) => {
  try {
    const token = await authService.getToken();
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("Error in authenticated fetch:", error);
    throw error;
  }
};
