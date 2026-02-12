import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DifficultyLevel } from "@/components";
import { useGlobalStyle } from "@/stores/useStyle";
import { assignmentGET } from "@/apis/class/assignment";
import { classGET, classPOST } from "@/apis/class/class";
import { scheduleGET } from "@/apis/class/schedule";
import { submissionGET, submissionPOST } from "@/apis/class/submission";
import type { assignmentSearchResponse, classResponse, classScheduleResponse, submissionResponse } from "@/models";
import {
  AssignmentButton,
  AssignmentCard,
  AssignmentDeadline,
  AssignmentDesc,
  AssignmentList,
  AssignmentTexts,
  AssignmentTitle,
  AssignmentTitleRow,
  Avatar,
  ClassMeta,
  ClassSummary,
  ClassThumbnail,
  ClassTitle,
  CloseButton,
  ContentGrid,
  Dot,
  DotRow,
  EmptyBlock,
  EmptyEmoji,
  EmptyText,
  FeedbackHeader,
  FeedbackInput,
  FeedbackLine,
  FeedbackModal,
  FeedbackName,
  FileInput,
  FilePickButton,
  FileRow,
  IntroCard,
  IntroText,
  LeftColumn,
  MentorCard,
  MentorDesc,
  MentorHeader,
  MentorName,
  MiniAvatar,
  Modal,
  ModalSubTitle,
  ModalTitle,
  NoticeArrow,
  NoticeBody,
  NoticeCard,
  NoticeItem,
  NoticeList,
  NoticeModal,
  Overlay,
  PageContainer,
  RightColumn,
  ScoreLine,
  ScoreText,
  Section,
  SectionTitle,
  SubmitButton,
  SubmitForm,
} from "./styles";
import Rarrow from "@/assets/Rarrow_natural-400.svg";

type AssignmentStatus = "submit" | "deadline" | "done" | "feedback";
type LoadState = "idle" | "loading" | "success" | "error";

type RenderAssignment = {
  id: number;
  title: string;
  deadline: string;
  description: string;
  status: AssignmentStatus;
  rawDueDate: string;
  submission?: submissionResponse;
};

type Notice = {
  id: number;
  title: string;
  content: string;
};

const toDateLabel = (dateValue: string) => {
  if (!dateValue) {
    return "-";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const resolveAssignmentStatus = (assignment: assignmentSearchResponse, submission?: submissionResponse): AssignmentStatus => {
  if (submission) {
    const hasFeedback = submission.feedback?.trim().length > 0 || (typeof submission.score === "number" && submission.score > 0);
    return hasFeedback ? "feedback" : "done";
  }

  const dueDate = new Date(assignment.due_date);
  if (!Number.isNaN(dueDate.getTime()) && dueDate.getTime() < Date.now()) {
    return "deadline";
  }

  return "submit";
};

const pickLatestSubmission = (list: submissionResponse[]) => {
  if (list.length === 0) {
    return undefined;
  }

  return [...list].sort((a, b) => {
    const dateA = new Date(a.submitted_at).getTime();
    const dateB = new Date(b.submitted_at).getTime();
    return dateB - dateA;
  })[0];
};

export default function SubmitAssignmentPage() {
  const setFooterColor = useGlobalStyle(state => state.setFooterColor);
  const [searchParams] = useSearchParams();

  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [resolvedClassId, setResolvedClassId] = useState<number | null>(null);
  const [classInfo, setClassInfo] = useState<classResponse | null>(null);
  const [assignments, setAssignments] = useState<RenderAssignment[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  const [submitModalAssignment, setSubmitModalAssignment] = useState<RenderAssignment | null>(null);
  const [feedbackModalAssignment, setFeedbackModalAssignment] = useState<RenderAssignment | null>(null);
  const [noticeModal, setNoticeModal] = useState<Notice | null>(null);

  const [submissionLink, setSubmissionLink] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFooterColor("lightGray");
  }, [setFooterColor]);

  const hasSubmissionValue = submissionLink.trim().length > 0 || selectedFileName.length > 0;

  const closeAllModals = () => {
    setSubmitModalAssignment(null);
    setFeedbackModalAssignment(null);
    setNoticeModal(null);
  };

  const resetSubmissionForm = () => {
    setSubmissionLink("");
    setSelectedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fetchDetailData = async (classId: number) => {
    const [classResponse, assignmentResponse, scheduleResponse] = await Promise.all([
      classGET.classSingleSearch(classId),
      assignmentGET.assignmentSearch(classId),
      scheduleGET.classScheduleListSearch(classId),
    ]);

    const assignmentList = assignmentResponse.data.content ?? assignmentResponse.data.assignments ?? [];
    const scheduleList = scheduleResponse.data.content ?? scheduleResponse.data.schedules ?? [];

    const submissionPairs = await Promise.all(
      assignmentList.map(async assignment => {
        try {
          const submissionResponse = await submissionGET.submissionSearch(classId, assignment.assignment_id);
          const submissionList = submissionResponse.data.submissions ?? submissionResponse.data.content ?? [];
          return {
            assignmentId: assignment.assignment_id,
            submission: pickLatestSubmission(submissionList),
          };
        } catch {
          return {
            assignmentId: assignment.assignment_id,
            submission: undefined,
          };
        }
      }),
    );

    const submissionMap = new Map<number, submissionResponse | undefined>(
      submissionPairs.map(item => [item.assignmentId, item.submission]),
    );

    const renderAssignments: RenderAssignment[] = assignmentList.map(assignment => {
      const submission = submissionMap.get(assignment.assignment_id);
      return {
        id: assignment.assignment_id,
        title: assignment.title,
        deadline: `~ ${toDateLabel(assignment.due_date)}`,
        description: assignment.description,
        status: resolveAssignmentStatus(assignment, submission),
        rawDueDate: assignment.due_date,
        submission,
      };
    });

    const renderNotices: Notice[] = scheduleList.slice(0, 3).map((schedule: classScheduleResponse) => ({
      id: schedule.schedule_id,
      title: schedule.title,
      content: schedule.description || "공지 내용이 없습니다.",
    }));

    setClassInfo(classResponse.data);
    setAssignments(renderAssignments);
    setNotices(renderNotices);
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      setLoadState("loading");
      try {
        const queryClassId = Number(searchParams.get("classId"));
        let classId = Number.isFinite(queryClassId) && queryClassId > 0 ? queryClassId : null;

        if (!classId) {
          const listResponse = await classPOST.classListSearch();
          const list = listResponse.data.content ?? listResponse.data.classes ?? [];
          classId = list[0]?.class_id ?? null;
        }

        if (!classId) {
          if (isMounted) {
            setResolvedClassId(null);
            setClassInfo(null);
            setAssignments([]);
            setNotices([]);
            setLoadState("success");
          }
          return;
        }

        if (!isMounted) {
          return;
        }

        setResolvedClassId(classId);
        await fetchDetailData(classId);

        if (isMounted) {
          setLoadState("success");
        }
      } catch {
        if (isMounted) {
          setLoadState("error");
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const openAssignmentAction = (assignment: RenderAssignment) => {
    if (assignment.status === "submit") {
      setSubmitModalAssignment(assignment);
      return;
    }

    if (assignment.status === "feedback") {
      setFeedbackModalAssignment(assignment);
    }
  };

  const onSubmitAssignment = async () => {
    if (!hasSubmissionValue || !submitModalAssignment || !resolvedClassId) {
      return;
    }

    try {
      const fileUrl = submissionLink.trim() || selectedFileName.trim();
      await submissionPOST.submissionSubmit(resolvedClassId, submitModalAssignment.id, {
        content: fileUrl,
        file_url: fileUrl,
      });

      await fetchDetailData(resolvedClassId);
      setSubmitModalAssignment(null);
      resetSubmissionForm();
    } catch {
      // Keep modal open for retry
    }
  };

  const feedbackScore = useMemo(() => {
    const score = feedbackModalAssignment?.submission?.score ?? 0;
    if (score <= 0) {
      return 0;
    }

    return Math.max(0, Math.min(5, Math.round(score / 20)));
  }, [feedbackModalAssignment]);

  return (
    <>
      <PageContainer>
        <ClassSummary>
          <ClassThumbnail />
          <ClassMeta>
            <ClassTitle>{classInfo?.title ?? "클래스 정보를 불러오고 있어요"}</ClassTitle>
            <DifficultyLevel level={classInfo?.difficulty ?? 0} />
          </ClassMeta>
        </ClassSummary>

        <ContentGrid>
          <LeftColumn>
            <Section>
              <SectionTitle>클래스 소개</SectionTitle>
              <IntroCard>
                <IntroText>{classInfo?.description ?? "클래스 소개글"}</IntroText>
              </IntroCard>
            </Section>

            <Section>
              <SectionTitle>과제</SectionTitle>
              {loadState === "error" ? (
                <EmptyBlock>
                  <EmptyEmoji>👀</EmptyEmoji>
                  <EmptyText>과제 정보를 불러오지 못했어요</EmptyText>
                </EmptyBlock>
              ) : assignments.length === 0 ? (
                <EmptyBlock>
                  <EmptyEmoji>👀</EmptyEmoji>
                  <EmptyText>현재 등록된 과제가 없어요</EmptyText>
                </EmptyBlock>
              ) : (
                <AssignmentList>
                  {assignments.map(assignment => (
                    <AssignmentCard key={assignment.id}>
                      <AssignmentTexts>
                        <AssignmentTitleRow>
                          <AssignmentTitle>{assignment.title}</AssignmentTitle>
                          <AssignmentDeadline>{assignment.deadline}</AssignmentDeadline>
                        </AssignmentTitleRow>
                        <AssignmentDesc>{assignment.description}</AssignmentDesc>
                      </AssignmentTexts>
                      <AssignmentButton
                        type="button"
                        variant={assignment.status}
                        onClick={() => openAssignmentAction(assignment)}
                        disabled={assignment.status === "done" || assignment.status === "deadline"}
                        aria-label={assignment.title}
                      >
                        {assignment.status === "submit" && "제출하기"}
                        {assignment.status === "deadline" && "제출 마감"}
                        {assignment.status === "done" && "제출 완료"}
                        {assignment.status === "feedback" && "피드백 확인"}
                      </AssignmentButton>
                    </AssignmentCard>
                  ))}
                </AssignmentList>
              )}
            </Section>
          </LeftColumn>

          <RightColumn>
            <Section>
              <SectionTitle>멘토 소개</SectionTitle>
              <MentorCard>
                <MentorHeader>
                  <Avatar src="/eum.png" alt="멘토 프로필" loading="lazy" />
                  <MentorName>{classInfo?.created_by ?? "멘토 이름"}</MentorName>
                </MentorHeader>
                <MentorDesc>{classInfo?.tags?.join(" · ") || "멘토 소개"}</MentorDesc>
              </MentorCard>
            </Section>

            <Section>
              <SectionTitle>공지사항</SectionTitle>
              {notices.length === 0 ? (
                <EmptyBlock>
                  <EmptyEmoji>👀</EmptyEmoji>
                  <EmptyText>현재 등록된 공지가 없어요</EmptyText>
                </EmptyBlock>
              ) : (
                <NoticeCard>
                  <NoticeList>
                    {notices.map(notice => (
                      <NoticeItem type="button" key={notice.id} onClick={() => setNoticeModal(notice)}>
                        {notice.title}
                        <NoticeArrow src={Rarrow} alt="공지 상세" />
                      </NoticeItem>
                    ))}
                  </NoticeList>
                </NoticeCard>
              )}
            </Section>
          </RightColumn>
        </ContentGrid>
      </PageContainer>

      {(submitModalAssignment || feedbackModalAssignment || noticeModal) && (
        <Overlay onClick={closeAllModals}>
          {submitModalAssignment && (
            <Modal onClick={e => e.stopPropagation()}>
              <CloseButton type="button" onClick={closeAllModals} aria-label="모달 닫기">
                ×
              </CloseButton>
              <ModalTitle>{submitModalAssignment.title}</ModalTitle>
              <ModalSubTitle>{submitModalAssignment.description}</ModalSubTitle>

              <SubmitForm>
                <FileRow>
                  <FileInput
                    placeholder="파일 선택 및 링크를 올려주세요"
                    value={submissionLink}
                    onChange={e => setSubmissionLink(e.target.value)}
                  />
                  <FilePickButton type="button" onClick={() => fileInputRef.current?.click()}>
                    파일 선택
                  </FilePickButton>
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={e => {
                      const fileName = e.target.files?.[0]?.name ?? "";
                      setSelectedFileName(fileName);
                    }}
                  />
                </FileRow>
                <SubmitButton type="button" active={hasSubmissionValue} onClick={onSubmitAssignment}>
                  과제 제출하기
                </SubmitButton>
              </SubmitForm>
            </Modal>
          )}

          {feedbackModalAssignment && (
            <FeedbackModal onClick={e => e.stopPropagation()}>
              <CloseButton type="button" onClick={closeAllModals} aria-label="모달 닫기">
                ×
              </CloseButton>
              <ModalTitle>채점 및 피드백 확인</ModalTitle>

              <FeedbackHeader>
                <FeedbackLine>
                  <MiniAvatar src="/eum.png" alt="멘티 프로필" loading="lazy" />
                  <FeedbackName>{feedbackModalAssignment.submission?.user_id ?? "멘티 이름"}</FeedbackName>
                </FeedbackLine>
                <ScoreLine>
                  <ScoreText>채점 ({feedbackModalAssignment.submission?.score ?? 0}/100)</ScoreText>
                  <DotRow>
                    {new Array(5).fill(0).map((_, index) => (
                      <Dot key={index} active={index < feedbackScore} />
                    ))}
                  </DotRow>
                </ScoreLine>
              </FeedbackHeader>

              <FeedbackInput>{feedbackModalAssignment.submission?.feedback || "피드백 내용"}</FeedbackInput>
            </FeedbackModal>
          )}

          {noticeModal && (
            <NoticeModal onClick={e => e.stopPropagation()}>
              <CloseButton type="button" onClick={closeAllModals} aria-label="모달 닫기">
                ×
              </CloseButton>
              <ModalTitle>{noticeModal.title}</ModalTitle>
              <NoticeBody>{noticeModal.content}</NoticeBody>
            </NoticeModal>
          )}
        </Overlay>
      )}
    </>
  );
}
