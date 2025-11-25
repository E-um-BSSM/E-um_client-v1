import styled from "@emotion/styled";
import type { SerializedStyles } from "@emotion/react";

interface props {
  customStyle?: SerializedStyles;
}

const Input = styled.input<props>`
  display: flex;
  padding: 16px 24px;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 56px;
  box-sizing: border-box;

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  border-radius: 12px;
  border: 1px solid var(--natural-300);
  background: var(--white);
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }
  ${({ customStyle }) => customStyle}
`;

export default Input;
