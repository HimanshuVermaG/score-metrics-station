
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface Test {
  id: number;
  subject: string;
  title: string;
  date: string;
  score: number;
  highestScore: number;
  averageScore: number;
}

interface TestHistoryProps {
  recentTests: Test[];
}

const TestHistory: React.FC<TestHistoryProps> = ({ recentTests }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand-purple" />
          Recent Test History
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {recentTests.map((test) => (
            <Link 
              key={test.id} 
              to={`/tests/review/${test.id}`}
              className="block"
            >
              <div className="flex justify-between items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex flex-col">
                  <div className="font-medium">{test.title}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>{test.subject}</span>
                    <span>•</span>
                    <span>{test.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={getScoreColor(test.score)}>
                      {test.score}%
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      Avg: {test.averageScore}% | Top: {test.highestScore}%
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to="/tests" 
            className="text-sm text-brand-purple hover:underline"
          >
            View All Tests
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestHistory;
