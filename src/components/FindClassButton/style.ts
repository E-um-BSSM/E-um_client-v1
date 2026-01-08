import styled from "@emotion/styled";

export const Base = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--XS, 0.5rem);
  border: 1px solid var(--Natural-natural-300, #CFD9E0);
  background: var(--white, #FFF);
  color: var(--Text-text-muted, #64748B);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    background: var(--natural-200, #E7EBEE);
    cursor: pointer;
    transition: 0.3s;
  }

  &:active {
    background: var(--natural-300, #CFD9E0);
  }
`;