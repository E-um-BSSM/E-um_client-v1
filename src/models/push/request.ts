export interface pustRequest {
  type: string;
  title: string;
  body: string;
  receivers: string[];
}

export interface pushReadRequest {
  is_read: boolean;
}