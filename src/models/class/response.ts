export interface classResponse {
  class_id: number;
  title: string;
  class_code: number;
  description: string;
  tags: string[];
  difficulty: number;
  created_by: string;
}

export interface assignmentSubmitResponse {
  content: string;
  file_url: string;
  submitted_at: string;
}

export interface memberAcceptResponse {
  user_id: string;
  joined_at: string;
}

export interface assignmentSearchResponse {
  assignment_id: number;
  title: string;
  description: string;
  due_date: string;
  created_at: string;
  status: string;
  graded: boolean;
}

export interface assignmentResponse {
  assignment_id: number;
  title: string;
  description: string;
  due_date: string;
  difficulty: number;
  created_at: string;
}

export interface classNotificationResponse {
  notification_id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface classScheduleResponse {
  schedule_id: number;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}
