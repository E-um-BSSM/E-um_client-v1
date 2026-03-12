import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Frame = styled.header`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  z-index: 10;
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

export const FallbackUser = styled.span`
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
  color: var(--natural-500);
`;

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 11;
  padding-left: 5rem;
  align-self: flex-start;
  border-bottom: 1px solid var(--natural-300);
  background-color: var(--white);
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
