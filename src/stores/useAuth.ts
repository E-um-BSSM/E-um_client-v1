import { create } from "zustand";
import type { authTokens } from "@/models";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const AUTH_USER_KEY = "auth_user";

/**
 * MVP 로그인 응답(authTokens)은 유저 정보를 포함하지 않는다.
 * 따라서 화면 표시에 필요한 최소 정보(username)만 클라이언트에서 보관한다.
 */
interface AuthUser {
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  remember: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  setAuthFromSignIn: (tokens: authTokens, user: AuthUser, keepSignedIn: boolean) => void;
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
    if (!parsed.username) return null;
    return { username: parsed.username };
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

export const getStoredRefreshToken = (): string | null => {
  const { refreshToken } = getStoredAuth();
  return refreshToken;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  remember: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  setAuthFromSignIn: (tokens: authTokens, user: AuthUser, keepSignedIn: boolean) => {
    const authUser: AuthUser = { username: user.username };

    if (isBrowser) {
      const targetStorage = keepSignedIn ? localStorage : sessionStorage;
      const resetStorage = keepSignedIn ? sessionStorage : localStorage;

      resetStorage.removeItem(ACCESS_TOKEN_KEY);
      resetStorage.removeItem(REFRESH_TOKEN_KEY);
      resetStorage.removeItem(AUTH_USER_KEY);

      targetStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
      targetStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
      targetStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
    }

    set({
      isAuthenticated: true,
      remember: keepSignedIn,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      user: authUser,
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

/**
 * Refresh 응답의 토큰을 기존 로그인 유지 방식(local/session storage)에 맞춰 교체한다.
 */
export const updateStoredAuthTokens = (tokens: authTokens) => {
  const stored = getStoredAuth();
  if (!stored.user) {
    useAuthStore.getState().clearAuth();
    return;
  }

  if (isBrowser) {
    const storage = stored.remember ? localStorage : sessionStorage;
    storage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    storage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  }

  useAuthStore.setState({
    isAuthenticated: true,
    remember: stored.remember,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    user: stored.user,
  });
};
