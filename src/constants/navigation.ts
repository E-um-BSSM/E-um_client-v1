export const LANDING_NAV_ITEMS = {
  "#MAIN": "메인",
  "#FEATURE": "기능",
  "#TOGETHER": "함께하기",
  "#CONNECT": "이어가기",
} as const;

export const APP_NAV_ITEMS = {
  "/app": "홈",
  "/app/mento/list": "멘토-멘티",
  "/app/user/class/list": "내 클래스",
  "/app/community": "커뮤니티",
  "/app/store": "상점",
} as const;

export const NAV_ITEMS = {
  landing: LANDING_NAV_ITEMS,
  app: APP_NAV_ITEMS,
} as const;

