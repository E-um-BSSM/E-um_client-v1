import styled from "@emotion/styled";
import type { SerializedStyles } from "@emotion/react";

interface props {
  activate: boolean;
  customStyle?: SerializedStyles;
}

const Button = styled.button<props>`
  display: flex;
  padding: var(--spacing-m) var(--spacing-l);
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  height: 56px;
  box-sizing: border-box;

  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  ${({ activate }) =>
    activate
      ? `
        background-color: var(--primary-500);
        color: var(--white);
      `
      : `
        background-color: var(--natural-300);
        color: var(--text-muted);
      `}

  &:hover {
    background-color: ${({ activate }) => (activate ? "var(--primary-700)" : "var(--natural-400)")};
  }

  ${({ activate }) =>
    activate &&
    `
      &:active {
        background-color: var(--primary-900);
      }
    `}
  ${({ customStyle }) => customStyle}
`;

export default Button;
