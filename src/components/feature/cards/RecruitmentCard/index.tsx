import { Container, Description, Info, Profile } from "./style";
import {RecruitmentDetailButton, DifficultyLevel} from "@/components";

export function RecruitmentCard({ name, description, level }: { name: string; description: string; level: number }) {
  return (
    <Container>
      <Info>
        <Profile>
          <p style={{ color: "var(--primary-500, #235FFF)" }}>멘토</p>
          <p>{name}</p>
        </Profile>
        <Description>{description}</Description>
      </Info>
      <DifficultyLevel level={level} />
      <RecruitmentDetailButton />
    </Container>
  );
}
