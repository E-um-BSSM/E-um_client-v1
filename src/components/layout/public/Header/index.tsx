import type { PageType } from "@/types/Page";
import {
  Actions,
  AuthButton,
  FallbackUser,
  Frame,
  Indicator,
  Layout,
  LogoutButton,
  Nav,
  NavBar,
  SignoutConfirm,
  SignoutConfirmActions,
  SignoutConfirmButton,
  SignoutConfirmText,
  User,
  UserImg,
  UserInfo,
} from "./style";
import Logo from "@/assets/eum_header_logo.svg";
import { css } from "@emotion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { NAV_ITEMS } from "@/constants/navigation";
import { getStoredRefreshToken, useAuthStore } from "@/stores";
import { authPOST } from "@/apis/user/auth";

interface props {
  type: PageType;
}

function Header({ type }: props) {
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSignoutConfirmOpen, setIsSignoutConfirmOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (type === "public") return;

    const entries = Object.keys(NAV_ITEMS[type]);
    const activeKey = type === "landing" ? hash || "#MAIN" : pathname;
    const activeIndex = entries.indexOf(activeKey);

    const el = navRefs.current[activeIndex];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement!.getBoundingClientRect();

    setIndicatorStyle({
      left: rect.left - parentRect.left,
      width: rect.width,
    });
  }, [hash, pathname, type]);

  const handleSignout = async (allSessions = false) => {
    if (isSigningOut) return;

    try {
      setIsSigningOut(true);
      if (allSessions) {
        await authPOST.signoutAll();
      } else {
        const refreshToken = getStoredRefreshToken();
        if (refreshToken) {
          await authPOST.signout({ refresh_token: refreshToken });
        }
      }
    } finally {
      clearAuth();
      navigate("/auth/login", { replace: true });
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <Frame>
        <Layout>
          <Link to={type === "app" ? "/app" : "/#MAIN"}>
            <img src={Logo} alt="이음 로고" loading="lazy" />
          </Link>
          {type !== "app" ? (
            <Actions>
              <AuthButton
                to="/auth/signup"
                customStyle={css`
                  background-color: var(--white);
                  color: var(--text-primary);
                `}
              >
                회원가입
              </AuthButton>
              <AuthButton
                to="/auth/login"
                customStyle={css`
                  background-color: var(--primary-500);
                  color: var(--white);
                `}
              >
                로그인
              </AuthButton>
            </Actions>
          ) : isAuthenticated && user ? (
            <User>
              <UserImg src="/eum.png" alt="유저 프로필 사진" loading="lazy" />
              <UserInfo>
                <span className="name">{user.username}</span>
              </UserInfo>
              <LogoutButton type="button" onClick={() => setIsSignoutConfirmOpen(true)} disabled={isSigningOut}>
                로그아웃
              </LogoutButton>
              {isSignoutConfirmOpen && (
                <SignoutConfirm role="dialog" aria-label="로그아웃 확인">
                  <SignoutConfirmText>로그아웃 방식을 선택하세요.</SignoutConfirmText>
                  <SignoutConfirmActions>
                    <SignoutConfirmButton type="button" onClick={() => setIsSignoutConfirmOpen(false)} disabled={isSigningOut}>
                      취소
                    </SignoutConfirmButton>
                    <SignoutConfirmButton type="button" onClick={() => handleSignout(false)} disabled={isSigningOut}>
                      현재 기기
                    </SignoutConfirmButton>
                    <SignoutConfirmButton type="button" primary onClick={() => handleSignout(true)} disabled={isSigningOut}>
                      {isSigningOut ? "로그아웃 중..." : "모든 기기"}
                    </SignoutConfirmButton>
                  </SignoutConfirmActions>
                </SignoutConfirm>
              )}
            </User>
          ) : (
            <FallbackUser>로그인이 필요합니다.</FallbackUser>
          )}
        </Layout>
        {type !== "public" && (
          <NavBar type={type}>
            {Object.entries(NAV_ITEMS[type]).map(([path, name], i) => (
              <Nav
                to={path}
                key={i}
                ref={el => {
                  navRefs.current[i] = el;
                }}
              >
                {name}
              </Nav>
            ))}
            <Indicator
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />
          </NavBar>
        )}
      </Frame>
    </>
  );
}

export default Header;
