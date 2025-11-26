import Docs from "@/assets/docs_natural-500.svg"

import { Base } from "@/components/WriteGenerate/style";

export default function WriteGenerate() {
  return (
    <Base>
      <img src={Docs} alt="Docs"/>
      모집 글 쓰기
    </Base>
  );
}