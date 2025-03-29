
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  // Determine status color
  const getStatusColor = () => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className={`rounded-lg shadow p-5 ${bgColor} mb-4`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="mr-3">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-lg">{subject}</h3>
            {status && (
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
                {status}
              </span>
            )}
          </div>
        </div>
        <div className="text-2xl font-bold">{score}%</div>
      </div>
      
      {recommendedPractice.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Recommended Practice</h4>
          <ul className="space-y-2">
            {recommendedPractice.map((item, index) => (
              <li key={index} className="text-sm">
                <Link to={item.link} className="text-brand-purple hover:underline flex items-center">
                  {item.title}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex justify-end mt-4">
        <Link 
          to={viewDetailsLink} 
          className="text-sm text-brand-purple hover:underline flex items-center"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default SubjectCard;
