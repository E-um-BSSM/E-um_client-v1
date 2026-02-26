import { create } from "zustand";
import type { signInResponse } from "@/models";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const AUTH_USER_KEY = "auth_user";

interface AuthUser {
  username: string;
  system_role: string;
  equipped_badge: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  remember: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  setAuthFromSignIn: (payload: signInResponse, remember: boolean) => void;
  hydrateAuth: () => void;
  clearAuth: () => void;
}

const isBrowser = typeof window !== "undefined";

const clearStorage = () => {
  if (!isBrowser) return;

  [localStorage, sessionStorage].forEach(storage => {
    storage.removeItem(ACCESS_TOKEN_KEY);
    storage.removeItem(REFRESH_TOKEN_KEY);
    storage.removeItem(AUTH_USER_KEY);
  });
};

const parseAuthUser = (raw: string | null): AuthUser | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed.username || !parsed.system_role) return null;
    return parsed;
  } catch {
    return null;
  }
};

const getStoredAuth = () => {
  if (!isBrowser) {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      remember: false,
    };
  }

  const localAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const localRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const localUser = parseAuthUser(localStorage.getItem(AUTH_USER_KEY));
  if (localAccessToken && localRefreshToken && localUser) {
    return {
      user: localUser,
      accessToken: localAccessToken,
      refreshToken: localRefreshToken,
      remember: true,
    };
  }

  const sessionAccessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const sessionRefreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
  const sessionUser = parseAuthUser(sessionStorage.getItem(AUTH_USER_KEY));
  if (sessionAccessToken && sessionRefreshToken && sessionUser) {
    return {
      user: sessionUser,
      accessToken: sessionAccessToken,
      refreshToken: sessionRefreshToken,
      remember: false,
    };
  }

  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    remember: false,
  };
};

export const getStoredAccessToken = (): string | null => {
  const { accessToken } = getStoredAuth();
  return accessToken;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  remember: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  setAuthFromSignIn: (payload: signInResponse, remember: boolean) => {
    const user: AuthUser = {
      username: payload.username,
      system_role: payload.system_role,
      equipped_badge: payload.equipped_badge ?? null,
    };

    if (isBrowser) {
      const targetStorage = remember ? localStorage : sessionStorage;
      const resetStorage = remember ? sessionStorage : localStorage;

      resetStorage.removeItem(ACCESS_TOKEN_KEY);
      resetStorage.removeItem(REFRESH_TOKEN_KEY);
      resetStorage.removeItem(AUTH_USER_KEY);

      targetStorage.setItem(ACCESS_TOKEN_KEY, payload.access_token);
      targetStorage.setItem(REFRESH_TOKEN_KEY, payload.refresh_token);
      targetStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }

    set({
      isAuthenticated: true,
      remember,
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      user,
    });
  },
  hydrateAuth: () => {
    const stored = getStoredAuth();
    set({
      isAuthenticated: Boolean(stored.accessToken && stored.refreshToken && stored.user),
      remember: stored.remember,
      accessToken: stored.accessToken,
      refreshToken: stored.refreshToken,
      user: stored.user,
    });
  },
  clearAuth: () => {
    clearStorage();
    set({
      isAuthenticated: false,
      remember: false,
      accessToken: null,
      refreshToken: null,
      user: null,
    });
  },
}));
