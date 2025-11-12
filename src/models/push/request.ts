export interface submitPushRequest {
  type: string;
  title: string;
  body: string;
  receivers: string[];
}

export interface readPushRequest {
  is_read: boolean;
  user_id: string;
}