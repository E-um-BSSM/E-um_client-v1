import MentoringCardBase from "@/components/feature/cards/MentoringCard/MentoringCardBase";

interface MiniMentoringCardProps {
  title: string;
  lecturer: string;
  onClick?: () => void;
}

export function MiniMentoringCard({ title, lecturer, onClick }: MiniMentoringCardProps) {
  return <MentoringCardBase title={title} lecturer={lecturer} size="mini" onClick={onClick} />;
}
