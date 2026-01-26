import {
  Banner,
  StyledSwiper,
  Container,
  RecentMentoring,
  RecentMentoringTitleContainer,
  Title,
  ViewAll,
  MentoringContent,
  MoreMentoringContainer,
  Popular,
  PopularTitleContainer,
  PopularTitle,
  SubTitle,
  PopularMentoringContent,
  PopularCommunityContent,
  PreviewPopularPostContent,
  PreviewPopularPostInfo,
  PostButtonWrapper,
  PostButtonContent,
  PostButtonText,
  PostTitle,
  PostAuthor,
  PostButtonContainer,
  NotificationContainer,
  NotificationName,
  NotificationTitle,
  NotificationContentContainer,
  NotificationContent,
  RecentMentoringEmpty,
} from "./style";
import { SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import Rarrow from "@/assets/AllViewRarrow_primary-500.svg";
import Rarrow_natural from "@/assets/Rarrow_natural-400.svg";
import Post_tag from "@/assets/Post_tag.svg";
import { MentoringCard, FindClassButton } from "@/components";
import { useState,useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useGlobalStyle } from "@/stores/useStyle";

export default function MainPage() {
  const setFooterColor = useGlobalStyle(state => state.setFooterColor);
  useEffect(() => {
    setFooterColor("white");
  }, [setFooterColor]);

  const DUMMY_NOTICES = [
    { id: 1, title: "서비스 점검 안내", date: "2024.03.20" },
    { id: 2, title: "새로운 기능 출시", date: "2024.03.18" },
    { id: 3, title: "이용약관 변경 안내", date: "2024.03.15" },
  ];
  const DUMMY_POSTS = [
    {
      id: 1,
      title: "AI 코딩 도구 전쟁: 클로드 4.5 소넷",
      content: "AI 코딩 도구 전쟁에서 승자는 바로 클로드 4.5 소넷이었으며...",
      author: "테크매니아",
      date: "2024.03.21",
      imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhg8TwksDw03khK8X87Tgs7AfWNPsGMYQbRA&s",
    },
    {
      id: 2,
      title: "리액트 상태 관리의 미래",
      content: "리액트 19에서 변화하는 상태 관리 패러다임에 대해 알아봅니다...",
      author: "프론트엔드술사",
      date: "2024.03.22",
      imgURL: "url",
    },
    {
      id: 3,
      title: "Tailwind vs Styled Components",
      content: "스타일링 도구 선택의 고민, 어떤 것이 더 효율적일까요?",
      author: "디자인시스템",
      date: "2024.03.23",
      imgURL: "url",
    },
  ];
  const [selectedPost, setSelectedPost] = useState(DUMMY_POSTS[0]);
  const bannerData = [
    {
      id: 1,
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhg8TwksDw03khK8X87Tgs7AfWNPsGMYQbRA&s",
      link: "/event1",
    },
    {
      id: 2,
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-m1vO2RqDgqbJeXENiXMBzdnbestw-JQBkw&s",
      link: "/event2",
    },
    { id: 3, imgUrl: "https://example.com/banner3.png", link: "/event3" },
  ];
  const RecentMentoringData = [
    { id: 1, title: "React 기초 마스터", lecturer: "김철수" },
    { id: 2, title: "UI/UX 디자인 입문", lecturer: "이영희" },
    { id: 3, title: "Node.js 백엔드 구축", lecturer: "박지성" },
    { id: 4, title: "프론트엔드 포트폴리오", lecturer: "최유리" },
    { id: 5, title: "데이터 구조와 알고리즘", lecturer: "홍길동" }, // 5번째 데이터
  ];
  const PopularMentoringData = [
    { id: 1, title: "React 기초 마스터", lecturer: "김철수" },
    { id: 2, title: "UI/UX 디자인 입문", lecturer: "이영희" },
    { id: 3, title: "Node.js 백엔드 구축", lecturer: "박지성" },
    { id: 4, title: "프론트엔드 포트폴리오", lecturer: "최유리" },
    { id: 5, title: "데이터 구조와 알고리즘", lecturer: "홍길동" }, // 5번째 데이터
  ];
  return (
    <>
      <Container>
        <StyledSwiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          slidesPerView={"auto"}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={bannerData.length > 1}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {bannerData.map(banner => (
            <SwiperSlide key={banner.id}>
              {/* 배너 컴포넌트에 이미지 URL을 전달하거나 직접 img 태그 사용 */}
              <Banner
                style={{
                  background: `url(${banner.imgUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              />
            </SwiperSlide>
          ))}
        </StyledSwiper>
        <RecentMentoring>
          <RecentMentoringTitleContainer>
            <Title>내 최근 멘토링</Title>
            <ViewAll>
              전체보기
              <img src={Rarrow} alt="arrow-right" />
            </ViewAll>
          </RecentMentoringTitleContainer>
          <MentoringContent>
            {RecentMentoringData.length > 0 ? (
              RecentMentoringData.slice(0, 4).map(item => (
                <MentoringCard key={item.id} title={item.title} lecturer={item.lecturer} />
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
          </MentoringContent>
        </RecentMentoring>
        <MoreMentoringContainer>
          <Popular>
            <PopularTitleContainer>
              <PopularTitle>
                <Title>인기 클래스</Title>
                <SubTitle>현재 이음에서 가장 인기있는 클래스를 한 눈에 알아보세요</SubTitle>
              </PopularTitle>
              <ViewAll>
                전체보기
                <img src={Rarrow} alt="arrow-right" />
              </ViewAll>
            </PopularTitleContainer>
            <PopularMentoringContent>
              {PopularMentoringData.length > 0 ? (
                <>
                  <MentoringContent>
                    {PopularMentoringData.slice(0, 4).map(item => (
                      <MentoringCard key={item.id} title={item.title} lecturer={item.lecturer} />
                    ))}
                  </MentoringContent>
                  {PopularMentoringData.length > 4 && (
                    <MentoringContent>
                      {PopularMentoringData.slice(4, 8).map(item => (
                        <MentoringCard key={item.id} title={item.title} lecturer={item.lecturer} />
                      ))}
                    </MentoringContent>
                  )}
                </>
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
                </RecentMentoringEmpty>
              )}
            </PopularMentoringContent>
          </Popular>
        </MoreMentoringContainer>
        <Popular style={{ width: "69.5rem" }}>
          <PopularCommunityContent>
            <div
              style={{
                width: "22.5rem",
                height: "13.9375rem",
                flexShrink: 0,
                borderRadius: "var(--S, 0.75rem)",
                background: `url(${selectedPost.imgURL})`,
              }}
            ></div>
            <PreviewPopularPostContent>
              <img src={Post_tag} alt="Post_tag" />
              <p
                style={{
                  color: "#000",
                  fontFamily: "Pretendard",
                  fontSize: "1.25rem",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.5rem",
                }}
              >
                {selectedPost.title}
              </p>
              <p
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  alignSelf: "stretch",
                  overflow: "hidden",
                  color: "var(--Text-text-muted, #64748B)",
                  textOverflow: "ellipsis",
                  fontFamily: "Pretendard",
                  fontSize: "1.125rem",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.5rem",
                }}
              >
                {selectedPost.content}
              </p>
              <PreviewPopularPostInfo>
                <p
                  style={{
                    color: "var(--text-muted, #64748B)",
                    fontFamily: "Pretendard",
                    fontSize: "1.125rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "1.5rem",
                  }}
                >
                  {selectedPost.author}
                </p>
                <p
                  style={{
                    color: "var(--text-muted, #64748B)",
                    fontFamily: "Pretendard",
                    fontSize: "1.125rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "1.5rem",
                  }}
                >
                  ·
                </p>
                <p
                  style={{
                    color: "var(--text-muted, #64748B)",
                    fontFamily: "Pretendard",
                    fontSize: "1.125rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "1.5rem",
                  }}
                >
                  {selectedPost.date}
                </p>
              </PreviewPopularPostInfo>
            </PreviewPopularPostContent>
            <PostButtonContainer>
              {DUMMY_POSTS.slice(0, 3).map(post => (
                <PostButtonWrapper key={post.id} onClick={() => setSelectedPost(post)}>
                  <PostButtonContent>
                    <PostButtonText>
                      <PostTitle>{post.title}</PostTitle>
                      <PostAuthor>{post.author}</PostAuthor>
                    </PostButtonText>
                    <img src={Rarrow_natural} alt="arrow-right" />
                  </PostButtonContent>
                </PostButtonWrapper>
              ))}
            </PostButtonContainer>
          </PopularCommunityContent>
        </Popular>
      </Container>
      <NotificationContainer>
        <NotificationName>공지사항</NotificationName>
        <NotificationContentContainer>
          {DUMMY_NOTICES.map(notice => (
            <NotificationContent>
              <NotificationTitle>{notice.title}</NotificationTitle>
              <img src={Rarrow_natural} alt="arrow-right" />
            </NotificationContent>
          ))}
        </NotificationContentContainer>
      </NotificationContainer>
    </>
  );
}
