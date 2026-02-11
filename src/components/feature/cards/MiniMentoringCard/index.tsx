import MentoringCardBase from "@/components/feature/cards/MentoringCard/MentoringCardBase";

interface MiniMentoringCardProps {
  title: string;
  lecturer: string;
}

export function MiniMentoringCard({ title, lecturer }: MiniMentoringCardProps) {
  return <MentoringCardBase title={title} lecturer={lecturer} size="mini" />;
}
