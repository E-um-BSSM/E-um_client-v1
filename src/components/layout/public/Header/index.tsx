import type { PageType } from "@/types/Page";
import { Actions, AuthButton, Frame, Layout, NavBar, Nav, Indicator, User, UserImg, UserInfo, FallbackUser } from "./style";
import Logo from "@/assets/eum_header_logo.svg";
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { NAV_ITEMS } from "@/constants/navigation";
import { useAuthStore } from "@/stores";

interface props {
  type: PageType;
}

function Header({ type }: props) {
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (type === "public") return;

    const entries = Object.keys(NAV_ITEMS[type]);

    // ✔ landing 모드(hash 기반)
    const activeKey = type === "landing" ? hash || "#MAIN" : pathname; // ← app은 pathname 사용

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
                <span className="role">{user.system_role}</span>
              </UserInfo>
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
