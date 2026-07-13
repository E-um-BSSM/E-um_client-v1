import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ClassSummaryAside } from "@/components";
import { useApplicationForm, useApplyToClass, useClass } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import type { applicationAnswer } from "@/models";

export default function ApplyClassPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classId = Number(searchParams.get("classId"));
  const validClassId = Number.isInteger(classId) && classId > 0;

  const { data: classInfo } = useClass(classId, validClassId);
  const { data: formData } = useApplicationForm(classId, validClassId);
  const { mutateAsync, isPending } = useApplyToClass(classId);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const questions = formData?.questions ?? [];

  const setAnswer = (questionId: number, value: string) =>
    setAnswers(prev => ({ ...prev, [questionId]: value }));

  const canSubmit = useMemo(
    () => questions.every(q => !q.required || (answers[q.id]?.trim().length ?? 0) > 0),
    [questions, answers],
  );

  const handleConfirmApply = async () => {
    if (!validClassId || isPending || !canSubmit) return;
    try {
      setErrorMessage("");
      const payload: applicationAnswer[] = questions.map(q => ({
        question_id: q.id,
        value: answers[q.id]?.trim() || null,
      }));
      await mutateAsync({ answers: payload });
      setShowConfirm(false);
      navigate("/app");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <Page>
      <Layout>
        <Main>
          {questions.length === 0 ? (
            <EmptyText>등록된 지원서 질문이 없어요</EmptyText>
          ) : (
            questions.map((q, index) => (
              <Card key={q.id}>
                <QuestionTitle>
                  {index + 1}. {q.title}
                  {q.required && <span className="req">*</span>}
                </QuestionTitle>
                {q.description && <QuestionDesc>{q.description}</QuestionDesc>}

                {q.type === "SHORT_TEXT" && (
                  <LineInput
                    maxLength={q.max_length ?? 200}
                    placeholder="답변을 입력하세요"
                    value={answers[q.id] ?? ""}
                    onChange={e => setAnswer(q.id, e.target.value)}
                  />
                )}
                {q.type === "LONG_TEXT" && (
                  <Textarea
                    maxLength={q.max_length ?? 2000}
                    placeholder="답변을 입력하세요"
                    value={answers[q.id] ?? ""}
                    onChange={e => setAnswer(q.id, e.target.value)}
                  />
                )}
                {q.type === "SINGLE_CHOICE" && (
                  <Options>
                    {(q.options ?? []).map(option => {
                      const selected = answers[q.id] === option;
                      return (
                        <OptionRow key={option} type="button" selected={selected} onClick={() => setAnswer(q.id, option)}>
                          <RadioMark selected={selected} />
                          <span>{option}</span>
                        </OptionRow>
                      );
                    })}
                  </Options>
                )}
              </Card>
            ))
          )}
          {errorMessage && <StatusText>{errorMessage}</StatusText>}
        </Main>

        <Aside>
          <ClassSummaryAside
            mentorName={classInfo?.mentor?.nickname ?? "멘토"}
            title={classInfo?.title ?? "클래스 제목"}
            difficulty={classInfo?.difficulty ?? 0}
            buttonLabel="멘토링 신청하기"
            disabled={!canSubmit || isPending}
            onButtonClick={() => setShowConfirm(true)}
          />
        </Aside>
      </Layout>

      {showConfirm && (
        <Overlay onClick={() => setShowConfirm(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalTitle>멘토링을 신청할까요?</ModalTitle>
            <ModalDesc>{classInfo?.title ?? "이 클래스"}에 지원서를 제출합니다. 멘토가 확인 후 승인해요.</ModalDesc>
            <ModalActions>
              <CancelButton type="button" onClick={() => setShowConfirm(false)}>
                취소
              </CancelButton>
              <ConfirmButton type="button" disabled={isPending} onClick={handleConfirmApply}>
                {isPending ? "신청 중..." : "신청하기"}
              </ConfirmButton>
            </ModalActions>
          </Modal>
        </Overlay>
      )}
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

const QuestionTitle = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);

  .req {
    margin-left: 0.25rem;
    color: var(--primary-500);
  }
`;

const QuestionDesc = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-muted);
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

const Textarea = styled.textarea`
  width: 100%;
  min-height: 7rem;
  padding: 0.875rem 1rem;
  box-sizing: border-box;
  resize: none;
  border-radius: 0.5rem;
  border: 1px solid var(--natural-200);
  background: var(--natural-100);
  font-family: Pretendard;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const OptionRow = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: var(--natural-100);
  cursor: pointer;
  text-align: left;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-primary);
  border: 1px solid ${({ selected }) => (selected ? "var(--primary-500)" : "var(--natural-200)")};
`;

const RadioMark = styled.span<{ selected: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => (selected ? "var(--primary-500)" : "var(--natural-400)")};

  &::after {
    content: "";
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: ${({ selected }) => (selected ? "var(--primary-500)" : "transparent")};
  }
`;

const EmptyText = styled.p`
  font-family: Pretendard;
  font-size: 1.125rem;
  color: var(--text-muted);
`;

const Aside = styled.div`
  width: 24rem;
  flex-shrink: 0;
`;

const StatusText = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--utility-error);
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.45);
  z-index: 100;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 24rem;
  padding: 2rem;
  border-radius: 1rem;
  background: var(--white);
`;

const ModalTitle = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.375rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const ModalDesc = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-muted);
`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CancelButton = styled.button`
  flex: 1 0 0;
  height: 3rem;
  border: 1px solid var(--natural-300);
  border-radius: 0.75rem;
  background: var(--white);
  color: var(--text-secondary);
  font-family: Pretendard;
  font-size: 1.0625rem;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  flex: 1 0 0;
  height: 3rem;
  border: none;
  border-radius: 0.75rem;
  background: var(--primary-500);
  color: var(--white);
  font-family: Pretendard;
  font-size: 1.0625rem;
  cursor: pointer;

  &:disabled {
    background: var(--natural-300);
    color: var(--text-muted);
    cursor: default;
  }
`;
