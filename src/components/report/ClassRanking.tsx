
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Medal, TrendingDown, TrendingUp, Users } from 'lucide-react';

interface ClassRankingProps {
  studentName: string;
  currentRank: number;
  totalStudents: number;
  previousRank: number;
  topSubject: string;
  topSubjectRank: number;
}

const ClassRanking: React.FC<ClassRankingProps> = ({
  studentName,
  currentRank,
  totalStudents,
  previousRank,
  topSubject,
  topSubjectRank,
}) => {
  const rankChange = previousRank - currentRank;
  const rankPercentile = Math.round((totalStudents - currentRank) / totalStudents * 100);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-purple" />
          Class Ranking
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold">{currentRank}</div>
                <div className="text-sm text-gray-500">of {totalStudents}</div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 bg-brand-purple text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
              {rankPercentile}%
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mb-4">
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <div className="font-medium">Change</div>
            <div className="flex items-center justify-center mt-1">
              {rankChange > 0 ? (
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{rankChange}
                </span>
              ) : rankChange < 0 ? (
                <span className="text-red-600 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  {rankChange}
                </span>
              ) : (
                <span className="text-gray-500">No change</span>
              )}
            </div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <div className="font-medium">Top Subject</div>
            <div className="flex items-center justify-center mt-1">
              <Medal className="h-4 w-4 mr-1 text-amber-500" />
              <span>{topSubject} (#{topSubjectRank})</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="font-medium">Category</div>
          <div className="text-lg font-bold mt-1">
            {currentRank <= Math.floor(totalStudents * 0.1) ? 'Top 10%' : 
             currentRank <= Math.floor(totalStudents * 0.25) ? 'Top 25%' : 
             currentRank <= Math.floor(totalStudents * 0.5) ? 'Top 50%' : 'Bottom 50%'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassRanking;
