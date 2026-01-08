import { useGlobalStyle } from "@/stores/useStyle";
import { Frame, Content, InfoBox, Logo, Info, Connection, Nav, SNS } from "./style";
import MyLogo from "@/assets/logo_natural-300.svg";
import Insta from "@/assets/insta_natural-400.svg";
import GitHub from "@/assets/github_natural-400.svg";
import { Link } from "react-router-dom";
import type { PageType } from "@/types/Page";
import React from "react";

interface props {
  type: PageType;
}

function Footer({ type }: props) {
  const footerColor = useGlobalStyle(state => state.footerColor);
  const contactEmail = "e-um@exam.com";

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

  return (
    <Frame color={footerColor}>
      <Content>
        <InfoBox>
          <Logo>
            <img src={MyLogo} alt="이음 로고" loading="lazy" />
          </Logo>
          <Info>
            <span>주소: 부산광역시 강서구 가락대로 1393 (46708)</span>
            <span>이메일: {contactEmail}</span>
            <span>문의: 이음인스타</span>
          </Info>
        </InfoBox>
        <Connection>
          <Nav>
            {type !== "public" &&
              Object.entries(navInfos[type]).map(([path, name], i) => (
                <Link to={path} key={i}>
                  {name}
                </Link>
              ))}
          </Nav>
          <SNS>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={Insta} alt="인스타" />
            </a>
            <a href="https://github.com/E-um-BSSM" target="_blank" rel="noopener noreferrer">
              <img src={GitHub} alt="깃허브" />
            </a>
          </SNS>
        </Connection>
      </Content>
    </Frame>
  );
}

export default React.memo(Footer);
