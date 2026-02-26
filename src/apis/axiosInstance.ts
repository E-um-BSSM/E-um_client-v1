import axios from "axios";
import { getStoredAccessToken } from "@/stores";

export const req = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

req.interceptors.request.use(config => {
  if (config.data && !(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  const accessToken = getStoredAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
