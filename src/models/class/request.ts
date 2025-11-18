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

export interface assignmentRequest {
  title: string;
  description: string;
  due_date: string;
  difficulty: number;
}

export interface classScheduleRequset {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  status: string;
}

export interface submissionRequest {
  content: string;
  file_url: string;
}

export interface submissionFeedbackRequest {
  feedback: string;
  score: number;
}
