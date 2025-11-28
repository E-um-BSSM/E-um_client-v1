import Docs from "@/assets/docs_natural-500.svg"

import { Base } from "@/components/WriteGenerateButton/style";

export default function WriteGenerateButton() {
  return (
    <Base>
      <img src={Docs} alt="Docs"/>
      모집 글 쓰기
    </Base>
  );
}