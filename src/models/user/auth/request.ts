// Auth 요청 모델. 명세 components.schemas 기준.

/** 회원가입 요청. */
export interface signupRequest {
  username: string;
  email: string;
  password: string;
  privacy_agreed: boolean;
}

/** 로그인 요청(아이디 기반). */
export interface signinRequest {
  username: string;
  password: string;
  keep_signed_in?: boolean;
}

/** 액세스 토큰 재발급 요청. */
export interface refreshRequest {
  refresh_token: string;
}

/** 이메일 인증코드 발송 요청. */
export interface emailSendRequest {
  email: string;
}

/** 이메일 인증코드 확인 요청. */
export interface emailVerifyRequest {
  email: string;
  code: string;
}

/** 비밀번호 재설정 메일 요청(비밀번호 찾기). */
export interface passwordResetRequest {
  email: string;
}

/** 비밀번호 재설정 확정. */
export interface passwordResetConfirm {
  token: string;
  new_password: string;
}
