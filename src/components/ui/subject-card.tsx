
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
  recommendedPractice = [],
}) => {
  return (
    <div className={`rounded-lg shadow ${bgColor} p-5 mb-4`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-opacity-20 mr-3">
            {icon}
          </span>
          <div>
            <h3 className="font-medium text-lg">{subject}</h3>
            <div className="flex items-center">
              <span className="font-medium">{score}%</span>
              {status && <span className="text-gray-500 text-sm ml-2">{status}</span>}
            </div>
          </div>
        </div>
        <a
          href={viewDetailsLink}
          className="text-sm text-gray-600 hover:text-brand-purple hover:underline"
        >
          View Details
        </a>
      </div>

      {recommendedPractice.length > 0 && (
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Recommended practice:</h4>
          {recommendedPractice.map((practice, index) => (
            <a
              key={index}
              href={practice.link}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 text-sm mb-1"
            >
              <span>{practice.title}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectCard;
