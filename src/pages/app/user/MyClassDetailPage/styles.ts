import styled from "@emotion/styled";

// ── Page shell ──────────────────────────────────────────────────────────────

export const PageContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 3.75rem 0 5.625rem;
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  box-sizing: border-box;

  @media (max-width: 84rem) {
    padding: 3rem 2rem 5rem;
  }

  @media (max-width: 48rem) {
    padding: 2.25rem 1rem 3.75rem;
    gap: 2.5rem;
  }
`;

// ── Class header ─────────────────────────────────────────────────────────────

/** Wraps thumbnail+meta on the left with action controls on the right (mento only) */
export const ClassHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;

  @media (max-width: 64rem) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const ClassSummary = styled.section`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 48rem) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
`;

export const ClassThumbnail = styled.div`
  width: 15rem;
  height: 8.0625rem;
  border-radius: 0.75rem;
  background: var(--natural-100);
  flex-shrink: 0;

  @media (max-width: 48rem) {
    width: 100%;
    max-width: 20rem;
  }
`;

export const ClassMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ClassTitle = styled.h1`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

// ── Mento-only action controls ────────────────────────────────────────────────

export const ClassActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.75rem;
  flex-shrink: 0;

  @media (max-width: 64rem) {
    align-items: flex-start;
  }
`;

export const ActionButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const OutlinedButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border: 1px solid var(--primary-200);
  border-radius: 0.5rem;
  background: var(--white);
  color: var(--primary-500);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: var(--primary-100, #eef2ff);
  }
`;

export const DangerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: var(--level-extreme, #ffdadb);
  color: var(--utility-error, #ff1c30);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export const InviteCodeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const InviteCodeLabel = styled.p`
  color: var(--text-secondary);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const InviteCodeValue = styled.p`
  color: var(--primary-500);
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

// ── Two-column content grid ───────────────────────────────────────────────────

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 47.5rem) minmax(0, 28.75rem);
  gap: 3.75rem;

  @media (max-width: 84rem) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
`;

// ── Section ───────────────────────────────────────────────────────────────────

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

/** Section title row that supports an optional right-side action (e.g. 생성하기) */
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

// ── Shared card base ──────────────────────────────────────────────────────────

const Card = styled.div`
  border: 1px solid var(--natural-300);
  border-radius: 0.5rem;
  background: var(--white);
`;

// ── Class intro ───────────────────────────────────────────────────────────────

export const IntroCard = styled(Card)`
  min-height: 20.625rem;
  padding: 1.5rem 1.75rem;
  box-sizing: border-box;
`;

export const IntroText = styled.p`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
  white-space: pre-wrap;
`;

// ── Empty state ───────────────────────────────────────────────────────────────

export const EmptyBlock = styled.div`
  min-height: 12.5rem;
  border-radius: 0.5rem;
  background: var(--natural-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const EmptyEmoji = styled.p`
  font-size: 1.5rem;
  line-height: 1;
`;

export const EmptyText = styled.p`
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
`;

// ── Assignment list ───────────────────────────────────────────────────────────

export const AssignmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const AssignmentCard = styled(Card)`
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;

  @media (max-width: 48rem) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AssignmentTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const AssignmentTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const AssignmentTitle = styled.p`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const AssignmentDeadline = styled.p`
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
`;

export const AssignmentDesc = styled.p`
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
`;

interface AssignmentButtonProps {
  variant: "submit" | "deadline" | "done" | "feedback";
}

const assignmentButtonColors = {
  submit: {
    bg: "var(--primary-500)",
    color: "var(--white)",
    hover: "var(--primary-900)",
  },
  deadline: {
    bg: "var(--natural-300)",
    color: "var(--text-muted)",
    hover: "var(--natural-300)",
  },
  done: {
    bg: "var(--natural-300)",
    color: "var(--text-muted)",
    hover: "var(--natural-300)",
  },
  feedback: {
    bg: "var(--primary-500)",
    color: "var(--white)",
    hover: "var(--primary-900)",
  },
};

export const AssignmentButton = styled.button<AssignmentButtonProps>`
  width: 25rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  background: ${({ variant }) => assignmentButtonColors[variant].bg};
  color: ${({ variant }) => assignmentButtonColors[variant].color};
  transition: background-color 0.2s ease;

  &:disabled {
    cursor: default;
  }

  &:hover {
    background: ${({ variant }) => assignmentButtonColors[variant].hover};
  }

  @media (max-width: 64rem) {
    width: 18rem;
  }

  @media (max-width: 48rem) {
    width: 100%;
  }
`;

// ── Mentor card ───────────────────────────────────────────────────────────────

export const MentorCard = styled(Card)`
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const MentorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Avatar = styled.img`
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const MentorName = styled.p`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const MentorDesc = styled.p`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
  white-space: pre-wrap;
`;

// ── Mentee management (mento view) ────────────────────────────────────────────

export const MenteeCard = styled(Card)`
  padding: 1.5rem 1.75rem;
  box-sizing: border-box;
`;

export const MenteeListView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const MenteeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const MiniAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const MenteeName = styled.p`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

// ── Waitlist management (mento view) ──────────────────────────────────────────

export const WaitlistSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const WaitlistCard = styled(Card)`
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const WaitlistItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 48rem) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const WaitlistInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const WaitlistActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const WaitlistButton = styled.button<{ variant: "accept" | "reject" }>`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3;
  cursor: pointer;
  background: ${({ variant }) => (variant === "accept" ? "var(--white)" : "var(--level-extreme, #ffdadb)")};
  border: ${({ variant }) => (variant === "accept" ? "1px solid var(--primary-200)" : "none")};
  color: ${({ variant }) => (variant === "accept" ? "var(--primary-500)" : "var(--utility-error, #ff1c30)")};
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }
`;

// ── Notice section ────────────────────────────────────────────────────────────

export const NoticeCard = styled(Card)`
  padding: 1rem 1.25rem;
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NoticeItem = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
  color: var(--text-primary);
  border-bottom: 1px solid var(--natural-300);

  &:last-of-type {
    border-bottom: none;
  }
`;

export const NoticeArrow = styled.img`
  width: 0.5625rem;
  height: 1.25rem;
`;

// ── Modals & overlay ──────────────────────────────────────────────────────────

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  background: rgba(12, 20, 28, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
`;

export const Modal = styled.div`
  position: relative;
  width: 41.875rem;
  border-radius: 1.5rem;
  background: var(--white);
  padding: 4.875rem 6.625rem 4.125rem;
  box-sizing: border-box;

  @media (max-width: 48rem) {
    width: 100%;
    max-width: 32rem;
    padding: 3rem 1.5rem 2rem;
  }
`;

export const FeedbackModal = styled(Modal)`
  padding-bottom: 3.0625rem;
`;

export const NoticeModal = styled(Modal)`
  padding-bottom: 4.75rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: 1;
`;

export const ModalTitle = styled.h3`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const ModalSubTitle = styled.p`
  margin-top: 0.75rem;
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const SubmitForm = styled.div`
  margin-top: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 48rem) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const FileInput = styled.input`
  width: 25rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
  padding: 1rem 1.5rem;
  box-sizing: border-box;

  &::placeholder {
    color: var(--text-muted);
  }

  @media (max-width: 48rem) {
    width: 100%;
  }
`;

export const FilePickButton = styled.button`
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-200);
  background: var(--white);
  color: var(--primary-500);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
  padding: 0.75rem 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

interface SubmitButtonProps {
  active: boolean;
}

export const SubmitButton = styled.button<SubmitButtonProps>`
  width: 25rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  color: ${({ active }) => (active ? "var(--white)" : "var(--text-muted)")};
  background: ${({ active }) => (active ? "var(--primary-500)" : "var(--natural-300)")};
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? "var(--primary-900)" : "var(--natural-300)")};
  }

  @media (max-width: 48rem) {
    width: 100%;
  }
`;

export const FeedbackHeader = styled.div`
  margin-top: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FeedbackLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const FeedbackName = styled.p`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const ScoreLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ScoreText = styled.p`
  color: var(--text-muted);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
`;

export const DotRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

interface DotProps {
  active: boolean;
}

export const Dot = styled.span<DotProps>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: ${({ active }) => (active ? "var(--primary-400)" : "var(--natural-300)")};
`;

export const FeedbackInput = styled.div`
  width: 100%;
  height: 3.5rem;
  margin-top: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: var(--text-muted);
`;

export const NoticeBody = styled.p`
  margin-top: 1.5rem;
  color: var(--text-secondary);
  font-family: Pretendard;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  white-space: pre-wrap;
`;

// ── Mento Modals ──────────────────────────────────────────────────────────────

export const MentoModal = styled(Modal)`
  padding: 4.875rem 6.625rem 3.5rem;
`;

export const ModalForm = styled.form`
  margin-top: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FormLabel = styled.label`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 500;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 3.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  padding: 0 1.5rem;
  font-family: Pretendard;
  font-size: 1.125rem;
  box-sizing: border-box;

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 8rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  padding: 1.25rem 1.5rem;
  font-family: Pretendard;
  font-size: 1.125rem;
  box-sizing: border-box;
  resize: none;

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const SubmissionListModal = styled(Modal)`
  padding: 4.875rem 6.625rem 4.125rem;
`;

export const SubmissionList = styled.div`
  margin-top: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SubmissionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
`;

export const SubmissionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const ExternalLink = styled.a`
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  color: var(--text-secondary);
  font-family: Pretendard;
  font-size: 1.125rem;
  text-decoration: underline;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MiniButton = styled.button<{ variant: "primary" | "muted" }>`
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.3;
  background: ${({ variant }) => (variant === "primary" ? "var(--primary-500)" : "var(--natural-300)")};
  color: ${({ variant }) => (variant === "primary" ? "var(--white)" : "var(--text-muted)")};
  cursor: ${({ variant }) => (variant === "primary" ? "pointer" : "default")};

  &:hover {
    background: ${({ variant }) => (variant === "primary" ? "var(--primary-900)" : "var(--natural-300)")};
  }
`;

export const DotSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
`;

export const InteractiveDot = styled(Dot)`
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
