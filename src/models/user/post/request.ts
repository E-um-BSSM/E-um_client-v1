export interface postCreateRequest {
  title: string;
  body: string;
  tags: string[];
  draft: boolean;
}

export interface postSearchRequest {
  post_id: number;
}

export interface postUpdateRequest {
  post_id: number;
  title: string;
  body: string;
  tags: string[];
  draft: boolean;
}

export interface postDeleteRequest {
  post_id: number;
}