import styled from "@emotion/styled";

export const SwitchContainer = styled.div`
  position: relative;
  display: flex;
  background: var(--natural-100, #f7f9fa);
  border-radius: 0.5rem;
  padding: 4px;
  width: fit-content;
  isolation: isolate;
`;

export const SlidingBackground = styled.div<{ activeIndex: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: var(--white, #fff);
  border-radius: 0.25rem;
  box-shadow: 0 4px 12px 0 rgba(116, 121, 136, 0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${(props) => props.activeIndex * 100}%);
  z-index: -1;
`;

export const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const StyledLabel = styled.label<{ isSelected: boolean }>`
  display: flex;
  width : 2rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.25rem;
  color: ${(props) => (props.isSelected ? "var(--Text-text-primary, #0F172A)" : "var(--text-muted, #64748b)")};
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-primary, #0F172A);
  }
`;