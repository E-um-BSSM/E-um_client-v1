// 공용 enum(문자열 리터럴 유니온). 명세 components.schemas 기준.

/** 역할 구분. MENTOR: 클래스 개설·운영, MENTEE: 참여. */
export type Role = string;

/** 클래스 진행 상태. */
export type ClassStatus = string;

/** 클래스 공개 설정. */
export type AccessScope = string;

/** 멤버 가입 상태. */
export type MemberStatus = string;

/** 제출물 상태. */
export type SubmissionStatus = string;

/** 지원서 질문 유형. */
export type QuestionType = string;

/** 클래스 탐색 정렬 기준. OpenAPI는 문자열 값만 명세한다. */
export type ClassSearchSort = string;
