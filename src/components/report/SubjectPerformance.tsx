
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SubjectPerformanceProps {
  subjects: {
    name: string;
    score: number;
    tests: number;
    bgColor: string;
    improvement?: 'improving' | 'declining' | 'stable';
  }[];
}

const SubjectPerformance: React.FC<SubjectPerformanceProps> = ({ subjects }) => {
  const getImprovementIcon = (improvement?: 'improving' | 'declining' | 'stable') => {
    switch (improvement) {
      case 'improving':
        return <span className="text-green-500">↑</span>;
      case 'declining':
        return <span className="text-red-500">↓</span>;
      case 'stable':
        return <span className="text-gray-500">→</span>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg shadow bg-white p-5 mb-6">
      <h2 className="text-xl font-bold mb-4">Subject Performance</h2>
      
      <div className="space-y-6">
        {subjects.map((subject, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <h3 className="font-medium">{subject.name}</h3>
                {subject.improvement && (
                  <span className="ml-2">{getImprovementIcon(subject.improvement)}</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {subject.tests} tests completed
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`w-2 h-16 rounded-full ${subject.bgColor} mr-4`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Score</span>
                  <span className="text-sm font-medium">{subject.score}%</span>
                </div>
                <Progress value={subject.score} className="h-2 mb-3" />
                
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center">
                    <div className="text-sm font-medium">Accuracy</div>
                    <div className="text-lg">{Math.round(subject.score * 0.9)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">Speed</div>
                    <div className="text-lg">
                      {Math.round(75 + Math.random() * 20)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">Rank</div>
                    <div className="text-lg">
                      {Math.round(1 + Math.random() * 10)}/{30}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPerformance;
