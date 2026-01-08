import styled from "@emotion/styled";
import type { SerializedStyles } from "@emotion/react";

interface props {
  customStyle?: SerializedStyles;
}

const Input = styled.input<props>`
  display: flex;
  padding: 1rem 1.5rem;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  height: 3.5rem;
  box-sizing: border-box;

  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;

  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }
  ${({ customStyle }) => customStyle}
`;

export default Input;
