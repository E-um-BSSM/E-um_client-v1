export interface signUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface signInRequest {
  email: string;
  password: string;
}

export interface refreshRequest {
  refresh_token: string;
}

export interface signOutRequest {
  refresh_token: string;
}
