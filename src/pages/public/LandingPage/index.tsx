import { useOutletContext } from "react-router-dom";
import type { PageType } from "@/types/Page";
import { useEffect } from "react";
import {
  Row,
  Stack,
  Title,
  Text,
  Button,
  HeaderContainer,
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
        <Stack gap='20px' align="flex-start">
          <Stack gap='8px' align="flex-start">
            <Title> 작은 만남이 큰 경험으로 </Title>
            <Row gap='4px' align='center'>
              <Text color="muted" weight='regular'> 지식을 나누고 경험을 이어가는 멘토링 커뮤니티 플랫폼 </Text>
              <Text color="highlight" weight='semibold'> 이음 </Text>
            </Row>
          </Stack>
          <Button> 시작하기 </Button>
        </Stack>
      </HeaderContainer>
    );
  }

  return (
    <>
      <Header />
    </>
  );
}

export default LandingPage;
