export interface signUpResponse {
  username: string;
  email: string;
  system_role: string;
  strength: number;
  created_at: string;
  currency: number;
  daily_compensation_at: string;
  equipped_badge: string;
}

export interface signInResponse {
  username: string;
  system_role: string;
  access_token: string;
  refresh_token: string;
  expires_in: string;
  currency: number;
  daily_compensation_at: string;
  equipped_badge: string;
}

export interface refreshResponse {
  access_token: string;
  expires_in: string;
}

export interface signOutResponse {
  message: string;
}
