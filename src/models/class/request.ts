import type {
  AccessScope,
  ClassSearchSort,
  ClassStatus,
  MemberStatus,
  QuestionType,
  Role,
  SubmissionStatus,
} from "@/models/global";
import type { applicationAnswer } from "./response";

/* =========================================================
 * 공용 페이지 파라미터
 * ======================================================= */

/** 목록 조회 공용 페이지 파라미터. */
export interface pageRequest {
  page?: number;
  size?: number;
}

/* =========================================================
 * Class
 * ======================================================= */

/** 클래스 개설 요청. */
export interface classCreateRequest {
  title: string;
  description?: string | null;
  difficulty: number;
  tags?: string[];
  access_scope: AccessScope;
  banner_image_url?: string | null;
  mentor_introduction?: string | null;
  guide?: string | null;
}

/** 클래스 수정 요청(전달된 필드만 부분 수정). */
export interface classUpdateRequest {
  title?: string | null;
  description?: string | null;
  difficulty?: number | null;
  tags?: string[] | null;
  access_scope?: AccessScope | null;
  status?: ClassStatus | null;
  banner_image_url?: string | null;
  mentor_introduction?: string | null;
  guide?: string | null;
}

/** 클래스 탐색(검색) 쿼리 파라미터. */
export interface classSearchRequest {
  keyword?: string;
  difficulty?: number;
  status?: ClassStatus;
  sort?: ClassSearchSort;
  page?: number;
  size?: number;
}

/** 내 클래스 조회 쿼리 파라미터. */
export interface myClassSearchRequest {
  role?: Role;
  status?: ClassStatus;
  membership?: MemberStatus;
  page?: number;
  size?: number;
}

/* =========================================================
 * Member (가입 신청)
 * ======================================================= */

/** 클래스 가입 신청 요청(UNLISTED는 초대 코드 필요). */
export interface joinRequest {
  invite_code?: string | null;
  message?: string | null;
  answers?: applicationAnswer[] | null;
}

/** 초대 코드로 가입 신청 요청. invite_code가 반드시 필요하다. */
export interface joinByCodeRequest extends joinRequest {
  invite_code: string | null;
}

/* =========================================================
 * Assignment
 * ======================================================= */

export interface assignmentCreateRequest {
  title: string;
  description?: string | null;
  due_date?: string | null;
  difficulty?: number | null;
}

export interface assignmentUpdateRequest {
  title?: string | null;
  description?: string | null;
  due_date?: string | null;
  difficulty?: number | null;
}

/* =========================================================
 * Submission
 * ======================================================= */

export interface submissionCreateRequest {
  content?: string | null;
  file_url?: string | null;
}

export interface submissionFeedbackRequest {
  score: number;
  feedback: string;
}

/** 제출물 목록 조회 쿼리 파라미터. */
export interface submissionSearchRequest {
  status?: SubmissionStatus;
  page?: number;
  size?: number;
}

/* =========================================================
 * Notice
 * ======================================================= */

export interface noticeCreateRequest {
  title: string;
  content: string;
}

export interface noticeUpdateRequest {
  title?: string | null;
  content?: string | null;
}

/* =========================================================
 * Application (지원서 폼 설정)
 * ======================================================= */

/** 지원서 질문 입력(신규 문항은 id 없이 전달). */
export interface applicationQuestionInput {
  type: QuestionType;
  title: string;
  description?: string | null;
  required?: boolean;
  max_length?: number | null;
  options?: string[] | null;
}

/** 지원서 폼 설정/수정 요청(전달한 질문 목록으로 폼 전체 대체). */
export interface applicationFormUpdateRequest {
  questions?: applicationQuestionInput[] | null;
}
