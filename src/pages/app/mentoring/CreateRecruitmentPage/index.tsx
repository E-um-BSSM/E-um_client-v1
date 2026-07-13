import {
  BodyContainer,
  ContentContainer,
  WriteGenerateContainer,
  DialogContainer,
  Title,
  Description,
  FindContainer,
  FindDialogContainer,
  AllViwe,
  CardContainer,
} from "@/pages/app/mentoring/CreateRecruitmentPage/styles";
import { WriteGenerateButton, RecruitmentCard } from "@/components";
import { useNavigate } from "react-router-dom";
import { useClassSearch } from "@/hooks";

export default function CreateRecruitmentPage() {
  const navigate = useNavigate();
  // 모집글 = 모집 중(RECRUITING) 클래스 미리보기
  const { data } = useClassSearch({ status: "RECRUITING" });
  const cardList = data?.items ?? [];

  return (
    <>
      <BodyContainer>
        <ContentContainer>
          <WriteGenerateContainer>
            <DialogContainer>
              <Title>누구나 멘토가 될 수 있어요</Title>
              <Description>함께 할 멘티를 모집하고, 클래스를 개설하세요</Description>
            </DialogContainer>
            <WriteGenerateButton onClick={() => navigate("/app/mento/write")} />
          </WriteGenerateContainer>
          <FindContainer>
            <FindDialogContainer>
              <DialogContainer>
                <Title>함께 하고 싶은 멘토를 찾아요</Title>
                <Description>멘토들이 쓴 모집 글 목록을 확인할 수 있어요 </Description>
              </DialogContainer>
              <AllViwe onClick={() => navigate("/app/mento/list")}>전체보기 &gt;</AllViwe>
            </FindDialogContainer>
            <CardContainer>
              {cardList.map(item => (
                <RecruitmentCard
                  key={item.id}
                  name={item.mentor?.nickname ?? ""}
                  description={item.title}
                  level={item.difficulty}
                  onClick={() => navigate(`/app/mento/detail?classId=${item.id}`)}
                />
              ))}
            </CardContainer>
          </FindContainer>
        </ContentContainer>
      </BodyContainer>
    </>
  );
}
