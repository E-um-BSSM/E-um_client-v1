import { Frame, Layout, NavBar, Nav, Indicator, User, UserImg, UserInfo, FallbackUser } from "./style";
import Logo from "@/assets/eum_header_logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { NAV_ITEMS } from "@/constants/navigation";
import { useAuthStore } from "@/stores";

function AppHeader() {
  const type = "app";
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const entries = Object.keys(NAV_ITEMS[type]);
    const activeKey = pathname;
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
          <Link to={"/app"}>
            <img src={Logo} alt="이음 로고" loading="lazy" />
          </Link>
          {isAuthenticated && user ? (
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
      </Frame>

      <NavBar>
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
    </>
  );
}

export default AppHeader;
