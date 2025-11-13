export interface postCommentCreateResponse {
  post_id: number;
  body: string;
  is_adopted: boolean;
  created_at: string;
  updated_at: string;
}

export interface postCommentResponse {
  post_id: number;
  user_id: string;
  body: string;
  is_adopted: boolean;
  created_at: string;
  updated_at: string;
}