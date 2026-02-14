import styled from "@emotion/styled";

export const GenerateButtonBase = styled.button`
  display: inline-flex;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--XS, 0.5rem);
  border: 1px solid var(--natural-200, #e7ebee);
  background: var(--white, #fff);
  color: var(--text-primary, #0f172a);
  font-family: Pretendard;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.625rem;
  transition: 0.3s;

  &:hover {
    background: var(--natural-200, #e7ebee);
    cursor: pointer;
  }

  &:active {
    background: var(--natural-300, #cfd9e0);
    border: 1px solid var(--natural-300, #cfd9e0);
  }
`;

