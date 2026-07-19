import { isAxiosError } from "axios";
import type { ErrorResponse } from "@/models";

const DEFAULT_MESSAGE = "요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
const RATE_LIMIT_MESSAGE = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";

/**
 * 에러 객체에서 사용자에게 노출할 메시지를 추출한다.
 * axios 에러의 경우 서버가 반환한 ErrorResponse.message 를 우선 사용한다.
 */
export function getErrorMessage(error: unknown, fallback: string = DEFAULT_MESSAGE): string {
  if (isAxiosError<Partial<ErrorResponse>>(error)) {
    if (error.response?.status === 429) {
      return RATE_LIMIT_MESSAGE;
    }
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.length > 0) {
      return message;
    }
    if (error.message.length > 0) {
      return error.message;
    }
    return fallback;
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  if (typeof error === "string" && error.length > 0) {
    return error;
  }

  return fallback;
}
