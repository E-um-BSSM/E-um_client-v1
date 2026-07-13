// 공용 엔티티/페이지네이션/에러 타입. 명세 components.schemas 기준.

/** 회원 요약 정보. 작성자/사용자 표현에 재사용. */
export interface UserSummary {
  // ERD: users.id 는 varchar → string
  user_id: string;
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

/** 공통 에러 응답(4xx·5xx). */
export interface ErrorResponse {
  code: string;
  message: string;
  status: number;
  timestamp?: string;
  path?: string | null;
}
