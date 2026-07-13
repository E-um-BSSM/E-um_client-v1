# MVP API 레이어 정비 — 페이지 조정 필요 지점

API/모델/훅/스토어 레이어를 `EumMVPApi.json` 명세 + ERD에 맞춰 재정비했습니다.
**프로젝트 전체가 `tsc -b` 기준 0 에러**입니다.

처음에는 필드/메서드 rename으로 페이지 4개 파일에 45건의 타입 에러가 남았고,
이후 "데이터 연결부만 수정(로직·디자인 불변)" 요청에 따라 아래 4개 파일의 API 호출/필드 접근을
신규 레이어에 맞게 연결했습니다. (디자인/JSX 구조는 유지)

## 페이지 수정 내역 (데이터 연결부만)

- `components/layout/public/Header/index.tsx` — `user.system_role` 표시 제거(MVP 인증 응답에 역할 정보 없음).
- `pages/public/auth/SignUpPage/index.tsx` — `sendVerificationCode`→`sendEmailCode`, `signUp`→`signup({ ..., privacy_agreed })`(phone/auth_provider 제거).
- `pages/app/user/MyClassListPage/index.tsx` — `classPOST.classListSearch`→`classGET.getMyClasses`, `.items` 사용, `class_id`→`id`, `created_by`→`mentor?.username/nickname`. (레거시 normalize 헬퍼 제거)
- `pages/app/user/MyClassDetailPage/index.tsx` — 전 API 메서드명/필드명 교체, 응답 언래핑 제거, `assignment_id`→`id`, `submission.user_id`→`mentee.nickname`, 상태 `"graded"`→`"GRADED"`, 대기열 `m.user.*`, accept/remove에 `user.user_id` 전달. (공지는 기존 로직대로 schedule API 사용 유지)

> 참고: 초기 상태에서 발견된 조정 지점은 아래 원문에 그대로 보존합니다.

---

## (원문) 초기 발견된 조정 지점

## 핵심 변경 요약 (원인)

- 응답이 `{ success, data }` 래핑 없이 **엔티티를 직접 반환**합니다. → 페이지에서 `res.data` / `res.value.data` 언래핑 제거 필요.
- 목록 응답은 `PageResponse<T> = { items: T[]; page: PageMeta }` 형태. → `.content` / `.xxxs` 접근을 `.items`로 변경.
- 클래스 필드 rename: `class_id`/`classroom_id` → **`id`**, `created_by`(string) → **`mentor: UserSummary`**, `class_code`/`classroom_code` → **`invite_code`**(상세) / `InviteCode.code`.
- enum 값은 대문자 상수(`GRADED`, `SUBMITTED`, `MENTOR` …). → 소문자 비교(`"graded"`) 수정.
- API 메서드명이 operationId와 1:1로 변경됨(아래 표 참고).
- 로그인 응답은 `authTokens`만 반환(유저정보 없음). `AuthUser`는 `{ username }`만 보관.

## API 메서드 매핑 (기존 → 신규)

| 기존 호출 | 신규 호출 |
|---|---|
| `classGET.classSingleSearch(id)` | `classGET.getClass(id)` → `classDetailResponse` |
| `classPOST.classListSearch(params)` | `classGET.searchClasses(params)` / `classGET.getMyClasses(params)` → `classSummaryPageResponse` |
| `classDELETE.classDelete(id)` | `classDELETE.deleteClass(id)` |
| `assignmentGET.assignmentSearch(id)` | `assignmentGET.getAssignments(id, params?)` → `assignmentPageResponse` |
| `assignmentPOST.assignmentCreate(...)` | `assignmentPOST.createAssignment(classId, body)` |
| `inviteGET.classInviteCodeGet(id)` | `inviteGET.getInviteCode(id)` → `{ class_id, code, expires_at }` |
| `memberGET.waitingListSearch(id)` | `memberGET.getWaitingList(id, params?)` → `waitingMemberPageResponse` |
| `memberPATCH.memberAccept(id)` | `memberPATCH.acceptMember(classId, userId)` |
| `memberDELETE.memberDisagree(id)` | `memberDELETE.removeMember(classId, userId)` |
| `submissionGET.submissionSearch(c,a)` | `submissionGET.getSubmissions(c, a, params?)` → `submissionPageResponse` |
| `submissionPOST.submissionSubmit(...)` | `submissionPOST.submitAssignment(c, a, body)` |
| `submissionPATCH.submissionFeedback(...)` | `submissionPATCH.gradeSubmission(c, a, submissionId, body)` |
| `authPOST.signUp({...phone, auth_provider})` | `authPOST.signup({ username, email, password, privacy_agreed })` |
| `authPOST.signIn({email,password})` | `authPOST.signin({ username, password, keep_signed_in? })` |
| `authPOST.sendVerificationCode(...)` | `authPOST.sendEmailCode(...)` |

> 훅 사용을 권장: `useClass`, `useClassSearch`, `useMyClasses`, `useMembers`, `useWaitingList`,
> `useInviteCode`, `useAcceptMember`, `useApplicationForm`, `useAssignments`, `useSubmissions`,
> `useGradeSubmission`, `useNotices` 등 (`src/hooks`).

## 파일별 조정 지점

### 1) `src/components/layout/public/Header/index.tsx` (1건)
- `user.system_role` 참조(라인 76). `AuthUser`는 이제 `{ username }`만 가짐.
- 조정: 역할 표시가 필요하면 `useClass(...).my_role` 등 클래스 컨텍스트에서 가져오거나, 해당 `<span className="role">` 제거. `user.username`은 그대로 사용 가능.

### 2) `src/pages/public/auth/SignUpPage/index.tsx` (2건)
- 라인 86: `authPOST.sendVerificationCode` → `authPOST.sendEmailCode`.
- 라인 155: `authPOST.signUp({ username, email, password, phone, auth_provider })`
  → `authPOST.signup({ username, email, password, privacy_agreed: true })` (phone/auth_provider 제거, 동의값 전달).
- (참고) `authPOST.verifyEmailCode`는 이름 동일하게 유지되어 수정 불필요.

### 3) `src/pages/app/user/MyClassListPage/index.tsx` (14건)
- import `ClassroomListPayload` 제거(삭제된 타입).
- `classPOST.classListSearch({ classroomStatus })` → `classGET.getMyClasses({ membership, status })` 또는 `classGET.searchClasses(...)`.
  반환은 `classSummaryPageResponse` → 목록은 `res.items`.
- 카드 매핑: `item.class_id`/`classroom_id` → `item.id`, `item.created_by`(멘토명) → `item.mentor?.nickname`,
  `item.class_code`/`classroom_code` → (요약 응답엔 없음, 상세의 `invite_code` 사용).
- 멘토/멘티 구분 로직(`created_by === username`): 요약 응답엔 `created_by`가 없으므로
  `getMyClasses({ role: "MENTOR" | "MENTEE" })` 파라미터로 서버 필터링 권장.

### 4) `src/pages/app/user/MyClassDetailPage/index.tsx` (28건)
- import 제거/교체: `assignmentSearchResponse`→`assignmentResponse`, `classCodeResponse`→`inviteCodeResponse`, `waitingListResponse`→`waitingMemberResponse`.
- API 메서드명 전면 교체(위 매핑표 참고). 응답 언래핑(`.value.data`, `.data`) 제거 — 엔티티/`{items,page}` 직접 사용.
- 대기열: `memberRes.data.content ?? .waiting` → `getWaitingList(...).items` (각 항목은 `{ user, message, applied_at, answers }`).
- 초대코드: `inviteRes.value.data.class_code` → `getInviteCode(...).code`.
- 멘토명: `classInfo.created_by` → `classInfo.mentor?.nickname`.
- 초대코드 표시: `classInfo.class_code/classroom_code` → `classInfo.invite_code` (상세 응답).
- 제출물: `submission.submission_id` → `submission.id`, `submission.user_id` → `submission.mentee.user_id`(및 `nickname`).
- 상태 비교: `=== "graded"` → `=== "GRADED"` (`SubmissionStatus`).
- `acceptMember`/`removeMember`는 이제 `(classId, userId)` 2-인자 — 대상 멘티의 `user.user_id` 전달 필요.

## 참고 (명세/ERD 불일치 및 결정 사항)

- **userId 타입**: ERD(`users.id` = `varchar`) 기준으로 `UserSummary.user_id` 및 `acceptMember`/`removeMember`/member 훅의 `userId`를 **`string`**으로 정의했습니다. (클래스·과제·제출·공지 ID는 ERD `bigint` → `number` 유지.)
- **로그인 필드**: 명세 로그인은 `username` 기반입니다. `LoginPage`는 디자인(‘이메일’ 입력)을 유지한 채
  입력값을 `username`으로 전송하도록 임시 연결했습니다(`signin({ username: email, ... })`). 라벨/필드 정합은 별도 논의 필요.
- **BSM 로그인 삭제**: 요청에 따라 제거했습니다 — `BSMCallbackPage`, `App.tsx`의 `bsm/callback` 라우트,
  `LoginPage`의 BSM 버튼/핸들러, `apis/user/auth/get.ts`의 `bsmLogin`/`bsmCallback`. (`signInResponse` 레거시 타입도 미사용.)
- **out-of-MVP 보존**: `apis/class/schedule/*` 및 스케줄 타입, `ApiResponse`/`globalResponse`, post/push/transaction/badge/item/profile/review 도메인은 그대로 두었습니다.
