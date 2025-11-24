import axios from "axios";

export const req = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
});

req.interceptors.request.use((config) => {
  if (config.data && !(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});