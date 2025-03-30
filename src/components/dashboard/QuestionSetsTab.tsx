
import React from 'react';
import { Link } from 'react-router-dom';
import QuestionSetCard from '@/components/ui/question-set-card';
import { allQuestions } from '@/data/questionSets';

interface QuestionSetsTabProps {
  activeTab: string;
}

const QuestionSetsTab: React.FC<QuestionSetsTabProps> = ({ activeTab }) => {
  // Only show this component if the active tab is "Question Sets"
  if (activeTab !== 'Question Sets') return null;

  // Count questions in each subject
  const mathCount = allQuestions.Math.length;
  const englishCount = allQuestions.English.length;
  const hindiCount = allQuestions.Hindi.length;
  const gsCount = allQuestions["G.S."].length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <Link to="/practice/math">
        <QuestionSetCard
          subject="Math"
          questions={mathCount}
          icon={<div className="bg-math-bg p-2 rounded">📐</div>}
          bgColor="bg-white"
          viewLink="/practice/math"
        />
      </Link>
      <Link to="/practice/hindi">
        <QuestionSetCard
          subject="Hindi"
          questions={hindiCount}
          icon={<div className="bg-hindi-bg p-2 rounded">📚</div>}
          bgColor="bg-white"
          viewLink="/practice/hindi"
        />
      </Link>
      <Link to="/practice/gs">
        <QuestionSetCard
          subject="G.S."
          questions={gsCount}
          icon={<div className="bg-gs-bg p-2 rounded">🔍</div>}
          bgColor="bg-white"
          viewLink="/practice/gs"
        />
      </Link>
      <Link to="/practice/english">
        <QuestionSetCard
          subject="English"
          questions={englishCount}
          icon={<div className="bg-english-bg p-2 rounded">✏️</div>}
          bgColor="bg-white"
          viewLink="/practice/english"
        />
      </Link>
    </div>
  );
};

export default QuestionSetsTab;
