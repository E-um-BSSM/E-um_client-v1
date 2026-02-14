/** @jsxImportSource @emotion/react */
import Rarrow from "@/assets/CRarrow_natural-500.svg";

import { Base } from "./styles";

export function RecruitmentDetailButton() {
  return (
    <Base>
      모집 글 자세히 보기
      <img src={Rarrow} alt="arrow-right" />
    </Base>
  );
}
