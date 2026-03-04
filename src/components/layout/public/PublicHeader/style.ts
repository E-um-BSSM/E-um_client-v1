import styled from "@emotion/styled";
import type { SerializedStyles } from "@emotion/react";
import { Link } from "react-router-dom";

export const Frame = styled.header`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: #ffffff;
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

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  margin: 0 auto;
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
