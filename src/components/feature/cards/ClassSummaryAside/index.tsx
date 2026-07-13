import type { ReactNode } from "react";
import styled from "@emotion/styled";
import { DifficultyLevel } from "@/components/feature/DifficultyLevel";

interface ClassSummaryAsideProps {
  mentorName: string;
  title: string;
  difficulty: number;
  buttonLabel: string;
  onButtonClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

/** 지원서/신청 화면 우측의 클래스 요약 카드 (Figma 6018-2115). */
export function ClassSummaryAside({
  mentorName,
  title,
  difficulty,
  buttonLabel,
  onButtonClick,
  disabled,
  children,
}: ClassSummaryAsideProps) {
  return (
    <Card>
      <Header>
        <Mentor>
          <Avatar src="/eum.png" alt="멘토 프로필" />
          <MentorName>{mentorName}</MentorName>
        </Mentor>
        <Title>{title}</Title>
      </Header>

      <DifficultyLevel level={difficulty} />

      <ActionButton type="button" disabled={disabled} onClick={onButtonClick}>
        {buttonLabel}
      </ActionButton>
      {children}
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-200);
  background: var(--white);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Mentor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 50%;
  object-fit: cover;
`;

const MentorName = styled.span`
  font-family: Pretendard;
  font-size: 1.375rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const Title = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--text-primary);
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.75rem;
  border: none;
  border-radius: 0.75rem;
  background: var(--primary-500);
  color: var(--white);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--primary-700);
  }
  &:disabled {
    background: var(--natural-300);
    color: var(--text-muted);
    cursor: default;
  }
`;
