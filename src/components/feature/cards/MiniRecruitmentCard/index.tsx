import ClassIcon from "@/assets/class_natural-500.svg";
import {
  ActionButton,
  ActionIcon,
  ActionText,
  ApplicantCount,
  ApplicantLabel,
  ApplicantRow,
  CardContainer,
  MentorLabel,
  MentorName,
  MentorRow,
  Title,
} from "./styles";

interface MiniRecruitmentCardProps {
  title: string;
  variant?: "mento" | "menti";
  applicantCount?: number;
  mentorName?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export function MiniRecruitmentCard({
  title,
  variant = "mento",
  applicantCount,
  mentorName,
  actionText = "클래스 개설하기",
  onActionClick,
}: MiniRecruitmentCardProps) {
  return (
    <CardContainer variant={variant}>
      <Title>{title}</Title>
      {variant === "mento" ? (
        <>
          <ApplicantRow>
            <ApplicantLabel>멘티 신청자수</ApplicantLabel>
            <ApplicantCount>{applicantCount ?? 0}</ApplicantCount>
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
        <MentorRow>
          <MentorLabel>멘토</MentorLabel>
          <MentorName>{mentorName ?? "-"}</MentorName>
        </MentorRow>
      )}
    </CardContainer>
  );
}
