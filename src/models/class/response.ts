import type {
  AccessScope,
  ClassStatus,
  MemberStatus,
  QuestionType,
  Role,
  SubmissionStatus,
  UserSummary,
  PageResponse,
} from "@/models/global";

/* =========================================================
 * Class
 * ======================================================= */

/** 클래스 기본 정보(개설·수정 응답, 목록 항목의 기반). */
export interface classResponse {
  id: number;
  title: string;
  description?: string | null;
  difficulty: number;
  tags?: string[];
  access_scope: AccessScope;
  status: ClassStatus;
  banner_image_url?: string | null;
  mentor: UserSummary;
  mentee_count?: number;
  created_at?: string;
  updated_at?: string;
  mentor_introduction?: string | null;
  guide?: string | null;
}

/** 클래스 상세(기본 정보 + 초대코드·과제수·내 역할). */
export interface classDetailResponse extends classResponse {
  invite_code?: string | null;
  assignment_count?: number;
  my_role?: Role | null;
}

/** 클래스 목록용 요약(탐색·내 클래스 카드). */
export interface classSummaryResponse {
  id: number;
  title: string;
  banner_image_url?: string | null;
  difficulty: number;
  status: ClassStatus;
  mentor?: UserSummary;
  mentee_count?: number;
}

export type classSummaryPageResponse = PageResponse<classSummaryResponse>;

/* =========================================================
 * Member / Invite
 * ======================================================= */

/** 클래스 초대 코드. */
export interface inviteCodeResponse {
  class_id: number;
  code: string;
  expires_at?: string | null;
}

/** 클래스 멤버(수락된 멘티/멘토). */
export interface memberResponse {
  user: UserSummary;
  role: Role;
  status: MemberStatus;
  joined_at?: string | null;
}

/** 가입 대기 멤버(멘토 대기열 화면). */
export interface waitingMemberResponse {
  user: UserSummary;
  message?: string | null;
  applied_at: string;
  answers?: applicationAnswer[] | null;
}

export type memberPageResponse = PageResponse<memberResponse>;
export type waitingMemberPageResponse = PageResponse<waitingMemberResponse>;

/* =========================================================
 * Assignment
 * ======================================================= */

/** 과제 정보(멘토 뷰: 제출 수 / 멘티 뷰: 내 제출 상태). */
export interface assignmentResponse {
  id: number;
  class_id: number;
  title: string;
  description?: string | null;
  due_date?: string | null;
  difficulty?: number | null;
  submission_count?: number;
  my_submission_status?: SubmissionStatus | null;
  created_at?: string;
}

export type assignmentPageResponse = PageResponse<assignmentResponse>;

/* =========================================================
 * Submission
 * ======================================================= */

/** 과제 제출물. */
export interface submissionResponse {
  id: number;
  assignment_id: number;
  mentee: UserSummary;
  content?: string | null;
  file_url?: string | null;
  status: SubmissionStatus;
  score?: number | null;
  feedback?: string | null;
  submitted_at: string;
  graded_at?: string | null;
}

export type submissionPageResponse = PageResponse<submissionResponse>;

/* =========================================================
 * Notice
 * ======================================================= */

/** 클래스 공지사항. */
export interface noticeResponse {
  id: number;
  class_id: number;
  title: string;
  content: string;
  author: UserSummary;
  created_at: string;
  updated_at?: string;
}

export type noticePageResponse = PageResponse<noticeResponse>;

/* =========================================================
 * Application (지원서)
 * ======================================================= */

/** 지원서 질문(멘토가 구성하는 신청 폼의 개별 문항). */
export interface applicationQuestionResponse {
  id: number;
  type: QuestionType;
  order?: number;
  title: string;
  description?: string | null;
  required?: boolean;
  max_length?: number | null;
  options?: string[] | null;
}

/** 클래스 지원서 폼. */
export interface applicationFormResponse {
  class_id: number;
  questions: applicationQuestionResponse[];
}

/** 지원서 답변(가입 신청 시 각 질문 응답). request/response 공용. */
export interface applicationAnswer {
  question_id: number;
  value?: string | null;
}
