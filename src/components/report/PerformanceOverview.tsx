
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Clock } from 'lucide-react';

interface Subject {
  name: string;
  score: number;
  tests: number;
  bgColor: string;
  improvement?: 'improving' | 'declining' | 'stable';
}

interface PerformanceOverviewProps {
  subjects: Subject[];
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({ subjects }) => {
  // Calculate overall score
  const overallScore = Math.round(
    subjects.reduce((sum, subject) => sum + subject.score, 0) / subjects.length
  );

  // Calculate average test completion time (mock data)
  const averageCompletionTime = '18 min';

  // Calculate improvement from previous period
  const improvement = '+4.2%';

  return (
    <Card className="col-span-2 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
            <div className="p-2 rounded-full bg-green-100">
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overall Score</p>
              <p className="text-xl font-bold">{overallScore}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
            <div className="p-2 rounded-full bg-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Completion Time</p>
              <p className="text-xl font-bold">{averageCompletionTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
            <div className="p-2 rounded-full bg-purple-100">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Improvement</p>
              <p className="text-xl font-bold">{improvement}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Subject Distribution</h3>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{subject.name}</span>
                  <span className="font-medium">{subject.score}%</span>
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
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
