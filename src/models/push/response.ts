export interface pushReadResponse {
  push_id: number;
  user_id: string;
  is_read: boolean;
  read_at: string;
}

export interface pushSearchResponse {
  push_id: number;
  type: string;
  title: string;
  body: string;
  created_at: string;
  is_read: boolean;
  read_at: string;
}