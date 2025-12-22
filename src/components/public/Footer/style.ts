import styled from "@emotion/styled";

interface BgProps {
  color: "lightGray" | "white";
}

export const Frame = styled.div<BgProps>`
  display: flex;
  width: 100%;
  height: 25rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  background-color: ${({ color }) =>
    color === "lightGray" ? "var(--natural-100)" : color === "white" ? "var(--white)" : "var(--black)"};
  ${({ color }) => color === "white" && "border-top: 1px solid var(--natural-300);"}
`;

export const Content = styled.div`
  display: flex;
  width: 80rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;

  color: var(--natural-500);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.25rem;
`;

export const Logo = styled.div`
  width: 5rem;
  height: 5rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;
`;

export const Connection = styled.div`
  display: flex;
  height: 15.1875rem;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 7.5rem;
`;

export const Nav = styled.div`
  display: flex;
  height: 15.1875rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.75rem;
`;

export const SNS = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: var(--spacing-xl);
`;
