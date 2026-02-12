import styled from "@emotion/styled";

export const CardContainer = styled.div`
  width: 21.25rem;
  min-height: 15rem;
  border-radius: 1.5rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  padding: 2.25rem 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.p`
  width: 16.25rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const LegacyLecturer = styled.p`
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
`;

export const ApplicantRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ApplicantLabel = styled.p`
  color: var(--primary-500);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const ApplicantCount = styled.p`
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
`;

export const ActionButton = styled.button`
  margin-top: 0.5rem;
  width: fit-content;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1px solid var(--natural-200);
  background: var(--white);
  padding: 0.75rem 1rem;
  box-sizing: border-box;

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ActionIcon = styled.img`
  width: 1.5rem;
  height: 1.375rem;
  object-fit: contain;
`;

export const ActionText = styled.span`
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;
