import styled from "@emotion/styled";

export const BodyContainer = styled.div`
  display: flex;
  padding: 3.6875rem 8.25rem 4.375rem 8.1875rem;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
  width: 100%;
  box-sizing: border-box;
  max-width: 73.875rem;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
`;

export const Title = styled.p`
  color: var(--text-primary, #0f172a);
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem; /* 171.429% */
`;
