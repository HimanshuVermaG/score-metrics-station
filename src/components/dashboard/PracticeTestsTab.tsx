
import React from 'react';
import ProgressCard from '@/components/ui/progress-card';

interface PracticeTestsTabProps {
  activeTab: string;
}

const PracticeTestsTab: React.FC<PracticeTestsTabProps> = ({ activeTab }) => {
  // Only show this component if the active tab is "Practice Tests"
  if (activeTab !== 'Practice Tests') return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <h3 className="font-medium mb-2">Math</h3>
        <ProgressCard
          title="Algebra Test"
          progress={75}
          difficultyLevel="Medium"
          inProgress={true}
          actionText="Continue"
          actionLink="/tests/math/algebra"
          bgColor="bg-white"
        />
        <ProgressCard
          title="Geometry Test"
          progress={60}
          difficultyLevel="Hard"
          actionText="Start"
          actionLink="/tests/math/geometry"
          bgColor="bg-white"
        />
      </div>
      <div>
        <h3 className="font-medium mb-2">English</h3>
        <ProgressCard
          title="Grammar Test"
          progress={85}
          difficultyLevel="Easy"
          actionText="Review"
          actionLink="/tests/english/grammar"
          bgColor="bg-white"
        />
        <ProgressCard
          title="Comprehension Test"
          progress={40}
          difficultyLevel="Medium"
          inProgress={true}
          actionText="Continue"
          actionLink="/tests/english/comprehension"
          bgColor="bg-white"
        />
      </div>
    </div>
  );
};

export default PracticeTestsTab;
