import Docs from "@/assets/docs_natural-500.svg";

import { Base } from "./style";

export function WriteGenerateButton() {
  return (
    <Base type="button">
      <img src={Docs} alt="문서" />
      모집 글 쓰기
    </Base>
  );
}
