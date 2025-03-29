
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface ProgressCardProps {
  title: string;
  progress: number;
  difficultyLevel?: 'Easy' | 'Medium' | 'Hard';
  inProgress?: boolean;
  actionText?: string;
  actionLink?: string;
  icon?: React.ReactNode;
  bgColor?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  difficultyLevel,
  inProgress = false,
  actionText = 'Practice',
  actionLink = '#',
  icon,
  bgColor = 'bg-white',
}) => {
  const getDifficultyColor = () => {
    switch (difficultyLevel) {
      case 'Easy':
        return 'bg-easy text-green-800';
      case 'Medium':
        return 'bg-medium text-orange-800';
      case 'Hard':
        return 'bg-hard text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`rounded-lg shadow p-4 mb-4 ${bgColor}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">Progress</p>
        </div>
        <div className="flex items-center space-x-2">
          {difficultyLevel && (
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor()}`}>
              {difficultyLevel}
            </span>
          )}
          {inProgress && (
            <div className="flex items-center text-blue-600 text-sm">
              <span className="mr-1.5 flex h-2 w-2 rounded-full bg-blue-600"></span>
              In progress
            </div>
          )}
        </div>
      </div>
      
      <Progress value={progress} className="h-2 mb-1" />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-medium">{progress}%</span>
        <Button variant="ghost" size="sm" asChild className="h-8 p-0 text-sm" aria-label={actionText}>
          <a href={actionLink} className="flex items-center">
            {actionText}
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProgressCard;
