
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface OverallProgressProps {
  totalProgress: number;
  target: number;
  subjectProgress: {
    subject: string;
    progress: number;
    bgColor: string;
  }[];
}

const OverallProgress: React.FC<OverallProgressProps> = ({
  totalProgress,
  target,
  subjectProgress,
}) => {
  return (
    <div className="rounded-lg shadow bg-white p-5 mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Overall Progress</h2>
        <p className="text-sm text-gray-500">Your academic journey this semester</p>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">{totalProgress}% Complete</span>
          <span className="text-sm text-gray-500">Target: {target}%</span>
        </div>
        <Progress value={totalProgress} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {subjectProgress.map((item, index) => (
          <div key={index} className={`rounded-lg p-2 ${item.bgColor}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{item.subject}</span>
              <span className="text-sm">{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="h-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallProgress;
