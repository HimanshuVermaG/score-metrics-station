
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getTestQuestions } from '@/data/questions';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { Clock, Award, Target, ArrowLeft } from 'lucide-react';

const TestResult = () => {
  const { testId } = useParams<{ testId: string }>();
  
  // In a real app, this would be fetched from a backend
  // For now, we'll create mock data
  const testResult = {
    id: testId,
    title: 'Mathematics Chapter Test',
    subject: 'Math',
    score: 75,
    totalQuestions: 20,
    correctAnswers: 15,
    incorrectAnswers: 5,
    timeTaken: '18:45',
    date: 'May 20, 2023',
    questionsData: getTestQuestions('Math', 5),
    improvement: [
      { topic: 'Algebraic Equations', recommendation: 'Practice basic algebraic manipulations' },
      { topic: 'Geometry', recommendation: 'Review properties of triangles' }
    ]
  };
  
  // Determine if returning to tests or quizzes based on the URL
  const returnPath = window.location.pathname.includes('/tests') ? '/tests' : '/quizzes';
  const itemType = returnPath === '/tests' ? 'Test' : 'Quiz';

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{testResult.title} Results</h1>
          <p className="text-gray-500">Completed on {testResult.date}</p>
        </div>
        <Button 
          variant="outline" 
          asChild
          className="flex items-center"
        >
          <Link to={returnPath}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {returnPath === '/tests' ? 'Tests' : 'Quizzes'}
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="mr-2 h-5 w-5 text-brand-purple" />
              Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eaeaea"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    strokeDasharray={`${testResult.score}, 100`}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold">{testResult.score}%</div>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{testResult.correctAnswers} correct out of {testResult.totalQuestions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-brand-purple" />
              Time Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-3xl font-bold">{testResult.timeTaken}</div>
              <p className="mt-2 text-gray-600">Total time taken</p>
              <div className="mt-4 text-xl font-medium">{Math.round(
                parseInt(testResult.timeTaken.split(':')[0]) * 60 + 
                parseInt(testResult.timeTaken.split(':')[1]) / testResult.totalQuestions
              )}s</div>
              <p className="text-gray-600">Average time per question</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Target className="mr-2 h-5 w-5 text-brand-purple" />
              Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-3xl font-bold">{testResult.score}%</div>
              <p className="mt-2 text-gray-600">Overall accuracy</p>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-green-600">{testResult.correctAnswers} Correct</span>
                  <span className="text-sm text-red-600">{testResult.incorrectAnswers} Incorrect</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded bg-gray-200">
                  <div 
                    className="bg-green-500" 
                    style={{ width: `${(testResult.correctAnswers/testResult.totalQuestions)*100}%` }}
                  ></div>
                  <div 
                    className="bg-red-500" 
                    style={{ width: `${(testResult.incorrectAnswers/testResult.totalQuestions)*100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testResult.improvement.map((item, i) => (
              <div key={i} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{item.topic}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.recommendation}</p>
                <div className="flex justify-end">
                  <Button 
                    asChild
                    variant="outline"
                    className="text-brand-purple"
                  >
                    <Link to={`/practice`}>
                      Practice {item.topic}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {testResult.questionsData.map((question, index) => (
              <QuizQuestion 
                key={index}
                question={question}
                onAnswer={() => {}}
                showExplanation={true}
              />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            <Button 
              variant="outline"
              asChild
            >
              <Link to={returnPath}>
                Back to {itemType}s
              </Link>
            </Button>
            <Button 
              className="bg-brand-purple hover:bg-purple-700"
              asChild
            >
              <Link to={`/subjects/${testResult.subject.toLowerCase()}`}>
                View Subject Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default TestResult;
