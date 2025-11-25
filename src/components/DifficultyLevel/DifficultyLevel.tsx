import DLcircleFull from "@/assets/DLcircle_primary-400.svg"
import DLcircleEmpty from "@/assets/DLcircle_natural-300.svg"

import { Difficulty, Container } from "./style";

export default function DifficultyLevel({ level }: { level: number }) {
 const arr = new Array(5).fill(1).fill(0, level, 5);

  return (
    <Container>
     난이도
     <Difficulty>
      {arr.map((v, i) => (
          <img
            key={i}
            src={v === 1 ? DLcircleFull : DLcircleEmpty}
            alt="difficulty"
            width={20}
            height={20}
          />
        ))}
     </Difficulty>
    </Container>
  );
}