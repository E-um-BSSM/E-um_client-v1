import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "@/components";
import { classPATCH, classPOST, invitePOST, memberPATCH } from "@/apis/class";
import { useApplicationForm, useClass, useWaitingList } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import type { AccessScope, waitingMemberResponse } from "@/models";

const ACCESS_OPTIONS: { value: AccessScope; label: string; description: string }[] = [
  { value: "PUBLIC", label: "공개", description: "누구나 클래스를 볼 수 있어요" },
  { value: "UNLISTED", label: "일부 공개", description: "초대 코드로만 가입할 수 있어요" },
  { value: "PRIVATE", label: "비공개", description: "나만 볼 수 있어요" },
];

export default function CreateClassPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = Number(searchParams.get("classId"));
  // classId 가 있으면 "모집글 열기" 모드, 없으면 신규 생성 모드
  const isOpenMode = Number.isInteger(classId) && classId > 0;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: classInfo } = useClass(classId, isOpenMode);
  const { data: waitingData } = useWaitingList(classId, undefined, isOpenMode);
  const { data: formData } = useApplicationForm(classId, isOpenMode);
  const applicants = waitingData?.items ?? [];

  const [selectedApplicant, setSelectedApplicant] = useState<waitingMemberResponse | null>(null);
  const questionTitle = (questionId: number) =>
    formData?.questions.find(q => q.id === questionId)?.title ?? `질문 ${questionId}`;

  const [bannerName, setBannerName] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [accessScope, setAccessScope] = useState<AccessScope | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 모집글 열기 모드: 기존 클래스 정보 프리필
  useEffect(() => {
    if (!classInfo) return;
    setTitle(classInfo.title);
    setDescription(classInfo.description ?? "");
    setDifficulty(classInfo.difficulty || 1);
    setAccessScope(classInfo.access_scope);
    if (classInfo.banner_image_url) setBannerPreview(classInfo.banner_image_url);
  }, [classInfo]);

  const canSubmit = useMemo(() => title.trim().length > 0 && accessScope !== null, [title, accessScope]);

  const handlePickFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBannerName(file.name);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!canSubmit || !accessScope || isSubmitting) return;
    try {
      setErrorMessage("");
      setIsSubmitting(true);
      // NOTE: 배너 업로드 엔드포인트가 MVP 명세에 없어 banner_image_url 은 전송하지 않습니다.
      if (isOpenMode) {
        // 신청자 전원 승인 후 클래스를 ACTIVE 로 전환
        await Promise.all(applicants.map(m => memberPATCH.acceptMember(classId, m.user.user_id)));
        await classPATCH.updateClass(classId, {
          title: title.trim(),
          description: description.trim() || null,
          difficulty,
          access_scope: accessScope,
          status: "ACTIVE",
        });
        navigate(`/app/class/detail?classId=${classId}`);
      } else {
        const created = await classPOST.createClass({
          title: title.trim(),
          description: description.trim() || null,
          difficulty,
          access_scope: accessScope,
        });
        // 클래스 생성과 동시에 고유 초대코드 발급
        try {
          await invitePOST.createInviteCode(created.id);
        } catch {
          // 초대코드 발급 실패는 흐름을 막지 않음
        }
        navigate(`/app/class/detail?classId=${created.id}`);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Content>
        <PageTitle>클래스 개설하기</PageTitle>

        {isOpenMode && (
          <Field>
            <FieldHead>
              <FieldLabel>참여 인원</FieldLabel>
              <FieldHint>이 모집글에 신청한 멘티와 멘토가 함께 클래스에 참여합니다</FieldHint>
            </FieldHead>
            <Applicants>
              <Mentor>
                <MiniAvatar src="/eum.png" alt="멘토" />
                <span className="name">{classInfo?.mentor?.nickname ?? "멘토"}</span>
                <RoleTag>멘토</RoleTag>
              </Mentor>
              {applicants.length === 0 ? (
                <EmptyApplicant>아직 신청한 멘티가 없어요</EmptyApplicant>
              ) : (
                applicants.map(m => (
                  <ApplicantButton key={m.user.user_id} type="button" onClick={() => setSelectedApplicant(m)}>
                    <MiniAvatar src="/eum.png" alt="멘티" />
                    <span className="name">{m.user.nickname}</span>
                    <RoleTagMuted>멘티 · 답변 보기</RoleTagMuted>
                  </ApplicantButton>
                ))
              )}
            </Applicants>
          </Field>
        )}

        <Form>
          <Fields>
            <Field>
              <FieldHead>
                <FieldLabel>클래스 배너 이미지</FieldLabel>
                <FieldHint>16:9 비율이 가장 적절해요</FieldHint>
              </FieldHead>
              <BannerRow>
                <BannerPreview style={bannerPreview ? { backgroundImage: `url(${bannerPreview})` } : undefined} />
                <BannerControls>
                  <FileNameBox>{bannerName || "파일을 선택해주세요"}</FileNameBox>
                  <PickButton type="button" onClick={() => fileInputRef.current?.click()}>
                    파일 선택
                  </PickButton>
                  <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePickFile} />
                </BannerControls>
              </BannerRow>
            </Field>

            <Field>
              <FieldHead>
                <FieldLabel>클래스 제목</FieldLabel>
                <FieldHint>자신의 클래스 제목을 설정하세요</FieldHint>
              </FieldHead>
              <TextInput placeholder="클래스 제목" value={title} onChange={e => setTitle(e.target.value)} />
            </Field>

            <Field>
              <FieldHead>
                <FieldLabel>클래스 소개</FieldLabel>
                <FieldHint>자신의 클래스 소개글을 작성하세요</FieldHint>
              </FieldHead>
              <LevelRow>
                <LevelLabel>
                  <span className="star">*</span> 난이도 설정
                </LevelLabel>
                <Dots>
                  {[1, 2, 3, 4, 5].map(v => (
                    <Dot key={v} type="button" aria-label={`난이도 ${v}`} active={difficulty >= v} onClick={() => setDifficulty(v)} />
                  ))}
                </Dots>
              </LevelRow>
              <Textarea placeholder="클래스 소개" value={description} onChange={e => setDescription(e.target.value)} />
            </Field>

            <Field>
              <FieldHead>
                <FieldLabel>공개 설정</FieldLabel>
                <FieldHint>클래스 공개 상태를 설정하세요</FieldHint>
              </FieldHead>
              <AccessRow>
                {ACCESS_OPTIONS.map(option => (
                  <AccessCard
                    key={option.value}
                    type="button"
                    selected={accessScope === option.value}
                    onClick={() => setAccessScope(option.value)}
                  >
                    <Radio selected={accessScope === option.value} />
                    <AccessText>
                      <span className="label">{option.label}</span>
                      <span className="desc">{option.description}</span>
                    </AccessText>
                  </AccessCard>
                ))}
              </AccessRow>
            </Field>
          </Fields>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

          <SubmitWrap>
            <Button type="button" activate={canSubmit} disabled={!canSubmit || isSubmitting} onClick={handleSubmit}>
              {isSubmitting ? "개설 중..." : "글 올리기"}
            </Button>
          </SubmitWrap>
        </Form>
      </Content>

      {selectedApplicant && (
        <Overlay onClick={() => setSelectedApplicant(null)}>
          <Modal onClick={e => e.stopPropagation()}>
            <CloseButton type="button" onClick={() => setSelectedApplicant(null)} aria-label="닫기">
              ×
            </CloseButton>
            <ModalTitle>{selectedApplicant.user.nickname} 님의 지원서</ModalTitle>
            {selectedApplicant.message && (
              <AnswerBlock>
                <QuestionText>신청 메시지</QuestionText>
                <AnswerText>{selectedApplicant.message}</AnswerText>
              </AnswerBlock>
            )}
            {selectedApplicant.answers && selectedApplicant.answers.length > 0 ? (
              selectedApplicant.answers.map(a => (
                <AnswerBlock key={a.question_id}>
                  <QuestionText>{questionTitle(a.question_id)}</QuestionText>
                  <AnswerText>{a.value || "(답변 없음)"}</AnswerText>
                </AnswerBlock>
              ))
            ) : (
              <AnswerText>제출한 지원서 답변이 없습니다.</AnswerText>
            )}
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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

const Applicants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Mentor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-200);
  background: var(--white);

  .name {
    font-family: Pretendard;
    font-size: 1rem;
    color: var(--text-primary);
  }
`;

const ApplicantButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-200);
  background: var(--white);
  cursor: pointer;

  .name {
    font-family: Pretendard;
    font-size: 1rem;
    color: var(--text-primary);
  }
  &:hover {
    background: var(--natural-100);
  }
`;

const MiniAvatar = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  object-fit: cover;
`;

const RoleTag = styled.span`
  font-family: Pretendard;
  font-size: 0.875rem;
  color: var(--primary-500);
`;

const RoleTagMuted = styled.span`
  font-family: Pretendard;
  font-size: 0.875rem;
  color: var(--text-muted);
`;

const EmptyApplicant = styled.p`
  margin: 0;
  align-self: center;
  font-family: Pretendard;
  font-size: 1rem;
  color: var(--text-muted);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: flex-end;
  width: 100%;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  width: 100%;
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

const BannerRow = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;
`;

const BannerPreview = styled.div`
  width: 25rem;
  height: 13.4375rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background-color: var(--natural-100);
  background-size: cover;
  background-position: center;
`;

const BannerControls = styled.div`
  display: flex;
  flex: 1 0 0;
  gap: 1rem;
  align-items: center;
`;

const FileNameBox = styled.div`
  display: flex;
  flex: 1 0 0;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  background: var(--white);
  font-family: Pretendard;
  font-size: 1.125rem;
  color: var(--text-secondary);
`;

const PickButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-200);
  background: var(--white);
  color: var(--primary-500);
  font-family: Pretendard;
  font-size: 1rem;
  white-space: nowrap;
  cursor: pointer;
`;

const TextInput = styled.input`
  display: flex;
  align-items: center;
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
  display: flex;
  width: 100%;
  height: 10rem;
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

const LevelRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.25rem 0;
`;

const LevelLabel = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 400;
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

const AccessRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const AccessCard = styled.button<{ selected: boolean }>`
  display: flex;
  flex: 1 0 0;
  gap: 0.625rem;
  align-items: flex-start;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: var(--white);
  cursor: pointer;
  text-align: left;
  border: 1px solid ${({ selected }) => (selected ? "var(--primary-500)" : "var(--natural-300)")};
`;

const Radio = styled.span<{ selected: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
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

const AccessText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: Pretendard;
  font-size: 1.125rem;
  line-height: 1.3;

  .label {
    font-weight: 500;
    color: var(--text-primary);
  }
  .desc {
    font-weight: 400;
    color: var(--text-muted);
  }
`;

const SubmitWrap = styled.div`
  width: 11.75rem;
`;

const ErrorText = styled.p`
  margin: 0;
  align-self: flex-start;
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30rem;
  max-height: 80vh;
  overflow-y: auto;
  padding: 2rem;
  border-radius: 1rem;
  background: var(--white);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text-muted);
  cursor: pointer;
`;

const ModalTitle = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.375rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const AnswerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const QuestionText = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

const AnswerText = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-muted);
  white-space: pre-wrap;
`;
