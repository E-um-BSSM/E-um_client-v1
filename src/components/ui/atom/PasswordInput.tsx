import { useState, type FocusEvent, type InputHTMLAttributes } from "react";
import styled from "@emotion/styled";
import Input from "./Input";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const PasswordInputField = styled(Input)`
  padding-right: 4.75rem;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const VisibilityToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  transform: translateY(-50%);
  border: 0;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--natural-500);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: var(--natural-100);
    outline: none;
  }
`;

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3L21 21M10.6 10.6A2 2 0 0 0 13.4 13.4M9.9 5.1A10.8 10.8 0 0 1 12 4.9c5.2 0 8.6 4.3 9.6 6.1a2.2 2.2 0 0 1 0 2c-.4.7-1.1 1.7-2.1 2.7M6.1 6.1C4.4 7.4 3.3 9.2 2.4 11a2.2 2.2 0 0 0 0 2C3.4 14.7 6.8 19 12 19c1.2 0 2.3-.2 3.3-.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.4 12a2.2 2.2 0 0 1 0-1C3.4 9.3 6.8 5 12 5s8.6 4.3 9.6 6a2.2 2.2 0 0 1 0 1c-1 1.7-4.4 6-9.6 6s-8.6-4.3-9.6-6Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="11.5" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/** 포커스된 동안에만 비밀번호 표시 전환을 제공하는 입력 컴포넌트. */
export default function PasswordInput({ onFocus, onBlur, ...props }: PasswordInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsVisible(false);
    onBlur?.(event);
  };

  return (
    <PasswordInputContainer>
      <PasswordInputField {...props} type={isVisible ? "text" : "password"} onFocus={handleFocus} onBlur={handleBlur} />
      {isFocused && (
        <VisibilityToggle
          type="button"
          aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보이기"}
          onMouseDown={event => event.preventDefault()}
          onClick={() => setIsVisible(visible => !visible)}
        >
          <EyeIcon visible={isVisible} />
        </VisibilityToggle>
      )}
    </PasswordInputContainer>
  );
}
