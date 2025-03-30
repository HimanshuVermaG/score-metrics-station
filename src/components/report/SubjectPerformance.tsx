
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronRight } from 'lucide-react';

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
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-purple" />
          Subject Performance
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {subjects.map((subject, index) => (
            <Link 
              key={index} 
              to={`/subject-progress/${subject.name.toLowerCase()}`}
              className="block"
            >
              <div className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <h3 className="font-medium">{subject.name}</h3>
                    {subject.improvement && (
                      <span className="ml-2">{getImprovementIcon(subject.improvement)}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm text-gray-500 mr-2">
                      {subject.tests} tests
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Score</span>
                    <span className="text-sm font-medium">{subject.score}%</span>
                  </div>
                  <Progress 
                    value={subject.score} 
                    className="h-2" 
                    indicatorClassName={`${
                      subject.score >= 80 ? 'bg-green-500' : 
                      subject.score >= 60 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-xs text-gray-500">Accuracy</div>
                    <div className="font-medium">{Math.round(subject.score * 0.9)}%</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-xs text-gray-500">Speed</div>
                    <div className="font-medium">
                      {Math.round(75 + Math.random() * 20)}%
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-xs text-gray-500">Rank</div>
                    <div className="font-medium">
                      {Math.round(1 + Math.random() * 10)}/{30}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectPerformance;
