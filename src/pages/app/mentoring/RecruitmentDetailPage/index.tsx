import { css } from "@emotion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Button } from "@/components/ui/atom";
import {
  Container,
  Inner,
  MainContent,
  Sidebar,
  MentorSection,
  ProfileImage,
  MentorName,
  RecruitmentInfos,
  RecruitmentTitle,
  DifficultySection,
  DifficultyLabel,
  CircleGroup,
  MarkdownWrapper,
} from "./styles";
import DLcircleFull from "@/assets/DLcircle_primary-400.svg";
import DLcircleEmpty from "@/assets/DLcircle_natural-300.svg";
import DefaultProfile from "/eum.png"; // Using existing profile asset

// Mock data for initial implementation
const MOCK_DATA = {
  mentor: {
    name: "권길현",
    profileImage: DefaultProfile,
  },
  title: "기초부터 심화까지,\n신입생들을 위한 C언어 클래스",
  difficulty: 4,
  content: `## 멘토링 안내***

### 멘토링 기간
---
2026.02.01 ~ 2026.03.02

### 멘토링 내용
---
1차시 : C언어 기초
2차시 : 포인터 설명해줌ㅇㅇ`,
};

function RecruitmentDetailPage() {
  const { mentor, title, difficulty, content } = MOCK_DATA;

  return (
    <Container>
      <Inner>
        <MainContent>
          <MarkdownWrapper>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {content}
            </ReactMarkdown>
          </MarkdownWrapper>
        </MainContent>

        <Sidebar>
          <RecruitmentInfos>
            <MentorSection>
              <ProfileImage src={mentor.profileImage} alt={mentor.name} />
              <MentorName>{mentor.name}</MentorName>
            </MentorSection>

            <RecruitmentTitle>
              {title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </RecruitmentTitle>
          </RecruitmentInfos>

          <DifficultySection>
            <DifficultyLabel>난이도</DifficultyLabel>
            <CircleGroup>
              {[1, 2, 3, 4, 5].map(level => (
                <img
                  key={level}
                  src={level <= difficulty ? DLcircleFull : DLcircleEmpty}
                  alt={`difficulty-${level}`}
                  width={18}
                  height={18}
                />
              ))}
            </CircleGroup>
          </DifficultySection>

          <Button
            activate={true}
            customStyle={css`
              width: 100%;
              height: 3.75rem;
              border-radius: 0.75rem;
              font-size: 1.125rem;
              font-weight: 500;
              margin-top: 0.5rem;
            `}
          >
            멘토링 신청하기
          </Button>
        </Sidebar>
      </Inner>
    </Container>
  );
}

export default RecruitmentDetailPage;
