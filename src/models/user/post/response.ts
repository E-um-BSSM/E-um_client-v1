export interface postCreateResponse {
  post_id: number;
  author_id: string;
  title: string;
  body: string;
  tags: string[];
  draft: boolean;
  create_at: string;
  updated_at: string;
}

export interface postListSearchResponse {}

export interface postSearchResponse {
  post_id: number;
  author_id: string;
  title: string;
  body: string;
  tags: string[];
  draft: boolean;
  created_at: string;
  updated_at: string; 
}

export interface postUpdateResponse {
  post_id: number;
  author_id: string;
  title: string;
  body: string;
  tags: string[];
  draft: boolean;
  created_at: string;
  updated_at: string;
}