import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { MarkdownView } from "@/components";
import { invitePOST } from "@/apis/class";
import { useCreateClass } from "@/hooks";
import { getErrorMessage } from "@/lib/error";

type ToolAction = { label: string; snippet: string; wrap?: boolean };

const TOOLS: ToolAction[] = [
  { label: "H1", snippet: "# " },
  { label: "H2", snippet: "## " },
  { label: "H3", snippet: "### " },
  { label: "H4", snippet: "#### " },
  { label: "B", snippet: "**", wrap: true },
  { label: "I", snippet: "*", wrap: true },
  { label: "❝", snippet: "> " },
  { label: "🔗", snippet: "[텍스트](https://)" },
  { label: "🖼", snippet: "![대체텍스트](https://)" },
];

export default function CreateRecruitmentFormPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateClass();
  const guideRef = useRef<HTMLTextAreaElement | null>(null);

  const [title, setTitle] = useState("");
  const [mentorIntro, setMentorIntro] = useState("");
  const [guide, setGuide] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = useMemo(() => title.trim().length > 0 && guide.trim().length > 0, [title, guide]);

  const applyTool = (tool: ToolAction) => {
    const el = guideRef.current;
    if (!el) {
      setGuide(prev => prev + tool.snippet);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = guide.slice(start, end);
    let inserted: string;
    let caret: number;
    if (tool.wrap) {
      inserted = `${tool.snippet}${selected || "텍스트"}${tool.snippet}`;
      caret = start + inserted.length;
    } else {
      inserted = `${tool.snippet}${selected}`;
      caret = start + inserted.length;
    }
    const next = guide.slice(0, start) + inserted + guide.slice(end);
    setGuide(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(caret, caret);
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit || isPending) return;
    try {
      setErrorMessage("");
      const created = await mutateAsync({
        title: title.trim(),
        mentor_introduction: mentorIntro.trim() || null,
        guide: guide.trim(),
        difficulty,
        access_scope: "PUBLIC",
      });
      // 클래스 생성과 동시에 고유 초대코드 발급
      try {
        await invitePOST.createInviteCode(created.id);
      } catch {
        // 초대코드 발급 실패는 흐름을 막지 않음
      }
      // 작성 직후 지원서 폼 설정으로 이동(선택). 건너뛰면 모집글 상세로 갈 수 있음.
      navigate(`/app/class/application?classId=${created.id}`);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <Page>
      <Content>
        <PageTitle>모집글 생성하기</PageTitle>

        <Field>
          <FieldHead>
            <FieldLabel>모집글 제목</FieldLabel>
            <FieldHint>자신의 클래스 모집 문구를 간단히 작성하세요</FieldHint>
          </FieldHead>
          <TextInput placeholder="모집글 제목" value={title} onChange={e => setTitle(e.target.value)} />
        </Field>

        <Field>
          <FieldHead>
            <FieldLabel>멘토 소개</FieldLabel>
            <FieldHint>멘티들에게 자신이 어떤 멘토인지 소개하세요</FieldHint>
          </FieldHead>
          <Textarea
            className="short"
            placeholder="멘토 소개"
            value={mentorIntro}
            onChange={e => setMentorIntro(e.target.value)}
          />
        </Field>

        <Field>
          <FieldHead>
            <FieldLabel>멘토링 안내</FieldLabel>
            <FieldHint>멘토링 관련 설명할 내용을 마크다운 언어로 작성하세요</FieldHint>
          </FieldHead>

          <EditorTop>
            <LevelRow>
              <LevelLabel>
                <span className="star">*</span> 난이도 설정
              </LevelLabel>
              <Dots>
                {[1, 2, 3, 4, 5].map(v => (
                  <Dot key={v} type="button" active={difficulty >= v} onClick={() => setDifficulty(v)} aria-label={`난이도 ${v}`} />
                ))}
              </Dots>
            </LevelRow>
            <TopButtons>
              <GhostButton type="button" onClick={() => setShowPreview(p => !p)}>
                {showPreview ? "편집하기" : "미리보기"}
              </GhostButton>
              <PrimaryButton type="button" activate={canSubmit} disabled={!canSubmit || isPending} onClick={handleSubmit}>
                {isPending ? "올리는 중..." : "글 올리기"}
              </PrimaryButton>
            </TopButtons>
          </EditorTop>

          <EditorFrame>
            {!showPreview && (
              <Toolbar>
                {TOOLS.map(tool => (
                  <ToolButton key={tool.label} type="button" onClick={() => applyTool(tool)}>
                    {tool.label}
                  </ToolButton>
                ))}
              </Toolbar>
            )}
            {showPreview ? (
              <PreviewArea>
                {guide.trim() ? <MarkdownView>{guide}</MarkdownView> : <Placeholder>미리볼 내용이 없어요</Placeholder>}
              </PreviewArea>
            ) : (
              <GuideTextarea
                ref={guideRef}
                placeholder={"## 멘토링 안내\n### 멘토링 기간\n2026.02.01 ~ 2026.03.02"}
                value={guide}
                onChange={e => setGuide(e.target.value)}
              />
            )}
          </EditorFrame>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </Field>
      </Content>
    </Page>
  );
}

/* ── styles ─────────────────────────────────────────────── */

const Page = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 3rem 5rem 5rem;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  width: 100%;
  max-width: 80rem;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.875rem;
  font-weight: 500;
  line-height: 1.3;
  color: #1d1d1d;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const FieldHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 1.3;
  color: #1d1d1d;
`;

const FieldHint = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.3;
  color: var(--text-muted);
`;

const TextInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  font-family: Pretendard;
  font-size: 1.125rem;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 6rem;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  resize: none;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  font-family: Pretendard;
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const EditorTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LevelRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const LevelLabel = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.125rem;
  color: var(--text-muted);

  .star {
    color: var(--primary-500);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 0.375rem;
  align-items: center;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${({ active }) => (active ? "var(--primary-400)" : "var(--natural-300)")};
`;

const TopButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const GhostButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--natural-100);
  color: var(--text-secondary);
  font-family: Pretendard;
  font-size: 1rem;
  cursor: pointer;
`;

const PrimaryButton = styled.button<{ activate: boolean }>`
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.75rem;
  font-family: Pretendard;
  font-size: 1rem;
  cursor: pointer;
  background: ${({ activate }) => (activate ? "var(--primary-500)" : "var(--natural-300)")};
  color: ${({ activate }) => (activate ? "var(--white)" : "var(--text-muted)")};
`;

const EditorFrame = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--natural-200);
  background: var(--natural-100);
`;

const ToolButton = styled.button`
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--text-secondary);
  font-family: Pretendard;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background: var(--natural-200);
  }
`;

const GuideTextarea = styled.textarea`
  width: 100%;
  min-height: 18rem;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  resize: vertical;
  border: none;
  background: var(--white);
  font-family: Pretendard;
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }
  &:focus {
    outline: none;
  }
`;

const PreviewArea = styled.div`
  min-height: 18rem;
  padding: 1rem 1.5rem;
  background: var(--white);
`;

const Placeholder = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.125rem;
  color: var(--text-muted);
`;

const ErrorText = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--utility-error);
`;
