import type { PageType } from "@/types/Page";
import { Actions, AuthButton, Frame, Layout, NavBar, Nav, Indicator, User, UserImg, UserInfo } from "./style";
import Logo from "@/assets/eum_header_logo.svg";
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

interface props {
  type: PageType;
}

function Header({ type }: props) {
  const navInfos = {
    landing: {
      "#MAIN": "메인",
      "#FEATURE": "기능",
      "#TOGETHER": "함께하기",
      "#CONNECT": "이어가기",
    },
    app: {
      "/app": "홈",
      "/app/mento/list": "멘토-멘티",
      "/app/community": "커뮤니티",
      "/app/store": "상점",
    },
  };

  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (type === "public") return;

    const entries = Object.keys(navInfos[type]);

    // ✔ landing 모드(hash 기반)
    let activeKey = type === "landing" ? hash || "#MAIN" : pathname; // ← app은 pathname 사용

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
          ) : (
            <User>
              <UserImg
                src="/Users/ketarubot/Desktop/김태훈/프사/7988b903-e71f-49e3-be98-e23c950211c3.jpeg"
                alt="유저 프로필 사진"
                loading="lazy"
              />
              <UserInfo>
                <span className="name">김하늘</span>
                <span className="role">Starter</span>
              </UserInfo>
            </User>
          )}
        </Layout>
        {type !== "public" && (
          <NavBar type={type}>
            {Object.entries(navInfos[type]).map(([path, name], i) => (
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
