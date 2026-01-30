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
} from "./styles";
import { MiniMentoringCard,FindClassButton, ClassSearchBar,RadioSwitch} from "@/components";

export default function MyPage() {
  const MentoringData = [
    // { id: 1, title: "React 기초 마스터", lecturer: "김철수" },
    // { id: 2, title: "UI/UX 디자인 입문", lecturer: "이영희" },
    // { id: 3, title: "Node.js 백엔드 구축", lecturer: "박지성" },
    // { id: 4, title: "프론트엔드 포트폴리오", lecturer: "최유리" },
    // { id: 5, title: "데이터 구조와 알고리즘", lecturer: "홍길동" },
    // { id: 6, title: "데이터 구조와 알고리즘", lecturer: "홍길동" }, // 5번째 데이터
  ];
  const RecruitmentData = [];
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
                  모집 중인 강좌 <Cnt>{RecruitmentDataCnt}</Cnt>
                </Text>
              </TextContainer>
              {RecruitmentData.length > 0 ? (
                  RecruitmentData.map(item => (
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
                        현재 모집 중인 강좌가 없어요
                      </p>
                    </div>
                    <FindClassButton />
                  </RecentMentoringEmpty>
                )}
            </MyWrapper>
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
          </MyContainer>
        </ContentContainer>
      </Container>
    </>
  );
}
