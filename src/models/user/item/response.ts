export interface randomBoxResponse {
  box_id: number;
  item_id: number;
}

export interface itemSearchResponse {
  item_id: number;
  is_equipped: boolean;
  obtained_at: string;
}
