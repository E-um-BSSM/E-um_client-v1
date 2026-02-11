export interface pushRequest {
  type: string;
  title: string;
  body: string;
  receivers: string[];
}

// Backward compatibility for existing imports
export type pustRequest = pushRequest;

export interface pushReadRequest {
  is_read: boolean;
}
