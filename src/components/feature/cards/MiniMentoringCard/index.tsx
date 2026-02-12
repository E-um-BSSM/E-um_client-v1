import ClassIcon from "@/assets/class_natural-500.svg";
import {
  ActionButton,
  ActionIcon,
  ActionText,
  ApplicantCount,
  ApplicantLabel,
  ApplicantRow,
  CardContainer,
  LegacyLecturer,
  Title,
} from "./styles";

interface MiniMentoringCardProps {
  title: string;
  lecturer?: string;
  applicantCount?: number;
  actionText?: string;
  onActionClick?: () => void;
  onClick?: () => void;
}

export function MiniMentoringCard({
  title,
  lecturer,
  applicantCount,
  actionText = "클래스 개설하기",
  onActionClick,
  onClick,
}: MiniMentoringCardProps) {
  const hasApplicantInfo = typeof applicantCount === "number";

  return (
    <CardContainer onClick={onClick}>
      <Title>{title}</Title>
      {hasApplicantInfo ? (
        <>
          <ApplicantRow>
            <ApplicantLabel>멘티 신청자수</ApplicantLabel>
            <ApplicantCount>{applicantCount}</ApplicantCount>
          </ApplicantRow>
          <ActionButton
            type="button"
            onClick={event => {
              event.stopPropagation();
              onActionClick?.();
            }}
          >
            <ActionIcon src={ClassIcon} alt="클래스 아이콘" />
            <ActionText>{actionText}</ActionText>
          </ActionButton>
        </>
      ) : (
        <LegacyLecturer>{lecturer ?? "-"}</LegacyLecturer>
      )}
    </CardContainer>
  );
}
