import MentoringCardBase from "./MentoringCardBase";

interface MentoringCardProps {
  title: string;
  lecturer: string;
}

export function MentoringCard({ title, lecturer }: MentoringCardProps) {
  return <MentoringCardBase title={title} lecturer={lecturer} size="default" />;
}
