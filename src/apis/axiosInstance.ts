import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { authTokens } from "@/models";
import { getStoredAccessToken, getStoredRefreshToken, updateStoredAuthTokens, useAuthStore } from "@/stores";

export const req = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<authTokens> | null = null;

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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

req.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry || isRefreshRequest) {
      return Promise.reject(error);
    }

    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      useAuthStore.getState().clearAuth();
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    refreshPromise ??= refreshClient
      .post<authTokens>("/auth/refresh", { refresh_token: refreshToken })
      .then(response => {
        updateStoredAuthTokens(response.data);
        return response.data;
      })
      .catch(refreshError => {
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/auth/")) {
          window.location.assign("/auth/login");
        }
        throw refreshError;
      })
      .finally(() => {
        refreshPromise = null;
      });

    try {
      const tokens = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
      return req(originalRequest);
    } catch {
      return Promise.reject(error);
    }
  },
);
