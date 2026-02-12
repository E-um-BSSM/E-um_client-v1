import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem 5rem 15.62rem 5rem;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const MyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
`;

export const RecentMentoringEmpty = styled.div`
  display: flex;
  width: 100%;
  height: 14.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: var(--S, 0.75rem);
  background: var(--Natural-natural-100, #f7f9fa);
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  flex-shrink: 0;
`;

export const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5rem;
  align-self: stretch;
`;

export const MyMentoringCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 17.5rem);
  gap: 2.25rem;
  justify-content: space-between;
  align-self: stretch;
`;
export const Text = styled.p`
  color: var(--Text-text-primary, #0f172a);

  /* Body/Paragraph Medium */
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem; /* 133.333% */
`;
export const Cnt = styled.span`
  color: var(--Primary-primary-500, #235fff);

  /* Body/Paragraph Medium */
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem; /* 133.333% */
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const MyRecruitmentCardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.25rem;
  align-self: stretch;
  flex-wrap: wrap;
`;
