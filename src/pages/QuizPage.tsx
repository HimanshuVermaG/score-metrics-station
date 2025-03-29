
import React from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import QuizTest from '@/components/quiz/QuizTest';
import { getTestQuestions } from '@/data/questions';

const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  
  // In a real app, we would fetch the quiz data based on the quizId
  // For now, we'll create mock data
  const quizData = {
    id: quizId || '1',
    title: 'Quick Math Quiz',
    subject: 'Math',
    description: 'A quick quiz to test your mathematical knowledge.',
    duration: '15 minutes',
    totalQuestions: 10
  };
  
  // Get questions from our data
  const questions = getTestQuestions(quizData.subject, quizData.totalQuestions);

  return (
    <PageContainer>
      <QuizTest 
        questions={questions} 
        title={quizData.title}
        returnPath="/quizzes"
      />
    </PageContainer>
  );
};

export default QuizPage;
