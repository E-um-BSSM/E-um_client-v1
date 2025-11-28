/** @jsxImportSource @emotion/react */
import Rarrow from "@/assets/Rarrow_natural-500.svg";

import { Base } from "@/components/RecruitmentDetail/styles";

export default function Detail() {
  return (
    <Base>
      모집 글 자세히 보기
      <img src={Rarrow} alt="arrow-right" />
    </Base>
  );
}
