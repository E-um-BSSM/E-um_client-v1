export type NotificationStatus =
  | "class_schedule"
  | "assignment"
  | "waiting_list"
  | "class_joined"
  | "announcement"
  | "comment"
  | "question_answered";

export interface MyMentoringCardProps {
  status: NotificationStatus;
}