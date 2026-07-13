// 공용 enum(문자열 리터럴 유니온). 명세 components.schemas 기준.

/** 역할 구분. MENTOR: 클래스 개설·운영, MENTEE: 참여. */
export type Role = "MENTOR" | "MENTEE";

/** 클래스 진행 상태. */
export type ClassStatus = "RECRUITING" | "ACTIVE" | "CLOSED";

/** 클래스 공개 설정. */
export type AccessScope = "PUBLIC" | "UNLISTED" | "PRIVATE";

/** 멤버 가입 상태. */
export type MemberStatus = "WAITING" | "ACCEPTED" | "REJECTED";

/** 제출물 상태. */
export type SubmissionStatus = "SUBMITTED" | "GRADED";

/** 지원서 질문 유형. */
export type QuestionType = "SHORT_TEXT" | "SINGLE_CHOICE" | "LONG_TEXT";
