import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Base = styled.div`
  display: inline-flex;
  height: 1.5rem;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  color: var(--Text-text-muted, #64748B);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 122.222% */
`;

export const Status = {
  deactivate: css({
    borderRadius: "var(--XS, 0.5rem)",
    border: "1px solid var(--Natural-natural-200, #E7EBEE)",
    background: "var(--white, #FFF)",
  }),
  activate: css({
    borderRadius: "var(--XS, 0.5rem)",
    background: "var(--Natural-natural-200, #E7EBEE)",
  }),
};