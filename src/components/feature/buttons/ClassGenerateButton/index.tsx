import Class from "@/assets/class_natural-500.svg";

import { Base } from "./style";

export function ClassGenerateButton() {
  return (
    <Base type="button">
      <img src={Class} alt="클래스" />
      클래스 개설하기
    </Base>
  );
}
