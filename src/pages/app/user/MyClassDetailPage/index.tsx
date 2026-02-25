import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DifficultyLevel } from "@/components";
import { useGlobalStyle } from "@/stores/useStyle";
import { assignmentGET, classDELETE, classGET, inviteGET, memberGET, scheduleGET } from "@/apis/class";
import { classPOST } from "@/apis/class/class";
import { submissionGET, submissionPOST } from "@/apis/class/submission";
import type {
  assignmentSearchResponse,
  classCodeResponse,
  classResponse,
  classScheduleResponse,
  submissionResponse,
  waitingListResponse,
} from "@/models";
import {
  ActionButtonRow,
  AssignmentButton,
  AssignmentCard,
  AssignmentDeadline,
  AssignmentDesc,
  AssignmentList,
  AssignmentTexts,
  AssignmentTitle,
  AssignmentTitleRow,
  Avatar,
  ClassActions,
  ClassHeaderRow,
  ClassMeta,
  ClassSummary,
  ClassThumbnail,
  ClassTitle,
  CloseButton,
  ContentGrid,
  DangerButton,
  Dot,
  DotRow,
  EmptyBlock,
  EmptyEmoji,
  EmptyText,
  ExternalLink,
  FeedbackHeader,
  FeedbackInput,
  FeedbackLine,
  FeedbackModal,
  FeedbackName,
  FileInput,
  FilePickButton,
  FileRow,
  FormGroup,
  FormInput,
  FormLabel,
  FormTextarea,
  IntroCard,
  IntroText,
  InviteCodeLabel,
  InviteCodeRow,
  InviteCodeValue,
  LeftColumn,
  MenteeCard,
  MenteeItem,
  MenteeListView,
  MenteeName,
  MentorCard,
  MentorDesc,
  MentorHeader,
  MentorName,
  MentoModal,
  MiniAvatar,
  MiniButton,
  Modal,
  ModalForm,
  ModalSubTitle,
  ModalTitle,
  NoticeArrow,
  NoticeBody,
  NoticeCard,
  NoticeItem,
  NoticeList,
  NoticeModal,
  OutlinedButton,
  Overlay,
  PageContainer,
  RightColumn,
  ScoreLine,
  ScoreText,
  Section,
  SectionHeader,
  SectionTitle,
  SubmissionInfo,
  SubmissionItem,
  SubmissionList,
  SubmissionListModal,
  SubmitButton,
  SubmitForm,
  WaitlistActions,
  WaitlistButton,
  WaitlistCard,
  WaitlistInfo,
  WaitlistItem,
  WaitlistSection,
} from "./styles";
import { assignmentPOST } from "@/apis/class/assignment/post";
import { schedulePOST } from "@/apis/class/schedule/post";
import { memberPATCH } from "@/apis/class/member/patch";
import { memberDELETE } from "@/apis/class/member/delete";
import { submissionPATCH } from "@/apis/class/submission/patch";
import Rarrow from "@/assets/Rarrow_natural-400.svg";

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "mento" | "menti";
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

// ── Helpers ───────────────────────────────────────────────────────────────────

const toDateLabel = (dateValue: string) => {
  if (!dateValue) return "-";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const resolveAssignmentStatus = (
  assignment: assignmentSearchResponse,
  submission?: submissionResponse,
): AssignmentStatus => {
  if (submission) {
    const hasFeedback =
      submission.feedback?.trim().length > 0 || (typeof submission.score === "number" && submission.score > 0);
    return hasFeedback ? "feedback" : "done";
  }
  const dueDate = new Date(assignment.due_date);
  if (!Number.isNaN(dueDate.getTime()) && dueDate.getTime() < Date.now()) return "deadline";
  return "submit";
};

const pickLatestSubmission = (list: submissionResponse[]) => {
  if (list.length === 0) return undefined;
  return [...list].sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())[0];
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function MyClassDetailPage() {
  const setFooterColor = useGlobalStyle(state => state.setFooterColor);
  const [searchParams] = useSearchParams();

  // Determine role: ?role=mento → mentor view, otherwise → mentee view
  const role: Role = searchParams.get("role") === "mento" ? "mento" : "menti";
  const isMento = role === "mento";

  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [resolvedClassId, setResolvedClassId] = useState<number | null>(null);
  const [classInfo, setClassInfo] = useState<classResponse | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [assignments, setAssignments] = useState<RenderAssignment[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [mentees, setMentees] = useState<waitingListResponse[]>([]);

  // Menti submit-assignment modal state
  const [submitModalAssignment, setSubmitModalAssignment] = useState<RenderAssignment | null>(null);
  const [feedbackModalAssignment, setFeedbackModalAssignment] = useState<RenderAssignment | null>(null);
  const [noticeModal, setNoticeModal] = useState<Notice | null>(null);

  // Mento modals & toggle state
  const [isAssignmentCreateOpen, setIsAssignmentCreateOpen] = useState(false);
  const [isNoticeCreateOpen, setIsNoticeCreateOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [submissionListModal, setSubmissionListModal] = useState<RenderAssignment | null>(null);
  const [gradingModal, setGradingModal] = useState<submissionResponse | null>(null);

  // Mento form states
  const [assignTitle, setAssignTitle] = useState("");
  const [assignDesc, setAssignDesc] = useState("");
  const [assignDueDate, setAssignDueDate] = useState("");

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  const [gradingScore, setGradingScore] = useState(0);
  const [gradingFeedback, setGradingFeedback] = useState("");

  const [submissions, setSubmissions] = useState<submissionResponse[]>([]);

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
    setIsAssignmentCreateOpen(false);
    setIsNoticeCreateOpen(false);
    setSubmissionListModal(null);
    setGradingModal(null);
  };

  const resetSubmissionForm = () => {
    setSubmissionLink("");
    setSelectedFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Data fetching ──────────────────────────────────────────────────────────

  const fetchDetailData = async (classId: number) => {
    // Shared fetch: class info + assignments + schedules (notices)
    const [classRes, assignmentRes, scheduleRes] = await Promise.all([
      classGET.classSingleSearch(classId),
      assignmentGET.assignmentSearch(classId),
      scheduleGET.classScheduleListSearch(classId),
    ]);

    setClassInfo(classRes.data);

    const assignmentList: assignmentSearchResponse[] =
      assignmentRes.data.content ?? assignmentRes.data.assignments ?? [];

    const scheduleList: classScheduleResponse[] = scheduleRes.data.content ?? scheduleRes.data.schedules ?? [];

    setNotices(
      scheduleList.slice(0, 5).map(s => ({
        id: s.schedule_id,
        title: s.title,
        content: s.description || "공지 내용이 없습니다.",
      })),
    );

    if (isMento) {
      // Mento view: invite code + mentee list, no submission resolution needed
      const [inviteRes, memberRes] = await Promise.allSettled([
        inviteGET.classInviteCodeGet(classId),
        memberGET.waitingListSearch(classId),
      ]);

      if (inviteRes.status === "fulfilled") {
        const code = (inviteRes.value.data as classCodeResponse).class_code ?? "";
        setInviteCode(code);
      }

      if (memberRes.status === "fulfilled") {
        const list: waitingListResponse[] = memberRes.value.data.content ?? memberRes.value.data.waiting ?? [];
        setMentees(list);
      }

      // Assignments for mento: no status resolution
      setAssignments(
        assignmentList.map(a => ({
          id: a.assignment_id,
          title: a.title,
          deadline: `~ ${toDateLabel(a.due_date)}`,
          description: a.description,
          status: "submit" as AssignmentStatus,
          rawDueDate: a.due_date,
        })),
      );
    } else {
      // Menti view: resolve submission status per assignment
      const submissionPairs = await Promise.all(
        assignmentList.map(async assignment => {
          try {
            const submissionRes = await submissionGET.submissionSearch(classId, assignment.assignment_id);
            const submissionList: submissionResponse[] =
              submissionRes.data.submissions ?? submissionRes.data.content ?? [];
            return { assignmentId: assignment.assignment_id, submission: pickLatestSubmission(submissionList) };
          } catch {
            return { assignmentId: assignment.assignment_id, submission: undefined };
          }
        }),
      );

      const submissionMap = new Map(submissionPairs.map(p => [p.assignmentId, p.submission]));

      setAssignments(
        assignmentList.map(a => {
          const submission = submissionMap.get(a.assignment_id);
          return {
            id: a.assignment_id,
            title: a.title,
            deadline: `~ ${toDateLabel(a.due_date)}`,
            description: a.description,
            status: resolveAssignmentStatus(a, submission),
            rawDueDate: a.due_date,
            submission,
          };
        }),
      );
    }
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
            setMentees([]);
            setLoadState("success");
          }
          return;
        }

        if (!isMounted) return;
        setResolvedClassId(classId);
        await fetchDetailData(classId);
        if (isMounted) setLoadState("success");
      } catch {
        if (isMounted) setLoadState("error");
      }
    };

    init();
    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  // ── Menti assignment actions ───────────────────────────────────────────────

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
    if (!hasSubmissionValue || !submitModalAssignment || !resolvedClassId) return;
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
    if (score <= 0) return 0;
    return Math.max(0, Math.min(5, Math.round(score / 20)));
  }, [feedbackModalAssignment]);

  // ── Mento assignment actions ───────────────────────────────────────────────

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedClassId || !assignTitle || !assignDueDate) return;
    try {
      await assignmentPOST.assignmentCreate(resolvedClassId, {
        title: assignTitle,
        description: assignDesc,
        due_date: new Date(assignDueDate).toISOString(),
        difficulty: 1, // Default difficulty
      });
      setIsAssignmentCreateOpen(false);
      setAssignTitle("");
      setAssignDesc("");
      setAssignDueDate("");
      await fetchDetailData(resolvedClassId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenSubmissionList = async (assignment: RenderAssignment) => {
    if (!resolvedClassId) return;
    try {
      const res = await submissionGET.submissionSearch(resolvedClassId, assignment.id);
      setSubmissions(res.data.submissions ?? res.data.content ?? []);
      setSubmissionListModal(assignment);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenGrading = (submission: submissionResponse) => {
    setGradingModal(submission);
    setGradingScore(submission.score ?? 0);
    setGradingFeedback(submission.feedback ?? "");
  };

  const onSubmitGrading = async () => {
    if (!resolvedClassId || !submissionListModal || !gradingModal) return;
    try {
      await submissionPATCH.submissionFeedback(resolvedClassId, submissionListModal.id, gradingModal.submission_id, {
        score: gradingScore,
        feedback: gradingFeedback,
      });
      // Refresh list
      const res = await submissionGET.submissionSearch(resolvedClassId, submissionListModal.id);
      setSubmissions(res.data.submissions ?? res.data.content ?? []);
      setGradingModal(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Mento notice actions ───────────────────────────────────────────────────

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedClassId || !noticeTitle || !noticeContent) return;
    try {
      await schedulePOST.classScheduleRegister(resolvedClassId, {
        title: noticeTitle,
        description: noticeContent,
        start_at: new Date().toISOString(),
        end_at: new Date(Date.now() + 86400000 * 365).toISOString(), // Long duration for notice
        location: "Notice",
        status: "Notice",
      });
      setIsNoticeCreateOpen(false);
      setNoticeTitle("");
      setNoticeContent("");
      await fetchDetailData(resolvedClassId);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Mento membership actions ───────────────────────────────────────────────

  const handleAcceptMentee = async () => {
    if (!resolvedClassId) return;
    try {
      // Assuming class_id is enough for the unified accept endpoint
      // backend might handle specific user via other means or this is a "accept all"
      // But based on Figma, we should pass user_id if possible.
      // Re-reading member/patch.ts, it doesn't take user_id.
      await memberPATCH.memberAccept(resolvedClassId);
      await fetchDetailData(resolvedClassId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectMentee = async () => {
    if (!resolvedClassId) return;
    try {
      await memberDELETE.memberDisagree(resolvedClassId);
      await fetchDetailData(resolvedClassId);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Mento actions ─────────────────────────────────────────────────────────

  const handleDeleteClass = async () => {
    if (!resolvedClassId) return;
    const confirmed = window.confirm("정말로 클래스를 삭제하시겠습니까?");
    if (!confirmed) return;
    try {
      await classDELETE.classDelete(resolvedClassId);
      window.history.back();
    } catch {
      // ignore
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <PageContainer>
        {/* ── Class header ───────────────────────────────────────────── */}
        <ClassHeaderRow>
          <ClassSummary>
            <ClassThumbnail />
            <ClassMeta>
              <ClassTitle>{classInfo?.title ?? "클래스 정보를 불러오고 있어요"}</ClassTitle>
              <DifficultyLevel level={classInfo?.difficulty ?? 0} />
            </ClassMeta>
          </ClassSummary>

          {/* Mento-only: action buttons + invite code */}
          {isMento && (
            <ClassActions>
              <ActionButtonRow>
                <OutlinedButton type="button" onClick={() => setIsWaitlistOpen(!isWaitlistOpen)}>
                  클래스 대기리스트
                </OutlinedButton>
                <DangerButton type="button" onClick={handleDeleteClass}>
                  클래스 삭제하기
                </DangerButton>
              </ActionButtonRow>
              <InviteCodeRow>
                <InviteCodeLabel>초대 코드</InviteCodeLabel>
                <InviteCodeValue>{inviteCode || classInfo?.class_code || "—"}</InviteCodeValue>
              </InviteCodeRow>
            </ClassActions>
          )}
        </ClassHeaderRow>

        {/* ── Two-column content ──────────────────────────────────────── */}
        <ContentGrid>
          {/* ── Left column ────────────────────────────────────────────── */}
          <LeftColumn>
            {/* 클래스 소개 */}
            <Section>
              <SectionTitle>클래스 소개</SectionTitle>
              <IntroCard>
                <IntroText>{classInfo?.description ?? "클래스 소개글"}</IntroText>
              </IntroCard>
            </Section>

            {/* Mento-only: 대기리스트 (Inline Toggle) */}
            {isMento && isWaitlistOpen && (
              <WaitlistSection>
                <SectionTitle>클래스 대기 리스트</SectionTitle>
                <WaitlistCard>
                  {mentees.length === 0 ? (
                    <EmptyText>대기 중인 사람이 없습니다.</EmptyText>
                  ) : (
                    mentees.map(m => (
                      <WaitlistItem key={m.user_id}>
                        <WaitlistInfo>
                          <MiniAvatar src="/eum.png" alt="멘티 프로필" />
                          <MenteeName>{m.user_id}</MenteeName>
                        </WaitlistInfo>
                        <WaitlistActions>
                          <WaitlistButton variant="accept" onClick={() => handleAcceptMentee()}>
                            참가 허용
                          </WaitlistButton>
                          <WaitlistButton variant="reject" onClick={() => handleRejectMentee()}>
                            참가 거부
                          </WaitlistButton>
                        </WaitlistActions>
                      </WaitlistItem>
                    ))
                  )}
                </WaitlistCard>
              </WaitlistSection>
            )}

            {/* 과제 */}
            <Section>
              <SectionHeader>
                <SectionTitle>과제</SectionTitle>
                {isMento && (
                  <OutlinedButton type="button" onClick={() => setIsAssignmentCreateOpen(true)}>
                    생성하기
                  </OutlinedButton>
                )}
              </SectionHeader>

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

                      {/* Mento-only: Check submissions */}
                      {isMento && (
                        <AssignmentButton
                          type="button"
                          variant="submit"
                          onClick={() => handleOpenSubmissionList(assignment)}
                        >
                          과제 확인하기
                        </AssignmentButton>
                      )}

                      {/* Menti-only: submit / status button */}
                      {!isMento && (
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
                      )}
                    </AssignmentCard>
                  ))}
                </AssignmentList>
              )}
            </Section>
          </LeftColumn>

          {/* ── Right column ───────────────────────────────────────────── */}
          <RightColumn>
            {/* 멘토 소개 */}
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

            {/* Mento-only: 멘티 관리 */}
            {isMento && (
              <Section>
                <SectionTitle>멘티 관리</SectionTitle>
                {mentees.length === 0 ? (
                  <EmptyBlock>
                    <EmptyEmoji>👀</EmptyEmoji>
                    <EmptyText>등록된 멘티가 없어요</EmptyText>
                  </EmptyBlock>
                ) : (
                  <MenteeCard>
                    <MenteeListView>
                      {mentees.map(m => (
                        <MenteeItem key={m.user_id}>
                          <MiniAvatar src="/eum.png" alt="멘티 프로필" loading="lazy" />
                          <MenteeName>{m.user_id}</MenteeName>
                        </MenteeItem>
                      ))}
                    </MenteeListView>
                  </MenteeCard>
                )}
              </Section>
            )}

            {/* 공지사항 */}
            <Section>
              <SectionHeader>
                <SectionTitle>공지사항</SectionTitle>
                {isMento && (
                  <OutlinedButton type="button" onClick={() => setIsNoticeCreateOpen(true)}>
                    생성하기
                  </OutlinedButton>
                )}
              </SectionHeader>

              {notices.length === 0 ? (
                <EmptyBlock>
                  <EmptyEmoji>👀</EmptyEmoji>
                  <EmptyText>현재 등록된 공지가 없어요</EmptyText>
                </EmptyBlock>
              ) : (
                <NoticeCard>
                  <NoticeList>
                    {notices.map(n => (
                      <NoticeItem key={n.id} type="button" onClick={() => setNoticeModal(n)}>
                        {n.title}
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

      {/* ── Modals ─────────────────────────────────────────────────────── */}
      {(submitModalAssignment ||
        feedbackModalAssignment ||
        noticeModal ||
        isAssignmentCreateOpen ||
        isNoticeCreateOpen ||
        submissionListModal ||
        gradingModal) && (
        <Overlay onClick={closeAllModals}>
          {/* Menti: submit assignment modal */}
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
                    onChange={e => setSelectedFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </FileRow>
                <SubmitButton type="button" active={hasSubmissionValue} onClick={onSubmitAssignment}>
                  과제 제출하기
                </SubmitButton>
              </SubmitForm>
            </Modal>
          )}

          {/* Mento: create assignment modal */}
          {isAssignmentCreateOpen && (
            <MentoModal onClick={e => e.stopPropagation()}>
              <CloseButton type="button" onClick={closeAllModals}>
                ×
              </CloseButton>
              <ModalTitle>과제 생성하기</ModalTitle>
              <ModalForm onSubmit={handleCreateAssignment}>
                <FormGroup>
                  <FormLabel>과제 제목</FormLabel>
                  <FormInput
                    placeholder="과제 제목을 입력해주세요"
                    value={assignTitle}
                    onChange={e => setAssignTitle(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>과제 설명</FormLabel>
                  <FormTextarea
                    placeholder="과제 설명을 입력해주세요"
                    value={assignDesc}
                    onChange={e => setAssignDesc(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>과제 마감기한</FormLabel>
                  <FormInput
                    type="datetime-local"
                    value={assignDueDate}
                    onChange={e => setAssignDueDate(e.target.value)}
                    required
                  />
                </FormGroup>
                <SubmitButton type="submit" active={!!(assignTitle && assignDueDate)}>
                  과제 생성하기
                </SubmitButton>
              </ModalForm>
            </MentoModal>
          )}

          {/* Mento: create notice modal */}
          {isNoticeCreateOpen && (
            <MentoModal onClick={e => e.stopPropagation()}>
              <CloseButton type="button" onClick={closeAllModals}>
                ×
              </CloseButton>
              <ModalTitle>공지사항 생성하기</ModalTitle>
              <ModalForm onSubmit={handleCreateNotice}>
                <FormGroup>
                  <FormLabel>공지글 제목</FormLabel>
                  <FormInput
                    placeholder="제목을 입력해주세요"
                    value={noticeTitle}
                    onChange={e => setNoticeTitle(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>공지글 내용</FormLabel>
                  <FormTextarea
                    placeholder="내용을 입력해주세요"
                    value={noticeContent}
                    onChange={e => setNoticeContent(e.target.value)}
                    required
                  />
                </FormGroup>
                <SubmitButton type="submit" active={!!(noticeTitle && noticeContent)}>
                  공지 생성하기
                </SubmitButton>
              </ModalForm>
            </MentoModal>
          )}

          {/* Mento: submission list modal */}
          {submissionListModal && (
            <SubmissionListModal onClick={e => e.stopPropagation()}>
              <CloseButton type="button" onClick={closeAllModals}>
                ×
              </CloseButton>
              <ModalTitle>과제 확인하기</ModalTitle>
              <SubmissionList>
                {submissions.length === 0 ? (
                  <EmptyText>제출된 과제가 없습니다.</EmptyText>
                ) : (
                  submissions.map(s => (
                    <SubmissionItem key={s.submission_id}>
                      <SubmissionInfo>
                        <MiniAvatar src="/eum.png" alt="멘티" />
                        <MenteeName>{s.user_id}</MenteeName>
                        {s.file_url && (
                          <ExternalLink href={s.file_url} target="_blank" rel="noopener noreferrer">
                            {s.file_url}
                          </ExternalLink>
                        )}
                      </SubmissionInfo>
                      {s.status === "graded" ? (
                        <MiniButton variant="muted" disabled>
                          채점 완료
                        </MiniButton>
                      ) : (
                        <MiniButton variant="primary" onClick={() => handleOpenGrading(s)}>
                          채점 및 피드백
                        </MiniButton>
                      )}
                    </SubmissionItem>
                  ))
                )}
              </SubmissionList>
            </SubmissionListModal>
          )}

          {/* Mento: grading modal */}
          {gradingModal && (
            <MentoModal onClick={e => e.stopPropagation()}>
              <CloseButton type="button" onClick={closeAllModals}>
                ×
              </CloseButton>
              <ModalTitle>채점 및 피드백</ModalTitle>
              <FeedbackHeader>
                <FeedbackLine>
                  <MiniAvatar src="/eum.png" alt="멘티" />
                  <MenteeName>{gradingModal.user_id}</MenteeName>
                </FeedbackLine>
                <ScoreLine>
                  <ScoreText>채점 ({gradingScore}/100)</ScoreText>
                  <DotRow>
                    {[1, 2, 3, 4, 5].map(v => (
                      <Dot key={v} active={gradingScore >= v * 20} onClick={() => setGradingScore(v * 20)} />
                    ))}
                  </DotRow>
                </ScoreLine>
              </FeedbackHeader>
              <ModalForm onSubmit={e => e.preventDefault()}>
                <FormTextarea
                  placeholder="짧은 피드백을 남겨주세요"
                  value={gradingFeedback}
                  onChange={e => setGradingFeedback(e.target.value)}
                />
                <SubmitButton type="button" active={true} onClick={onSubmitGrading}>
                  채점 및 피드백하기
                </SubmitButton>
              </ModalForm>
            </MentoModal>
          )}

          {/* Menti: feedback modal */}
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
                    {new Array(5).fill(0).map((_, i) => (
                      <Dot key={i} active={i < feedbackScore} />
                    ))}
                  </DotRow>
                </ScoreLine>
              </FeedbackHeader>
              <FeedbackInput>{feedbackModalAssignment.submission?.feedback || "피드백 내용"}</FeedbackInput>
            </FeedbackModal>
          )}

          {/* Shared: notice detail modal */}
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
