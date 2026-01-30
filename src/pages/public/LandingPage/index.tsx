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
  MentoContainer,
  MentoCard,
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

  function Mento() {
    interface CardProps {
      role: string,
      name: string,
      comment: string,
    }
    
    function Card({ role, name, comment }: CardProps) {
      return (
        <MentoCard>
          <Row gap='8px' align='center'>
            <Text color='highlight' size='caption' weight='regular'> {role} </Text>
            <Text color='primary' size='caption' weight='regular'> {name} </Text>
          </Row>
          <Text color='primary' size='caption' weight='regular'> {comment} </Text>
        </MentoCard>
      );
    }

    return (
      <MentoContainer>
        <Stack gap='4px' align='center'>          
          <Text color='primary' size='subtitle' weight='semibold'> 어떻게 시작해야 할지 막막한 전공 공부, </Text>
          <Row gap='4px' align='center'>
            <Text color='primary' size='subtitle' weight='semibold'> 이제 </Text>
            <Text color='highlight' size='subtitle' weight='semibold'> 멘토와 함께 </Text>
            <Text color='primary' size='subtitle' weight='semibold'> 하세요 </Text>
          </Row>
        </Stack>
        <Stack gap='20px' align='center'>
          <Row gap='20px' align='center'>
            <Card role='멘토' name='윤미수' comment='디자인 잘 하고 싶은 친구들에게, 디자인부터 프론트까지 알려줄게요!' />
            <Card role='멘토' name='권길현' comment='많은 후배들과 친해지고 싶어요! 열심히 하고자 하는 친구들을 원해요' />
            <Card role='멘토' name='김태훈' comment='풀스택 개발자가 되고 싶은 1학년 친구들을 위한 멘토링 클래스' />
            {/* <Card role='멘토' name='윤미수' comment='디자인 잘 하고 싶은 친구들에게, 디자인부터 프론트까지 알려줄게요!' /> */}
          </Row>
          <Row gap='20px' align='center'>
            <Card role='멘티' name='윤미수' comment='디자인 잘 하고 싶은 친구들에게, 디자인부터 프론트까지 알려줄게요!' />
            <Card role='멘티' name='진수화' comment='나태한 후배에게 다정하고 친절하고 착하고 자세하고 쉽게 알려줄 멘토 선배님이 필요해요' />
            <Card role='멘티' name='이소리' comment='노베이스로 입학해서 프로그래밍 공부를 어떻게 해야 할지 갈피를 못잡겠어요' />
            <Card role='멘티' name='김아리' comment='강제성이 있어야 하는 편이라서 이끌어줄 선배님이 필요해요' />
          </Row>
        </Stack>
      </MentoContainer>
    );
  }

  return (
    <>
      <Header />
      <Feature />
      <Mento />
    </>
  );
}

export default LandingPage;
