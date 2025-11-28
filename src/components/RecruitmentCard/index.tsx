import { Container, Description, Info, Profile } from "@/components/RecruitmentCard/style";
import RecruitmentDetailButton from "@/components/RecruitmentDetailButton";
import DifficultyLevel from "@/components/DifficultyLevel";

export default function RecruitmentCard({ name, description, level }: { name: string; description: string; level: number }) {
  return (
    <Container>
      <Info>
        <Profile>
          <p style={{ color: "var(--Primary-primary-500, #235FFF)" }}>멘토</p>
          <p>{name}</p>
        </Profile>
        <Description>{description}</Description>
      </Info>
      <DifficultyLevel level={level} />
      <RecruitmentDetailButton />
    </Container>
  );
}
