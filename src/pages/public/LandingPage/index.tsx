import { useOutletContext } from "react-router-dom";
import type { PageType } from "@/types/Page";
import { useEffect } from "react";
import {
  Row,
  Stack,
  Text,
  Button,
  HeaderContainer,
  HeaderImg,
  FeatureContainer,
  FeatureCard,
} from "./style";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function LandingPage() {
  const setPageType = useOutletContext<PageTypeSetter>();

  useEffect(() => {
    setPageType("landing");
  }, [setPageType]);

  function Header() {
    return (
      <HeaderContainer>
        <Stack gap='28px' align="flex-start">
          <Stack gap='8px' align="flex-start">
            <Text color="primary" size='title' weight='semibold'> 작은 만남이 큰 경험으로 </Text>
            <Row gap='4px' align='center'>
              <Text color="disabled" size='text' weight='regular'> 지식을 나누고 경험을 이어가는 멘토링 커뮤니티 플랫폼 </Text>
              <Text color="highlight" size='text' weight='semibold'> 이음 </Text>
            </Row>
          </Stack>
          <Button> 시작하기 </Button>
        </Stack>
        <HeaderImg>
          <img src="/LandingBackground.png" width={"540px"} />
        </HeaderImg>
      </HeaderContainer>
    );
  }

  function Feature() {
    interface CardProps {
      title: String;
      description: String;
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

  return (
    <>
      <Header />
      <Feature />
    </>
  );
}

export default LandingPage;
