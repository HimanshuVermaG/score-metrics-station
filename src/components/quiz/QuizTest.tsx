
import React, { useState, useEffect } from 'react';
import { Question } from '@/data/questionTypes';
import QuizQuestion from './QuizQuestion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QuizTestProps {
  questions: Question[];
  title: string;
  onComplete?: (score: number, answers: number[]) => void;
  returnPath?: string;
}

const QuizTest: React.FC<QuizTestProps> = ({ 
  questions, 
  title, 
  onComplete,
  returnPath = '/quizzes'
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>(Array(questions.length).fill(false));
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = isCorrect;
    setAnswers(newAnswers);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    const score = (answers.filter(Boolean).length / questions.length) * 100;
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${Math.round(score)}% (${answers.filter(Boolean).length}/${questions.length} correct)`,
    });
    
    if (onComplete) {
      onComplete(score, selectedAnswers);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  if (isCompleted) {
    const correctAnswers = answers.filter(Boolean).length;
    const score = (correctAnswers / questions.length) * 100;
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-gray-600">You've completed the {title}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-700">Score</h3>
            <p className="text-3xl font-bold text-brand-purple">{Math.round(score)}%</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-700">Correct</h3>
            <p className="text-3xl font-bold text-green-600">{correctAnswers}/{questions.length}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-700">Time</h3>
            <p className="text-3xl font-bold text-blue-600">{formatTime(timeSpent)}</p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(returnPath)}
          >
            Back to {returnPath === '/quizzes' ? 'Quizzes' : 'Tests'}
          </Button>
          <Button 
            className="bg-brand-purple hover:bg-purple-700"
            onClick={() => navigate(`${returnPath}/review/123`)}
          >
            Review Answers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length} | Time: {formatTime(timeSpent)}
          </div>
        </div>
        
        <Progress 
          value={calculateProgress()} 
          className="h-2 mb-6" 
        />
        
        <QuizQuestion 
          question={questions[currentQuestionIndex]} 
          onAnswer={handleAnswer}
          showExplanation={true}
        />
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          
          {currentQuestionIndex < questions.length - 1 ? (
            <Button 
              onClick={handleNext} 
              className="bg-brand-purple hover:bg-purple-700 flex items-center"
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 flex items-center"
            >
              Complete <Check className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTest;
