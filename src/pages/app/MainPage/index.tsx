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
} from "./styles";
import { SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import Rarrow from "@/assets/AllViewRarrow_primary-500.svg";
import Rarrow_natural from "@/assets/Rarrow_natural-400.svg";
import Post_tag from "@/assets/Post_tag.svg";
import { MentoringCard, FindClassButton } from "@/components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyClasses, useClassSearch } from "@/hooks";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useGlobalStyle } from "@/stores/useStyle";

export default function MainPage() {
  const navigate = useNavigate();
  const setFooterColor = useGlobalStyle(state => state.setFooterColor);
  useEffect(() => {
    setFooterColor("white");
  }, [setFooterColor]);

  // 내 최근 멘토링 / 인기 클래스 → 실제 API(classes)
  const { data: myClasses } = useMyClasses();
  const { data: popularClasses } = useClassSearch({ sort: "popular" });

  const RecentMentoringData = myClasses?.items ?? [];
  const PopularMentoringData = popularClasses?.items ?? [];

  // out-of-MVP 게시글/공지/배너: 전용 API 미제공 -> 빈 상태
  type CommunityPost = {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    imgURL: string;
  };
  const communityPosts: CommunityPost[] = [];
  const notices: { id: number; title: string; date: string }[] = [];
  const bannerData: { id: number; imgUrl: string; link: string }[] = [];
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(communityPosts[0] ?? null);
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
                <MentoringCard
                  key={item.id}
                  title={item.title}
                  lecturer={item.mentor?.nickname ?? ""}
                  onClick={() => navigate(`/app/class/detail?classId=${item.id}`)}
                />
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
                      <MentoringCard
                  key={item.id}
                  title={item.title}
                  lecturer={item.mentor?.nickname ?? ""}
                  onClick={() => navigate(`/app/class/detail?classId=${item.id}`)}
                />
                    ))}
                  </MentoringContent>
                  {PopularMentoringData.length > 4 && (
                    <MentoringContent>
                      {PopularMentoringData.slice(4, 8).map(item => (
                        <MentoringCard
                  key={item.id}
                  title={item.title}
                  lecturer={item.mentor?.nickname ?? ""}
                  onClick={() => navigate(`/app/class/detail?classId=${item.id}`)}
                />
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
          {selectedPost && (
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
              {communityPosts.slice(0, 3).map(post => (
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
          )}
        </Popular>
      </Container>
      <NotificationContainer>
        <NotificationName>공지사항</NotificationName>
        <NotificationContentContainer>
          {notices.map(notice => (
            <NotificationContent key={notice.id}>
              <NotificationTitle>{notice.title}</NotificationTitle>
              <img src={Rarrow_natural} alt="arrow-right" />
            </NotificationContent>
          ))}
        </NotificationContentContainer>
      </NotificationContainer>
    </>
  );
}
