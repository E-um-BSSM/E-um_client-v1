import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5rem 0;
  gap: 5.5rem;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 80rem; /* 1280px */
  gap: 5rem;
`;

export const PageTitle = styled.h1`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SectionTitle = styled.h2`
  color: var(--text-secondary);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
`;

export const SectionDesc = styled.p`
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const MarkdownToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 1rem;
`;

export const ToolbarTools = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ToolButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text-primary);
  }
`;

export const IconTool = styled(ToolButton)`
  font-size: 1.5rem;
`;

export const RightButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 35rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0; /* Light blue-grey border */
  background: var(--white);
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6;
  resize: none;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    outline: none;
    border: 1px solid var(--primary-500);
  }
`;

export const PreviewContainer = styled.div`
  width: 100%;
  height: 35rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background: var(--white);
  color: var(--text-primary);
  font-family: Pretendard;
  overflow-y: auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5rem 0 1rem 0;
    color: var(--text-primary);
    font-weight: 700;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.25rem;
  }

  p {
    margin: 0.5rem 0;
    line-height: 1.6;
    font-size: 1.125rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--natural-300);
    margin: 1.5rem 0;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  li {
    margin: 0.25rem 0;
    line-height: 1.6;
  }

  blockquote {
    border-left: 4px solid var(--primary-500);
    padding-left: 1rem;
    margin: 1rem 0;
    color: var(--text-secondary);
  }

  code {
    background: var(--natural-100);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.9rem;
  }

  pre {
    background: #1e293b;
    color: #f8fafc;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;

    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }

  a {
    color: var(--primary-500);
    text-decoration: underline;
  }
`;
