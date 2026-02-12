import styled from "@emotion/styled";

interface MentoringCardBaseProps {
  title: string;
  lecturer: string;
  size: "default" | "mini";
  onClick?: () => void;
}

function MentoringCardBase({ title, lecturer, size, onClick }: MentoringCardBaseProps) {
  return (
    <Container
      size={size}
      hasClickable={Boolean(onClick)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => e.key === "Enter" && onClick?.()}
    >
      <CardBanner size={size} />
      <TextContainer>
        <Profile size={size}>
          <Title>{title}</Title>
          <Lecturer>{lecturer}</Lecturer>
        </Profile>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div<{ size: "default" | "mini"; hasClickable: boolean }>`
  display: flex;
  width: ${({ size }) => (size === "default" ? "16.25rem" : "17.5rem")};
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex-shrink: 0;
  cursor: ${({ hasClickable }) => (hasClickable ? "pointer" : "default")};
`;

const CardBanner = styled.div<{ size: "default" | "mini" }>`
  width: ${({ size }) => (size === "default" ? "16.25rem" : "17.5rem")};
  height: ${({ size }) => (size === "default" ? "8.75rem" : "8.75rem")};
  align-self: stretch;
  border-radius: var(--S, 0.75rem);
  background: var(--natural-100, #f7f9fa);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

const Profile = styled.div<{ size: "default" | "mini" }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  font-family: Pretendard;
  font-size: ${({ size }) => (size === "default" ? "1.125rem" : "1rem")};
  font-style: normal;
  font-weight: 400;
  line-height: ${({ size }) => (size === "default" ? "normal" : "1.25rem")};
  letter-spacing: -0.02475rem;
`;

const Title = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-primary, #0f172a);
`;

const Lecturer = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-muted, #64748b);
`;

export default MentoringCardBase;
