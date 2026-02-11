import styled from "@emotion/styled";

interface MentoringCardBaseProps {
  title: string;
  lecturer: string;
  size: "default" | "mini";
}

function MentoringCardBase({ title, lecturer, size }: MentoringCardBaseProps) {
  return (
    <Container size={size}>
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

const Container = styled.div<{ size: "default" | "mini" }>`
  display: flex;
  width: ${({ size }) => (size === "default" ? "16.25rem" : "fit-content")};
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const CardBanner = styled.div<{ size: "default" | "mini" }>`
  width: ${({ size }) => (size === "default" ? "16.25rem" : "15rem")};
  height: ${({ size }) => (size === "default" ? "8.75rem" : "7.5rem")};
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
  color: var(--text-primary, #0f172a);
`;

const Lecturer = styled.p`
  color: var(--text-muted, #64748b);
`;

export default MentoringCardBase;

