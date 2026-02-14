import MentoringCardBase from "./MentoringCardBase";

interface MentoringCardProps {
  title: string;
  lecturer: string;
  onClick?: () => void;
}

export function MentoringCard({ title, lecturer, onClick }: MentoringCardProps) {
  return <MentoringCardBase title={title} lecturer={lecturer} size="default" onClick={onClick} />;
}
