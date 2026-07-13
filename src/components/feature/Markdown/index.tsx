import ReactMarkdown from "react-markdown";
import styled from "@emotion/styled";

/** 마크다운 문자열을 디자인 토큰 기반 스타일로 렌더링합니다. */
export function MarkdownView({ children }: { children: string }) {
  return (
    <Prose>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Prose>
  );
}

const Prose = styled.div`
  font-family: Pretendard;
  color: var(--text-primary);
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4 {
    margin: 1.5rem 0 0.75rem;
    font-weight: 500;
    line-height: 1.3;
    color: var(--text-primary);
  }
  h1 {
    font-size: 1.75rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }
  h4 {
    font-size: 1.125rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.125rem;
    color: var(--text-secondary);
  }

  hr {
    margin: 1rem 0;
    border: none;
    border-top: 1px solid var(--natural-200);
  }

  ul,
  ol {
    margin: 0.5rem 0;
    padding-left: 1.25rem;
    font-size: 1.125rem;
    color: var(--text-secondary);
  }

  a {
    color: var(--primary-500);
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    border-radius: 0.75rem;
  }

  blockquote {
    margin: 0.75rem 0;
    padding: 0.25rem 0 0.25rem 1rem;
    border-left: 3px solid var(--natural-300);
    color: var(--text-muted);
  }

  code {
    font-family: monospace;
    background: var(--natural-100);
    padding: 0.1rem 0.3rem;
    border-radius: 0.25rem;
  }
`;
