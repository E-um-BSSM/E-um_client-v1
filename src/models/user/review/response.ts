export interface reviewSearchResponse {
  tag: string;
  created_at: string;
  updated_at: string;
  reviewer_name: string;
  reviewee_name: string;
  class_id: number;
  review_id: number;
}

export interface reviewResponse {
  tag: string;
  created_at: string;
  updated_at: string;
}
