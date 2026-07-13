import { CardContainer } from "@/pages/app/mentoring/CreateRecruitmentPage/styles";
import {
  BodyContainer,
  ContentContainer,
  TextContainer,
  Title,
} from "@/pages/app/mentoring/RecruitmentListPage/styles";
import { RecruitmentCard, RecruitmentSearchBar } from "@/components";
import { useClassSearch } from "@/hooks";
import { useNavigate } from "react-router-dom";

export default function RecruitmentListPage() {
  const navigate = useNavigate();
  // 모집글 = 모집 중(RECRUITING) 클래스
  const { data } = useClassSearch({ status: "RECRUITING" });
  const cardList = data?.items ?? [];

  return (
    <>
      <BodyContainer>
        <ContentContainer>
          <TextContainer>
            <Title>전체 모집글 보기</Title>
            <RecruitmentSearchBar />
          </TextContainer>
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
        </ContentContainer>
      </BodyContainer>
    </>
  );
}
