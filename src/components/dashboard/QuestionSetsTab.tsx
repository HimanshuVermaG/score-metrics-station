
import React from 'react';
import QuestionSetCard from '@/components/ui/question-set-card';

interface QuestionSetsTabProps {
  activeTab: string;
}

const QuestionSetsTab: React.FC<QuestionSetsTabProps> = ({ activeTab }) => {
  // Only show this component if the active tab is "Question Sets"
  if (activeTab !== 'Question Sets') return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <QuestionSetCard
        subject="Math"
        questions={45}
        icon={<div className="bg-math-bg p-2 rounded">📐</div>}
        bgColor="bg-white"
        viewLink="/practice/math"
      />
      <QuestionSetCard
        subject="Hindi"
        questions={36}
        icon={<div className="bg-hindi-bg p-2 rounded">📚</div>}
        bgColor="bg-white"
        viewLink="/practice/hindi"
      />
      <QuestionSetCard
        subject="G.S."
        questions={50}
        icon={<div className="bg-gs-bg p-2 rounded">🔍</div>}
        bgColor="bg-white"
        viewLink="/practice/gs"
      />
      <QuestionSetCard
        subject="English"
        questions={40}
        icon={<div className="bg-english-bg p-2 rounded">✏️</div>}
        bgColor="bg-white"
        viewLink="/practice/english"
      />
    </div>
  );
};

export default QuestionSetsTab;
