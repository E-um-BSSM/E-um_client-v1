export interface commentCreateResponse {
  post_id: number;
  body: string;
  is_adopted: boolean;
  created_at: string;
  updated_at: string;
}

export interface commentSearchResponse {
  post_id: number;
  user_id: string;
  body: string;
  is_adopted: boolean;
  created_at: string;
  updated_at: string; 
}

export interface commentUpdateResponse {
  post_id: number;
  body: string;
  is_adopted: boolean;
  created_at: string;
  updated_at: string;
}

export interface commentAdoptResponse {
  post_id: number;
  user_id: string;
  body: string;
  is_adopted: boolean;
  created_at: string;
  updated_at: string;
}