import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Book } from 'lucide-react';
interface SubjectCardProps {
  subject: string;
  score: number;
  status?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  viewDetailsLink?: string;
  recommendedPractice?: {
    title: string;
    link: string;
  }[];
}
const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  score,
  status,
  icon = <Book />,
  bgColor = 'bg-white',
  viewDetailsLink = '#',
  recommendedPractice = []
}) => {
  return;
};
export default SubjectCard;