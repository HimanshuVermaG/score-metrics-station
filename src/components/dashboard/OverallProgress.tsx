
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, TrendingUp, Target, BookOpen } from 'lucide-react';

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
    <Card className="border-none shadow-md mb-6 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-brand-purple" />
          <h2 className="text-xl font-bold">Overall Progress</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">Your academic journey this semester</p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-brand-purple" />
              <span className="text-sm font-medium">Current Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{totalProgress}%</span>
              <span className="text-xs text-gray-500">Target: {target}%</span>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-purple to-violet-400 rounded-full"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-brand-purple" />
          <h3 className="font-medium">Subject Progress</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectProgress.map((item, index) => (
            <div key={index} className={`rounded-lg p-3 ${item.bgColor} transition-all hover:shadow-md`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{item.subject}</span>
                <div className="flex items-center">
                  <span className="text-sm">{item.progress}%</span>
                  {item.progress > 75 && <TrendingUp className="ml-1 h-3 w-3 text-green-600" />}
                </div>
              </div>
              <Progress value={item.progress} className="h-1.5" 
                indicatorClassName={item.progress > 75 ? "bg-green-500" : 
                              item.progress > 50 ? "bg-amber-500" : "bg-red-500"}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallProgress;
