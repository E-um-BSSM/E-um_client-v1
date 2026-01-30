import { useState, useEffect, useRef } from "react";
import {
  Row,
  Stack,
  Text,
  Button,
  MainContainer,
  MainImg,
  FeatureContainer,
  FeatureCard,
  TogetherContainer,
  TogetherCard,
  ConnectContainer,
  ConnectImg,
  Container,
  ConnectWrapper,
  TogetherCardLeft,
  TogetherCardWrapper,
  TogetherCardRight,
} from "./style";
import { Footer } from "@/components/layout/public";
import type { PageType } from "@/types/Page";
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function LandingPage() {
  const setPageType = useOutletContext<PageTypeSetter>();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = useNavigate();
  const isScrolling = useRef(false);

  useEffect(() => {
    setPageType("landing");
  }, [setPageType]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 10) return;
      isScrolling.current = true;

      if (e.deltaY > 0) {
        setCurrentSection(prev => (prev >= 3 ? 3 : prev + 1));
      } else {
        setCurrentSection(prev => (prev <= 0 ? 0 : prev - 1));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const hashMap = ['#MAIN', '#FEATURE', '#TOGETHER', '#CONNECT'];
    
    containerRef.current.scrollTo({
      top: window.innerHeight * currentSection,
      behavior: 'smooth'
    });
    
    navigate(hashMap[currentSection], { replace: true });
  }, [currentSection, navigate]);

  useEffect(() => {
    const hashMap: { [key: string]: number } = {
      '#MAIN': 0,
      '#FEATURE': 1,
      '#TOGETHER': 2,
      '#CONNECT': 3,
    };

    const sectionIndex = hashMap[location.hash];
    
    if (sectionIndex !== undefined && sectionIndex !== currentSection) {
      setCurrentSection(sectionIndex);
    }
  }, [location.hash]);

  function MAIN() {
    return (
      <MainContainer>
        <Stack gap='28px' align="flex-start">
          <Stack gap='8px' align="flex-start">
            <Text color="primary" size='title' weight='semibold'> 작은 만남이 큰 경험으로 </Text>
            <Row gap='4px' align='center'>
              <Text color="disabled" size='text' weight='regular'> 지식을 나누고 경험을 이어가는 멘토링 커뮤니티 플랫폼 </Text>
              <Text color="highlight" size='text' weight='semibold'> 이음 </Text>
            </Row>
          </Stack>
          <Button onClick={() => navigate('/auth/login')}> 시작하기 </Button>
        </Stack>
        <MainImg>
          <img src="/Landing/background.png" width={540} alt="이음 랜딩 페이지 메인 배경 이미지"/>
        </MainImg>
      </MainContainer>
    );
  }

  function FEATURE() {
    interface CardProps {
      title: string;
      description: string;
    }

    function Card({ title, description }: CardProps) {
      return (
        <Stack gap='12px' align='center'>
          <Text color='muted' size='text' weight='regular'> {title} </Text>
          <FeatureCard> {description} </FeatureCard>
        </Stack>
      );
    }

    return (
      <FeatureContainer>
        <Stack gap='12px' align='center'>
          <Text color='muted' size='subtitle' weight='semibold'> 함께 성장하는 이음의 기능 </Text>
          <Text color='muted' size='text' weight='regular'> 멘토와 멘티가 자연스럽게 연결되고, 지식이 공유되는 공간을 만들어갑니다 </Text>
        </Stack>
        <Row gap='20px' align='center'>
          <Card
            title='클래스 개설'
            description='멘토의 다양한 지식을 강의로 나눠요'
          />
          <Card
            title='멘토 - 멘티 연결'
            description='관심 분야로 매칭하여 함께 성장해요'
          />
          <Card
            title='커뮤니티 게시판'
            description='원하는 정보를 쉽게 찾고 문제를 해결해요'
          />
          <Card
            title='리뷰 시스템'
            description='솔직한 후기로 멘토링 과정을 기록해요'
          />
        </Row>
      </FeatureContainer>
    );
  }

  function TOGETHER() {
    interface CardProps {
      role: string,
      name: string,
      comment: string,
    }

    const mentoCardList = [
      {
        role: '멘토',
        name: '윤미수',
        comment: '디자인 잘 하고 싶은 친구들에게, 디자인부터 프론트까지 알려줄게요!',
      },
      {
        role: '멘토',
        name: '권길현',
        comment: '많은 후배들과 친해지고 싶어요! 열심히 하고자 하는 친구들을 원해요',
      },
      {
        role: '멘토',
        name: '김태훈',
        comment: '풀스택 개발자가 되고 싶은 1학년 친구들을 위한 멘토링 클래스',
      },
      {
        role: '멘토',
        name: '김태훈',
        comment: '풀스택 개발자가 되고 싶은 1학년 친구들을 위한 멘토링 클래스',
      },
    ];

    const menteeCardList = [
      {
        role: '멘티',
        name: '윤미수',
        comment: '디자인 잘 하고 싶은 친구들에게, 디자인부터 프론트까지 알려줄게요!'
      },
      {
        role: '멘티',
        name: '홍길동',
        comment: '나태한 후배에게 다정하고 친절하고 착하고 자세하고 쉽게 알려줄 멘토 선배님이 필요해요'
      },
      {
        role: '멘티',
        name: '이소리',
        comment: '노베이스로 입학해서 프로그래밍 공부를 어떻게 해야 할지 갈피를 못잡겠어요'
      },
      {
        role: '멘티',
        name: '김아리',
        comment: '강제성이 있어야 하는 편이라서 이끌어줄 선배님이 필요해요'
      },
    ]
    
    function Card({ role, name, comment }: CardProps) {
      return (
        <TogetherCard>
          <Row gap='8px' align='center'>
            <Text color='highlight' size='caption' weight='regular'> {role} </Text>
            <Text color='primary' size='caption' weight='regular'> {name} </Text>
          </Row>
          <Text color='primary' size='caption' weight='regular'> {comment} </Text>
        </TogetherCard>
      );
    }

    return (
      <TogetherContainer>
        <Stack gap='4px' align='center'>          
          <Text color='primary' size='subtitle' weight='semibold'> 어떻게 시작해야 할지 막막한 전공 공부, </Text>
          <Row gap='4px' align='center'>
            <Text color='primary' size='subtitle' weight='semibold'> 이제 </Text>
            <Text color='highlight' size='subtitle' weight='semibold'> 멘토와 함께 </Text>
            <Text color='primary' size='subtitle' weight='semibold'> 하세요 </Text>
          </Row>
        </Stack>
        <TogetherCardWrapper>
          <TogetherCardRight>
            {mentoCardList.map((item, index) => ( <Card key={`set1-1${index}`} role={item.role} name={item.name} comment={item.comment} /> ))}
            {mentoCardList.map((item, index) => ( <Card key={`set1-2${index}`} role={item.role} name={item.name} comment={item.comment} /> ))}
          </TogetherCardRight>
          <TogetherCardLeft>
            {menteeCardList.map((item, index) => ( <Card key={`set2-1${index}`} role={item.role} name={item.name} comment={item.comment} /> ))}
            {menteeCardList.map((item, index) => ( <Card key={`set2-2${index}`} role={item.role} name={item.name} comment={item.comment} /> ))}
          </TogetherCardLeft>
        </TogetherCardWrapper>
      </TogetherContainer>
    );
  }

  function CONNECT() {
    const defaultPageType: PageType = "landing";
    const pageType = defaultPageType;

    return (
      <ConnectContainer>
        <ConnectWrapper>          
          <Stack gap='12px' align='center'>
            <Text color='muted' size='subtitle' weight='semibold'> 멘티들에게 나만의 지식을 공유하며 </Text>
            <Text color='muted' size='subtitle' weight='semibold'> 새로운 인연을 이어가세요 </Text>
          </Stack>
          <ConnectImg src='/Landing/connect.png' alt="멘토와 멘티가 연결되는 모습을 나타내는 이미지" />
        </ConnectWrapper>
        <Footer type={pageType}/>
      </ConnectContainer>
    )
  }

  return (
    <Container ref={containerRef}>
      <MAIN />
      <FEATURE />
      <TOGETHER />
      <CONNECT />
    </Container>
  );
}

export default LandingPage;
