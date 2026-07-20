// 공용 엔티티/페이지네이션/에러 타입. 명세 components.schemas 기준.

/** 회원 요약 정보. 작성자/사용자 표현에 재사용. */
export interface UserSummary {
  user_id: number;
  username: string;
  nickname: string;
  avatar_url?: string | null;
}

/** 페이지네이션 메타데이터. 모든 목록 응답의 page 필드에 포함. */
export interface PageMeta {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  has_next: boolean;
}

/** 페이지네이션 목록 응답 래퍼. { items, page } 형태. */
export interface PageResponse<T> {
  items: T[];
  page: PageMeta;
}

/** OpenAPI Error.code 값. */
export type ErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "USERNAME_TAKEN"
  | "EMAIL_TAKEN"
  | "EMAIL_NOT_VERIFIED"
  | "PRIVACY_NOT_AGREED"
  | "INVALID_VERIFICATION_CODE"
  | "INVALID_CREDENTIALS"
  | "INVALID_REFRESH_TOKEN"
  | "INVALID_ACCESS_TOKEN"
  | "INVALID_RESET_TOKEN"
  | "TOO_MANY_REQUESTS"
  | "USER_NOT_FOUND"
  | "CLASS_NOT_FOUND"
  | "NOT_CLASS_MENTOR"
  | "ALREADY_MEMBER"
  | "INVITE_CODE_REQUIRED"
  | "INVALID_INVITE_CODE"
  | "NO_INVITE_CODE"
  | "MEMBER_NOT_FOUND"
  | "NOT_WAITING_MEMBER"
  | "NOT_CLASS_MEMBER"
  | "APPLICATION_QUESTION_NOT_FOUND"
  | "ASSIGNMENT_NOT_FOUND"
  | "SUBMISSION_NOT_FOUND"
  | "ALREADY_SUBMITTED"
  | "NOT_CLASS_MENTEE"
  | "NOT_SUBMISSION_OWNER"
  | "NOTICE_NOT_FOUND";

/** 공통 에러 응답(4xx·5xx). */
export interface ErrorResponse {
  code: ErrorCode;
  message: string;
  status: number;
  timestamp: string;
  path: string;
}
