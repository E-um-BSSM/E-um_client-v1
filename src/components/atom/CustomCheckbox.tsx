import styled from "@emotion/styled";
import type React from "react";

interface HiddenCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  size: number;
  children?: React.ReactNode;
}

const HiddenCheckbox = styled.input`
  appearance: none;
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const StyledCheckbox = styled.div<{ checked: boolean; size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 4px;
  border: 1px solid ${({ checked }) => (checked ? "var(--primary-500)" : "var(--natural-500)")};
  background-color: var(${({ checked }) => (checked ? "--primary-500" : "--white")});
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    ${({ checked }) =>
      checked
        ? `border-color: var(--primary-700); background-color: var(--primary-700);`
        : "border-color: var(--natural-700);"};
  }

  /* 체크표시 */
  &::after {
    content: "";
    display: ${({ checked }) => (checked ? "block" : "none")};
    width: 25%;
    height: 50%;
    border: solid var(--white);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) translateX(-10%) translateY(-5%);
  }
`;

export default function CustomCheckbox({ children, size, checked, ...rest }: HiddenCheckboxProps) {
  return (
    <label style={{ cursor: "pointer", display: "inline-flex", gap: "8px" }}>
      <HiddenCheckbox type="checkbox" checked={checked} {...rest} />
      <StyledCheckbox checked={checked} size={size} />
      {children}
    </label>
  );
}
