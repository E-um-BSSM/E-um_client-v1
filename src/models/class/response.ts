export interface classResponse {
  title: string;
  description: string;
  tags: string[];
  difficulty: number;
  classroom_id: number;
  classroom_code: string | null;
  created_by: string;
  // backward compatibility for existing UI usages
  class_id?: number;
  class_code?: string | null;
}

export interface ClassroomListPayload {
  classrooms: classResponse[];
}

export interface submissionResponse {
  content: string;
  file_url: string;
  submitted_at: string;
  user_id: string;
  graded_at: string;
  score: number;
  feedback: string;
  status: string;
  submission_id: number;
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
  difficulty: number;
  graded?: boolean;
}

export interface assignmentResponse {
  assignment_id: number;
  title: string;
  description: string;
  due_date: string;
  difficulty: number;
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
  class_id: number;
  location: string;
  status: string;
}

export interface waitingListResponse {
  user_id: string;
  joined_at: string;
  status: string;
}

export interface classScheduleIdResponse{
  schedule_id: number;
}

export interface submissionIdResponse{
  submission_id: number;
}

export interface classJoinResponse{
  message: string;
}

export interface classCodeResponse{
  class_code: string;
}
