
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, XCircle, BookOpen, Trophy } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
}

const TestResult = () => {
  const { testId } = useParams();
  
  // Mock data (in a real app, this would come from an API)
  const testResults = {
    "1": {
      id: 1,
      subject: "Math",
      title: "Number Theory Quiz",
      date: "May 15, 2023",
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      timeSpent: "25 minutes",
      classAverage: 72,
      classHighest: 95,
      questions: [
        {
          id: 1,
          question: "What is the LCM of 12 and 18?",
          userAnswer: "36",
          correctAnswer: "36",
          explanation: "To find the LCM, first find the prime factorization: 12 = 2² × 3, 18 = 2 × 3². The LCM uses the highest power of each prime: 2² × 3² = 36."
        },
        {
          id: 2,
          question: "Is 17 a prime number?",
          userAnswer: "Yes",
          correctAnswer: "Yes",
          explanation: "A prime number has exactly two factors: 1 and itself. 17 is only divisible by 1 and 17, so it is prime."
        },
        {
          id: 3,
          question: "What is the HCF of 24 and 36?",
          userAnswer: "12",
          correctAnswer: "12",
          explanation: "To find the HCF, find the prime factorization: 24 = 2³ × 3, 36 = 2² × 3². The HCF uses the lowest power of each common prime: 2² × 3 = 12."
        }
      ]
    },
    "2": {
      id: 2,
      subject: "English",
      title: "Grammar Test",
      date: "May 10, 2023",
      score: 70,
      totalQuestions: 30,
      correctAnswers: 21,
      timeSpent: "40 minutes",
      classAverage: 68,
      classHighest: 90,
      questions: [
        {
          id: 1,
          question: "Identify the correct sentence: 'She don't like ice cream' or 'She doesn't like ice cream'",
          userAnswer: "She doesn't like ice cream",
          correctAnswer: "She doesn't like ice cream",
          explanation: "For third-person singular subjects (he, she, it), we use 'doesn't' instead of 'don't'."
        },
        {
          id: 2,
          question: "Which is the correct spelling: 'Recieve' or 'Receive'?",
          userAnswer: "Recieve",
          correctAnswer: "Receive",
          explanation: "The correct spelling follows the rule 'i before e except after c'. So it's 'receive'."
        }
      ]
    }
  };
  
  const result = testResults[testId as keyof typeof testResults];
  
  if (!result) {
    return (
      <PageContainer>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-2">Test Result Not Found</h1>
          <p className="mb-4">The test result you're looking for doesn't exist.</p>
          <Link to="/tests" className="text-brand-purple hover:underline">
            View All Tests
          </Link>
        </div>
      </PageContainer>
    );
  }
  
  // Calculate the percentage of correct answers
  const accuracy = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{result.subject}: {result.title}</h1>
        <p className="text-gray-500">Completed on {result.date} • {result.timeSpent}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <div className="text-sm text-gray-500 mb-1">Your Score</div>
                <div className="text-4xl font-bold text-brand-purple">{result.score}%</div>
                <div className="text-sm text-gray-500">
                  {result.correctAnswers} / {result.totalQuestions} correct
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Class Average</div>
                  <div className="text-2xl font-medium">{result.classAverage}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Class Highest</div>
                  <div className="text-2xl font-medium">{result.classHighest}%</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>Your Score</span>
              <span>{result.score}%</span>
            </div>
            <Progress value={result.score} className="h-2 mb-4" />
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>Class Average</span>
              <span>{result.classAverage}%</span>
            </div>
            <Progress value={result.classAverage} className="h-2 bg-gray-200" />
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Questions and Answers</h2>
              <p className="text-sm text-gray-500">Review your performance on each question</p>
            </div>
            
            <div className="divide-y">
              {result.questions.map((question: Question) => (
                <div key={question.id} className="p-4">
                  <div className="flex items-start">
                    <div className="mr-3">
                      {question.userAnswer === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Question {question.id}: {question.question}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <div className="text-sm font-medium">Your Answer</div>
                          <div className={`text-sm ${
                            question.userAnswer === question.correctAnswer 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {question.userAnswer}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Correct Answer</div>
                          <div className="text-sm text-green-600">{question.correctAnswer}</div>
                        </div>
                      </div>
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium mb-1">Explanation</div>
                        <div className="text-sm text-gray-600">{question.explanation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h2 className="text-lg font-medium mb-4">Performance Summary</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Accuracy</span>
                  <span className="font-medium">{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Speed</span>
                  <span className="font-medium">
                    {result.timeSpent.includes("minutes") ? "Average" : "Fast"}
                  </span>
                </div>
                <Progress 
                  value={result.timeSpent.includes("minutes") ? 70 : 90} 
                  className="h-2" 
                />
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center mb-2">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium">
                    {result.score > result.classAverage ? "Above Average" : "Below Average"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {result.score > result.classAverage 
                    ? `You scored ${result.score - result.classAverage}% higher than the class average.`
                    : `You scored ${result.classAverage - result.score}% lower than the class average.`
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-medium mb-4">Recommendations</h2>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <BookOpen className="h-5 w-5 text-brand-purple mr-2 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Practice Similar Questions</div>
                  <Link 
                    to={`/practice/${result.subject.toLowerCase()}`} 
                    className="text-sm text-brand-purple hover:underline flex items-center mt-1"
                  >
                    Start Practice
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </li>
              <li className="flex items-start">
                <BookOpen className="h-5 w-5 text-brand-purple mr-2 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Take Another Test</div>
                  <Link 
                    to={`/tests`} 
                    className="text-sm text-brand-purple hover:underline flex items-center mt-1"
                  >
                    Browse Tests
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TestResult;
