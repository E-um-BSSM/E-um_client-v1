import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores";

/** 인증 상태를 복원한 뒤, 미인증 사용자의 보호된 경로 접근을 차단한다. */
export default function RequireAuth() {
  const isHydrated = useAuthStore(state => state.isHydrated);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();

  if (!isHydrated) return null;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
