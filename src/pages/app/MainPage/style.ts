import styled from "@emotion/styled";
import { Swiper } from "swiper/react";

export const Banner = styled.div`
  width: 69.5rem;
  height: 24.5rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--natural-200, #e7ebee);
  margin-bottom: 2rem;
`;
export const Container = styled.div`
  display: flex;
  width: 75.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6.25rem;
  margin: 0 auto;
  margin-top: 2.75rem;
  margin-bottom: 9rem;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6.25rem;
`;

export const RecentMentoringEmpty = styled.div`
  display: flex;
  width: 69.5rem;
  height: 14.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: var(--S, 0.75rem);
  background: var(--Natural-natural-100, #F7F9FA);
`;
export const RecentMentoring = styled.div`
  /*최근 멘토링 가장 큰 틀*/
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
`;
export const RecentMentoringTitleContainer = styled.div`
  /*최근 멘토링 제목 틀*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
export const MentoringContent = styled.div`
  /*내용 틀 (최근,인기 공통)*/
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

export const Popular = styled.div`
  /*인기 멘토링/커뮤니티 가장 큰 틀*/
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
`;
export const PopularTitleContainer = styled.div`
  /*인기 멘토링/커뮤니티 제목 틀*/
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;
export const PopularMentoringContent = styled.div`
  /*인기 멘토링 글 목록 2줄*/
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  width:69.5rem;
`;
export const PopularTitle = styled.div`
  /*인기 멘토링/커뮤니티 제목 그룹*/
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const MoreMentoringContainer = styled.div`
  /*더보기 땜에 애매해서 넣은 컨테이너*/
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.75rem;
`;

export const PopularCommunityContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3.75rem;
  align-self: stretch;
`;

export const PreviewPopularPost = styled.div`
  display: flex;
  width: 45.0625rem;
  height: 14.0625rem;
  align-items: center;
  gap: 1.75rem;
`;
export const PreviewPopularPostContent = styled.div`
  display: flex;
  width: 20.8125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  flex-shrink: 0;
`;
export const PreviewPopularPostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const PostButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  box-shadow: inset 0 -0.1rem 0 0 var(--natural-200, #F7F9FA);
`;
export const PostButtonContent = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  transition: 0.3s;
  &:hover {
    background: var(--natural-100, #E7EBEE);
    cursor: pointer;
    transition: 0.3s;
  }

  &:active {
    background: var(--natural-200, #CFD9E0);
  }
`;
export const PostButtonText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1 0 0;
  width : 18.1rem;
  height : 2.69rem;
`;
export const PostTitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  align-self: stretch;
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.02475rem;
`;
export const PostAuthor = styled.p`
  color: var(--Text-text-muted, #64748B);
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.02063rem;
`;
export const PostButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;


export const ViewAll = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-500, #235FFF);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0275rem;
  &:hover{
    cursor: pointer;
  }
`;
export const Title = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.0385rem;
`;
export const SubTitle = styled.p`
color: var(--text-muted, #64748B);
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.0275rem;
`;
export const NotificationContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2.5rem 12.25rem;
  justify-content: space-between;
  align-items: flex-start;
  background: var(--natural-100, #F7F9FA);
  height:14.94rem;
  box-sizing: border-box;
`;
export const NotificationName = styled.div`
  display: flex;
  padding-top: 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: var(--text-primary, #0F172A);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.033rem;
`;
export const NotificationContentContainer = styled.div`
  display: flex;
  width: 58.75rem;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
`;
export const NotificationContent = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  box-shadow: inset 0 -0.1rem 0 0 var(--natural-200, #F7F9FA);
  transition: 0.3s;
  &:hover {
    background: var(--natural-200, #E7EBEE);
    cursor: pointer;
    transition: 0.3s;
  }

  &:active {
    background: var(--natural-300, #CFD9E0);
  }
`;
export const NotificationTitle = styled.p`
  color: var(--Text-text-primary, #0F172A);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.02475rem;
`;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-button-next {
    color: var(--natural-400, #235fff);
    scale: 0.7;
  }
  .swiper-button-prev {
    color: var(--natural-400, #235fff);
    scale: 0.7;
  }

  .swiper-pagination-bullet-active {
    background-color: var(--primary-500, #235fff);
  }
`;
