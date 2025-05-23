
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuestionSetCardProps {
  subject: string;
  questions: number;
  icon: React.ReactNode;
  bgColor?: string;
  viewLink?: string;
}

const QuestionSetCard: React.FC<QuestionSetCardProps> = ({
  subject,
  questions,
  icon,
  bgColor = 'bg-white',
  viewLink = '#',
}) => {
  const getSubjectSlug = (subject: string) => {
    if (subject === 'G.S.') return 'gs';
    return subject.toLowerCase();
  };

  // If viewLink is the default '#', generate a link to the subject page
  const actualLink = viewLink === '#' ? `/practice/${getSubjectSlug(subject)}` : viewLink;

  return (
    <div className={`rounded-lg shadow p-4 ${bgColor} hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded">{icon}</div>
        <span className="text-sm">{questions} Questions</span>
      </div>
      
      <div className="mt-8">
        <h3 className="font-medium text-lg">{subject}</h3>
        <p className="text-sm text-gray-500 mb-2">Latest question sets</p>
        
        <div className="flex justify-end mt-4">
          <Link 
            to={actualLink} 
            className="flex items-center text-sm text-gray-600 hover:text-brand-purple"
          >
            View
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionSetCard;
