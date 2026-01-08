export interface postResponse {
  post_id: number;
  author_id: string;
  title: string;
  body: string;
  tags: string[];
  draft: boolean;
  created_at: string;
  updated_at: string;
}

export interface postListResponse {
  post_id: number;
  author_id: string;
  title: string;
  tags: string[];
  draft: string;
  created_at: string;
  updated_at: string;
}