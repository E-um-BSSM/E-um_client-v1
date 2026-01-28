import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export const CardBanner = styled.div`
  width: 15rem;
  height: 7.5rem;
  align-self: stretch;
  border-radius: var(--S, 0.75rem);
  background: var(--Natural-natural-100, #f7f9fa);
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: -0.02475rem;
`;
