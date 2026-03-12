import { CardContainer } from "@/pages/app/mentoring/MentoringMainPage/styles";
import {
  BodyContainer,
  ContentContainer,
  TextContainer,
  Title,
} from "@/pages/app/mentoring/RecruitmentListPage/styles";
import { RecruitmentCard, RecruitmentSearchBar } from "@/components";

export default function RecruitmentListPage() {
  const cardList = [
    {
      name: "홍길동",
      description: "안녕하세요! 저는 프론트엔드 개발자 홍길동입니다. 함께 성장해요!",
      level: 3,
    },
    {
      name: "김철수",
      description: "백엔드 개발에 관심 있는 분들을 위한 멘토링을 진행합니다. 많은 참여 부탁드려요!",
      level: 2,
    },
    {
      name: "이영희",
      description: "데이터 사이언스 분야에서 함께 공부할 멘티를 모집합니다. 열정 가득한 분들 환영해요!",
      level: 4,
    },
    {
      name: "박민수",
      description: "풀스택 개발자로서의 경험을 나누고 싶습니다. 함께 성장해요!",
      level: 5,
    },
    {
      name: "최수진",
      description: "UI/UX 디자인에 관심 있는 분들을 위한 멘토링을 진행합니다. 많은 참여 부탁드려요!",
      level: 1,
    },
    {
      name: "정다은",
      description: "모바일 앱 개발에 열정을 가진 멘티를 모집합니다. 함께 도전해봐요!",
      level: 3,
    },
    {
      name: "박민수",
      description: "풀스택 개발자로서의 경험을 나누고 싶습니다. 함께 성장해요!",
      level: 5,
    },
    {
      name: "최수진",
      description: "UI/UX 디자인에 관심 있는 분들을 위한 멘토링을 진행합니다. 많은 참여 부탁드려요!",
      level: 1,
    },
    {
      name: "정다은",
      description: "모바일 앱 개발에 열정을 가진 멘티를 모집합니다. 함께 도전해봐요!",
      level: 3,
    },
  ];
  return (
    <>
      <BodyContainer>
        <ContentContainer>
          <TextContainer>
            <Title>전체 모집글 보기</Title>
            <RecruitmentSearchBar />
          </TextContainer>
          <CardContainer>
            {cardList.map(({ name, description, level }, idx) => (
              <RecruitmentCard key={idx} name={name} description={description} level={level} />
            ))}
          </CardContainer>
        </ContentContainer>
      </BodyContainer>
    </>
  );
}
