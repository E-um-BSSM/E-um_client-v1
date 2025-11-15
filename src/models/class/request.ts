export interface classRequest {
  title: string;
  description: string;
  difficulty: number;
  tags: string[];
  status: string;
}

export interface classSearchRequest {
  difficulty: number;
  tags: string[];
  status: string;
}

export interface assignmentSubmitRequest {
  content: string;
  file_url: string;
}

export interface assignmentRequest {
  title: string;
  description: string;
  due_date: string;
  difficulty: number;
}

export interface classNotificationRequest {
  title: string;
  content: string;
}

export interface classScheduleRequset {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
}
