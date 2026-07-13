import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ClassSummaryAside, CustomCheckbox } from "@/components";
import { useApplicationForm, usePutApplicationForm, useClass } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import type { applicationQuestionInput, QuestionType } from "@/models";

type DraftQuestion = {
  type: QuestionType;
  title: string;
  description: string;
  required: boolean;
  options: string[];
};

const TYPE_LABELS: { value: QuestionType; label: string }[] = [
  { value: "SHORT_TEXT", label: "주관식 단답" },
  { value: "SINGLE_CHOICE", label: "객관식" },
  { value: "LONG_TEXT", label: "주관식 서술" },
];

const emptyQuestion = (): DraftQuestion => ({
  type: "SHORT_TEXT",
  title: "",
  description: "",
  required: false,
  options: [""],
});

export default function ApplicationFormPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classId = Number(searchParams.get("classId"));
  const validClassId = Number.isInteger(classId) && classId > 0;

  const { data: classInfo } = useClass(classId, validClassId);
  const { data: formData } = useApplicationForm(classId, validClassId);
  const { mutateAsync, isPending } = usePutApplicationForm(classId);

  const [questions, setQuestions] = useState<DraftQuestion[]>([emptyQuestion()]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!formData || formData.questions.length === 0) return;
    setQuestions(
      formData.questions.map(q => ({
        type: q.type,
        title: q.title,
        description: q.description ?? "",
        required: q.required ?? false,
        options: q.options && q.options.length > 0 ? q.options : [""],
      })),
    );
  }, [formData]);

  const updateQuestion = (index: number, patch: Partial<DraftQuestion>) => {
    setQuestions(prev => prev.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  };

  const addQuestion = () => setQuestions(prev => [...prev, emptyQuestion()]);
  const removeQuestion = (index: number) => setQuestions(prev => prev.filter((_, i) => i !== index));

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: q.options.map((o, j) => (j === oIndex ? value : o)) } : q,
      ),
    );
  };
  const addOption = (qIndex: number) =>
    setQuestions(prev => prev.map((q, i) => (i === qIndex ? { ...q, options: [...q.options, ""] } : q)));

  const handleSave = async () => {
    if (!validClassId || isPending) return;
    try {
      setErrorMessage("");
      const payload: applicationQuestionInput[] = questions
        .filter(q => q.title.trim().length > 0)
        .map(q => ({
          type: q.type,
          title: q.title.trim(),
          description: q.description.trim() || null,
          required: q.required,
          max_length: q.type === "SHORT_TEXT" ? 200 : q.type === "LONG_TEXT" ? 2000 : null,
          options: q.type === "SINGLE_CHOICE" ? q.options.map(o => o.trim()).filter(Boolean) : null,
        }));
      await mutateAsync({ questions: payload });
      navigate(`/app/mento/detail?classId=${classId}`);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <Page>
      <Layout>
        <Main>
          {questions.map((q, index) => (
            <Card key={index}>
              <CardTop>
                <TypeSelect
                  value={q.type}
                  onChange={e => updateQuestion(index, { type: e.target.value as QuestionType })}
                >
                  {TYPE_LABELS.map(t => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </TypeSelect>
                {questions.length > 1 && (
                  <RemoveButton type="button" onClick={() => removeQuestion(index)} aria-label="질문 삭제">
                    ×
                  </RemoveButton>
                )}
              </CardTop>

              <QuestionNo>{index + 1}. 질문 입력</QuestionNo>
              <LineInput
                placeholder="질문을 입력하세요"
                value={q.title}
                onChange={e => updateQuestion(index, { title: e.target.value })}
              />
              <LineInput
                placeholder="질문 설명 입력"
                value={q.description}
                onChange={e => updateQuestion(index, { description: e.target.value })}
              />

              {q.type === "SHORT_TEXT" && <PreviewBox>주관식 단답 답변 입력란</PreviewBox>}
              {q.type === "LONG_TEXT" && <PreviewBox className="tall">주관식 서술 답변 입력란</PreviewBox>}
              {q.type === "SINGLE_CHOICE" && (
                <Options>
                  {q.options.map((option, oIndex) => (
                    <OptionRow key={oIndex}>
                      <RadioMark />
                      <OptionInput
                        placeholder="항목 입력"
                        value={option}
                        onChange={e => updateOption(index, oIndex, e.target.value)}
                      />
                    </OptionRow>
                  ))}
                  <AddOptionRow type="button" onClick={() => addOption(index)}>
                    <RadioMark />
                    <AddOptionText>항목 추가하기</AddOptionText>
                  </AddOptionRow>
                </Options>
              )}

              <RequiredRow>
                <CustomCheckbox
                  checked={q.required}
                  size={1.25}
                  onChange={() => updateQuestion(index, { required: !q.required })}
                />
                <span>필수 답변</span>
              </RequiredRow>
            </Card>
          ))}

          <AddQuestionButton type="button" onClick={addQuestion} aria-label="질문 추가">
            +
          </AddQuestionButton>
          {errorMessage && <StatusText>{errorMessage}</StatusText>}
        </Main>

        <Aside>
          <ClassSummaryAside
            mentorName={classInfo?.mentor?.nickname ?? "멘토"}
            title={classInfo?.title ?? "클래스 제목"}
            difficulty={classInfo?.difficulty ?? 0}
            buttonLabel={isPending ? "저장 중..." : "신청글 저장하기"}
            disabled={isPending}
            onButtonClick={handleSave}
          >
            <SkipLink type="button" onClick={() => navigate(`/app/mento/detail?classId=${classId}`)}>
              건너뛰기
            </SkipLink>
          </ClassSummaryAside>
        </Aside>
      </Layout>
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

const Layout = styled.div`
  display: flex;
  gap: 2.5rem;
  width: 100%;
  max-width: 80rem;
  align-items: flex-start;
`;

const Main = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-200);
  background: var(--white);
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TypeSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-primary);
`;

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text-muted);
  cursor: pointer;
`;

const QuestionNo = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const LineInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: 1px solid var(--natural-200);
  background: var(--natural-100);
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }
`;

const PreviewBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  border: 1px dashed var(--natural-300);
  background: var(--natural-100);
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-muted);

  &.tall {
    min-height: 6rem;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: 1px solid var(--natural-200);
  background: var(--natural-100);
  cursor: text;
`;

const RadioMark = styled.span`
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 2px solid var(--natural-400);
`;

const AddOptionRow = styled.button`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: 1px solid var(--natural-200);
  background: var(--natural-100);
  cursor: pointer;
`;

const OptionInput = styled.input`
  flex: 1 0 0;
  border: none;
  background: transparent;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }
  &:focus {
    outline: none;
  }
`;

const AddOptionText = styled.span`
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-muted);
`;

const RequiredRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-secondary);
`;

const AddQuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 1px solid var(--natural-300);
  background: var(--natural-100);
  font-size: 1.5rem;
  color: var(--text-muted);
  cursor: pointer;
`;

const Aside = styled.div`
  width: 24rem;
  flex-shrink: 0;
`;

const StatusText = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-muted);
`;

const SkipLink = styled.button`
  align-self: center;
  border: none;
  background: transparent;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-muted);
  text-decoration: underline;
  cursor: pointer;
`;
