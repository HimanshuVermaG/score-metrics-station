
import React from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import QuizTest from '@/components/quiz/QuizTest';
import { getTestQuestions } from '@/data/questions';

const TestPage = () => {
  const { testId } = useParams<{ testId: string }>();
  
  // In a real app, we would fetch the test data based on the testId
  // For now, we'll create mock data
  const testData = {
    id: testId || '1',
    title: 'Mathematics Unit Test',
    subject: 'Math',
    description: 'This test covers algebraic equations, geometry, and number theory.',
    duration: '45 minutes',
    totalQuestions: 15
  };
  
  // Get questions from our data
  const questions = getTestQuestions(testData.subject, testData.totalQuestions);

  return (
    <PageContainer>
      <QuizTest 
        questions={questions} 
        title={testData.title}
        returnPath="/tests"
      />
    </PageContainer>
  );
};

export default TestPage;
