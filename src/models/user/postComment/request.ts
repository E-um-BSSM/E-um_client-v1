export interface commnetCreateRequest {
  post_id: number;
  body: string;
}

export interface commentSearchRequest {
  post_id: number;
}

export interface commentDeleteRequest {
  post_id: number;
  commnets_id: number;
}

export interface commnetUpdateRequest {
  post_id: number;
  commnets_id: number;
  body: string;
}

export interface commnetAdoptRequest {
  post_id: number;
  commnets_id: number;
  is_adopted: boolean;
}