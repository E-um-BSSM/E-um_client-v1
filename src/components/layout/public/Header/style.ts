import styled from "@emotion/styled";
import type { SerializedStyles } from "@emotion/react";
import { Link } from "react-router-dom";
import type { PageType } from "@/types/Page";

export const Frame = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  position: fixed;
  background-color: #FFFFFF;
`;

export const Layout = styled.div`
  display: flex;
  padding: 0.3rem 5rem;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  width: 100%;
  box-sizing: border-box;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
`;

interface AuthBtnProps {
  customStyle?: SerializedStyles;
}

export const AuthButton = styled(Link, {
  shouldForwardProp: prop => prop !== "customStyle",
})<AuthBtnProps>`
  display: flex;
  padding: 0.75rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;

  text-align: center;

  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;

  ${({ customStyle }) => customStyle}
`;

export const User = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;

export const UserImg = styled.img`
  width: 2.8125rem;
  height: 2.8125rem;
  aspect-ratio: 1/1;
  border-radius: 2.8125rem;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  & .name {
    font-size: 1.125rem;
    line-height: 1.375rem;
    color: var(--text-primary);
  }
  & .role {
    font-size: 1rem;
    line-height: 1.25rem;
    color: var(--natural-400);
  }
`;

interface NavBarProps {
  type: PageType;
}

export const NavBar = styled.div<NavBarProps>`
  display: flex;
  align-items: center;
  height: 100%;

  ${({ type }) =>
    type !== "app"
      ? `position: absolute;
        margin: 0 auto;`
      : `
      position: relative;
      margin-left: 5rem;
      align-self: flex-start;`}
`;

export const Nav = styled(Link)`
  display: flex;
  padding: 1rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  color: var(--Text-text-muted, #64748b);
  text-align: center;

  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
`;
export const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 0.1875rem;
  background-color: var(--primary-500);
  border-radius: 0.125rem;
  transition: 200ms ease-in;
`;
