
import React from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import QuizTest from '@/components/quiz/QuizTest';
import { getQuizById } from '@/data/questionSets';

const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  
  // Get quiz data based on quizId
  const quizData = getQuizById(quizId || '1');
  
  return (
    <PageContainer>
      <QuizTest 
        questions={quizData.questions} 
        title={quizData.title}
        returnPath="/quizzes"
      />
    </PageContainer>
  );
};

export default QuizPage;
