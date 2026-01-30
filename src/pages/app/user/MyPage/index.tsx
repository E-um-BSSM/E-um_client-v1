import {
  MyMentoringCardContainer,
  MyWrapper,
  TextContainer,
  Text,
  Cnt,
  Container,
  ContentContainer,
  MyContainer,
  RecentMentoringEmpty,
  TopContainer,
  MyRecruitmentCardContainer,
} from "./styles";
import { MiniMentoringCard, FindClassButton, ClassSearchBar, RadioSwitch, RecruitmentCard } from "@/components";

export default function MyPage() {
  const MentoringData = [
    { id: 1, title: "React 기초 마스터", lecturer: "김철수" },
    { id: 2, title: "UI/UX 디자인 입문", lecturer: "이영희" },
    { id: 3, title: "Node.js 백엔드 구축", lecturer: "박지성" },
    { id: 4, title: "프론트엔드 포트폴리오", lecturer: "최유리" },
    { id: 5, title: "데이터 구조와 알고리즘", lecturer: "홍길동" },
    { id: 6, title: "데이터 구조와 알고리즘", lecturer: "홍길동" }, // 5번째 데이터
  ];
  const RecruitmentData = [
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
  ];
  const MentoringDataCnt = MentoringData.length ? MentoringData.length : 0;
  const RecruitmentDataCnt = RecruitmentData.length ? RecruitmentData.length : 0;

  return (
    <>
      <Container>
        <ContentContainer>
          <TopContainer>
            <RadioSwitch />
            <ClassSearchBar />
          </TopContainer>
          <MyContainer>
            <MyWrapper>
              <TextContainer>
                <Text>
                  멘토링 중인 강좌 <Cnt>{MentoringDataCnt}</Cnt>
                </Text>
              </TextContainer>
              <MyMentoringCardContainer>
                {MentoringData.length > 0 ? (
                  MentoringData.map(item => (
                    <MiniMentoringCard key={item.id} title={item.title} lecturer={item.lecturer} />
                  ))
                ) : (
                  <RecentMentoringEmpty>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <p>👀</p>
                      <p
                        style={{
                          color: "var(--text-muted, #64748B)",
                          fontFamily: "Pretendard",
                          fontSize: "1.25rem",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                          letterSpacing: "-0.0275rem",
                        }}
                      >
                        현재 진행 중인 멘토링이 없어요
                      </p>
                    </div>
                    <FindClassButton />
                  </RecentMentoringEmpty>
                )}
              </MyMentoringCardContainer>
            </MyWrapper>
            <MyWrapper>
              <TextContainer>
                <Text>
                  모집 중인 강좌 <Cnt>{RecruitmentDataCnt}</Cnt>
                </Text>
              </TextContainer>
              <MyRecruitmentCardContainer>
                {RecruitmentData.length > 0 ? (
                  RecruitmentData.map(({ name, description, level }, idx) => (
                    <RecruitmentCard key={idx} name={name} description={description} level={level} />
                  ))
                ) : (
                  <RecentMentoringEmpty>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <p>👀</p>
                      <p
                        style={{
                          color: "var(--text-muted, #64748B)",
                          fontFamily: "Pretendard",
                          fontSize: "1.25rem",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                          letterSpacing: "-0.0275rem",
                        }}
                      >
                        현재 모집 중인 강좌가 없어요
                      </p>
                    </div>
                    <FindClassButton />
                  </RecentMentoringEmpty>
                )}
              </MyRecruitmentCardContainer>
            </MyWrapper>
          </MyContainer>
        </ContentContainer>
      </Container>
    </>
  );
}
