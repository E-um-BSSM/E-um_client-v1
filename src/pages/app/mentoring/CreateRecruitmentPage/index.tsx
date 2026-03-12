import { useState, useRef } from "react";
import { css } from "@emotion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Input, Button } from "@/components/ui/atom";
import {
  Container,
  Inner,
  PageTitle,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDesc,
  MarkdownToolbar,
  ToolbarTools,
  ToolbarGroup,
  ToolButton,
  RightButtons,
  Textarea,
  PreviewContainer,
} from "./styles";
import DLcircleFull from "@/assets/DLcircle_primary-400.svg";
import DLcircleEmpty from "@/assets/DLcircle_natural-300.svg";

const DEFAULT_MENTORING_INFO = `## 멘토링 안내***

### 멘토링 기간
---
2026.02.01 ~ 2026.03.02

### 멘토링 내용
---
1일차 : C언어 기초
2일차 : 포인터 설명해줌ㅇㅇ

### 멘토링 커리큘럼
---`;

function CreateRecruitmentPage() {
  const [title, setTitle] = useState("");
  const [mentorIntro, setMentorIntro] = useState("");
  const [mentoringInfo, setMentoringInfo] = useState(DEFAULT_MENTORING_INFO);
  const [difficulty, setDifficulty] = useState(1);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDifficultyClick = (level: number) => {
    setDifficulty(level);
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const insertMarkdown = (symbol: string, type: "block" | "inline" | "wrap" = "block") => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = mentoringInfo;

    let before = text.substring(0, start);
    let selected = text.substring(start, end);
    let after = text.substring(end);

    let newText = "";
    let newCursorPos = start;

    if (type === "block") {
      // Find start of the current line
      const lineStart = before.lastIndexOf("\n") + 1;
      before = text.substring(0, lineStart);
      selected = text.substring(lineStart, end);
      newText = before + symbol + selected + after;
      newCursorPos = end + symbol.length;
    } else if (type === "wrap") {
      newText = before + symbol + selected + symbol + after;
      newCursorPos = end + symbol.length;
    } else if (type === "inline") {
      newText = before + symbol + selected + after;
      newCursorPos = end + symbol.length;
    }

    setMentoringInfo(newText);

    // Focus back and set cursor position in next tick
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const isFormValid = title.trim() !== "" && mentorIntro.trim() !== "" && mentoringInfo.trim() !== "";

  return (
    <Container>
      <Inner>
        <PageTitle>모집글 생성하기</PageTitle>

        <Section>
          <SectionHeader>
            <SectionTitle>모집글 제목</SectionTitle>
            <SectionDesc>자신의 클래스 모집 문구를 간단히 작성하세요</SectionDesc>
          </SectionHeader>
          <Input placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>멘토 소개</SectionTitle>
            <SectionDesc>멘티들에게 자신이 어떤 멘토인지 소개하세요</SectionDesc>
          </SectionHeader>
          <Input placeholder="소개글을 입력하세요" value={mentorIntro} onChange={e => setMentorIntro(e.target.value)} />
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>멘토링 안내</SectionTitle>
            <SectionDesc>멘토링 관련 설명할 내용을 마크다운 언어로 작성하세요</SectionDesc>
          </SectionHeader>

          <MarkdownToolbar>
            <ToolbarTools>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "#64748B", fontSize: "1.125rem", fontWeight: 400 }}>
                  <span style={{ color: "var(--primary-500)", fontWeight: 600 }}>*</span> 난이도 설정
                </span>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  {[1, 2, 3, 4, 5].map(level => (
                    <img
                      key={level}
                      src={level <= difficulty ? DLcircleFull : DLcircleEmpty}
                      alt={`difficulty-${level}`}
                      width={20}
                      height={20}
                      onClick={() => handleDifficultyClick(level)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <ToolbarGroup>
                  <ToolButton onClick={() => insertMarkdown("# ")}>H1</ToolButton>
                  <ToolButton onClick={() => insertMarkdown("## ")}>H2</ToolButton>
                  <ToolButton onClick={() => insertMarkdown("### ")}>H3</ToolButton>
                  <ToolButton onClick={() => insertMarkdown("#### ")}>H4</ToolButton>
                </ToolbarGroup>
                <ToolbarGroup>
                  <ToolButton onClick={() => insertMarkdown("**", "wrap")} style={{ fontWeight: 700 }}>
                    B
                  </ToolButton>
                  <ToolButton onClick={() => insertMarkdown("_", "wrap")} style={{ fontWeight: 500 }}>
                    /
                  </ToolButton>
                  <ToolButton onClick={() => insertMarkdown("> ")} style={{ fontSize: "1.25rem" }}>
                    “
                  </ToolButton>
                </ToolbarGroup>
                <ToolbarGroup>
                  <ToolButton onClick={() => insertMarkdown("[]()", "inline")}>
                    <span style={{ fontSize: "1.25rem" }}>🔗</span>
                  </ToolButton>
                  <ToolButton onClick={() => insertMarkdown("![]()", "inline")}>
                    <span style={{ fontSize: "1.25rem" }}>📤</span>
                  </ToolButton>
                </ToolbarGroup>
              </div>
            </ToolbarTools>
            <RightButtons>
              <Button
                activate={isPreview}
                onClick={togglePreview}
                customStyle={css`
                  width: auto;
                  height: 3rem;
                  padding: 0 2.5rem;
                  border-radius: 0.5rem;
                  background-color: ${isPreview ? "var(--primary-900)" : "#d1d5db"};
                  color: ${isPreview ? "var(--white)" : "#4b5563"};
                  font-size: 1.125rem;
                  &:hover {
                    background-color: ${isPreview ? "var(--primary-700)" : "#9ca3af"};
                  }
                `}
              >
                미리보기
              </Button>
              <Button
                activate={isFormValid}
                customStyle={css`
                  width: auto;
                  height: 3rem;
                  padding: 0 2.5rem;
                  border-radius: 0.5rem;
                  font-size: 1.125rem;
                `}
              >
                글 올리기
              </Button>
            </RightButtons>
          </MarkdownToolbar>

          {isPreview ? (
            <PreviewContainer>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {mentoringInfo}
              </ReactMarkdown>
            </PreviewContainer>
          ) : (
            <Textarea
              ref={textareaRef}
              placeholder="내용을 입력하세요..."
              value={mentoringInfo}
              onChange={e => setMentoringInfo(e.target.value)}
            />
          )}
        </Section>
      </Inner>
    </Container>
  );
}

export default CreateRecruitmentPage;
