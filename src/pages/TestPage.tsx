
import React from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import QuizTest from '@/components/quiz/QuizTest';
import { getTestById } from '@/data/questionSets';

const TestPage = () => {
  const { testId } = useParams<{ testId: string }>();
  
  // Get test data based on testId
  const testData = getTestById(testId || '1');
  
  return (
    <PageContainer>
      <QuizTest 
        questions={testData.questions} 
        title={testData.title}
        returnPath="/tests"
      />
    </PageContainer>
  );
};

export default TestPage;
