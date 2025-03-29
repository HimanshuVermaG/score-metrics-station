
import React from 'react';

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

  return (
    <div className="rounded-lg shadow bg-white p-5 mb-6">
      <h2 className="text-xl font-bold mb-4">Class Ranking</h2>
      
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <div className="flex-1 text-center p-4 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-1">Overall Rank</h3>
          <div className="text-3xl font-bold mb-1">{currentRank}/{totalStudents}</div>
          <div className="flex items-center justify-center text-sm">
            {rankChange > 0 ? (
              <span className="text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Improved by {rankChange} position{rankChange !== 1 ? 's' : ''}
              </span>
            ) : rankChange < 0 ? (
              <span className="text-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Dropped by {Math.abs(rankChange)} position{Math.abs(rankChange) !== 1 ? 's' : ''}
              </span>
            ) : (
              <span className="text-gray-500">No change in ranking</span>
            )}
          </div>
        </div>
        
        <div className="flex-1 text-center p-4 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-1">Best Performing Subject</h3>
          <div className="text-3xl font-bold mb-1">{topSubject}</div>
          <div className="text-sm text-gray-500">
            Ranked {topSubjectRank} in class
          </div>
        </div>
        
        <div className="flex-1 text-center p-4 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-1">Category</h3>
          <div className="text-3xl font-bold mb-1">
            {currentRank <= Math.floor(totalStudents * 0.1) ? 'Top 10%' : 
             currentRank <= Math.floor(totalStudents * 0.25) ? 'Top 25%' : 
             currentRank <= Math.floor(totalStudents * 0.5) ? 'Top 50%' : 'Bottom 50%'}
          </div>
          <div className="text-sm text-gray-500">
            Keep up the good work!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRanking;
