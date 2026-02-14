import styled from "@emotion/styled";
import { GenerateButtonBase } from "@/components/ui/shared/generateButtonStyle";

export const CardContainer = styled.div<{ variant: "mento" | "menti" }>`
  width: 21.25rem;
  min-height: ${({ variant }) => (variant === "mento" ? "15rem" : "9.3125rem")};
  border-radius: 1.5rem;
  border: 1px solid var(--natural-300, #cfd9e0);
  background: var(--white, #fff);
  padding: 2.25rem 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
`;

export const Title = styled.p`
  width: 16.25rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: var(--text-primary, #0f172a);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const ApplicantRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ApplicantLabel = styled.p`
  color: var(--primary-500, #235fff);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const ApplicantCount = styled.p`
  color: var(--text-muted, #64748b);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
`;

export const MentorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MentorLabel = styled.p`
  color: var(--primary-500, #235fff);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const MentorName = styled.p`
  color: var(--text-muted, #64748b);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
`;

export const ActionButton = styled(GenerateButtonBase)`
  margin-top: 0.5rem;
  width: fit-content;
  height: 3rem;
  font-size: 1.125rem;
  line-height: 1.3;
  color: var(--text-muted, #64748b);
`;

export const ActionIcon = styled.img`
  width: 1.5rem;
  height: 1.375rem;
  object-fit: contain;
`;

export const ActionText = styled.span`
  color: var(--text-muted, #64748b);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;
