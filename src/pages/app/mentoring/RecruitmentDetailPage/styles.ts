import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  background-color: var(--white);
`;

export const Inner = styled.div`
  width: 1280px;
  display: flex;
  gap: 6rem;
`;

export const MainContent = styled.div`
  width: 682px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const Sidebar = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 10rem;
  height: fit-content;
`;

export const MentorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ProfileImage = styled.img`
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const MentorName = styled.span`
  color: var(--text-primary);
  font-size: 1.375rem;
  font-weight: 500;
`;

export const RecruitmentInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const RecruitmentTitle = styled.h1`
  color: var(--text-primary);
  font-size: 1.875rem;
  font-weight: 500;
  line-height: 1.3;
  word-break: keep-all;
`;

export const DifficultySection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const DifficultyLabel = styled.span`
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
`;

export const CircleGroup = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const MarkdownWrapper = styled.div`
  width: 100%;
  color: var(--text-primary);
  font-family: Pretendard;

  h1,
  h2,
  h3,
  h4 {
    margin: 1.5rem 0 1rem;
    font-weight: 700;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.875rem;
  }
  h3 {
    font-size: 1.375rem;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.6;
    margin: 0.5rem 0;
    word-break: keep-all;
  }

  hr {
    border: none;
    border-top: 1px solid var(--natural-300);
    margin: 1.25rem 0;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  li {
    margin: 0.25rem 0;
    line-height: 1.6;
    font-size: 1.125rem;
  }
`;
