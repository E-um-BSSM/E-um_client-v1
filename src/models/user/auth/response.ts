// Auth 응답 모델. 명세 components.schemas 기준.

/** 인증 토큰 응답(로그인·재발급 성공 시). 유저 정보를 포함하지 않는다. */
export interface authTokens {
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
  expires_in: number;
}

/** 이메일 인증 결과. */
export interface verificationResult {
  verified: boolean;
}

/** 아이디·이메일 중복 확인 결과(available=true: 사용 가능). */
export interface availabilityResponse {
  available: boolean;
}
