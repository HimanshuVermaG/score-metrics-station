
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { quizSets } from '@/data/questionSets';

const Quizzes = () => {
  const upcomingQuizzes = [
    {
      id: 1,
      subject: 'Math',
      title: 'Quick Math Quiz',
      date: 'May 22, 2023',
      time: '12:00 PM',
      duration: '15 min',
      totalQuestions: 10,
    },
    {
      id: 2,
      subject: 'English',
      title: 'Vocabulary Quiz',
      date: 'May 24, 2023',
      time: '10:30 AM',
      duration: '20 min',
      totalQuestions: 15,
    },
  ];

  const availableQuizzes = quizSets.map((quiz, index) => ({
    id: quiz.id,
    subject: quiz.subject,
    title: quiz.title,
    difficulty: quiz.difficulty || 'Medium',
    totalQuestions: quiz.totalQuestions || quiz.questions.length,
    estimatedTime: quiz.estimatedTime || '15 min',
  }));

  const completedQuizzes = [
    {
      id: 1,
      subject: 'Math',
      title: 'Multiplication Quiz',
      date: 'May 15, 2023',
      score: 9,
      totalQuestions: 10,
    },
    {
      id: 2,
      subject: 'G.S.',
      title: 'Solar System Quiz',
      date: 'May 12, 2023',
      score: 12,
      totalQuestions: 15,
    },
    {
      id: 3,
      subject: 'Hindi',
      title: 'Vocabulary Quiz',
      date: 'May 8, 2023',
      score: 7,
      totalQuestions: 10,
    },
  ];

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-easy text-green-800';
      case 'Medium':
        return 'bg-medium text-orange-800';
      case 'Hard':
        return 'bg-hard text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <p className="text-gray-500">Quick assessments to test your knowledge</p>
      </div>

      <Tabs defaultValue="available" className="mb-6">
        <TabsList>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableQuizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyClass(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <h3 className="font-medium mb-1">{quiz.subject}: {quiz.title}</h3>
                <div className="text-sm text-gray-500 mb-4">
                  {quiz.totalQuestions} questions • {quiz.estimatedTime}
                </div>
                <Button 
                  asChild 
                  className="w-full bg-brand-purple hover:bg-purple-700"
                >
                  <Link to={`/quizzes/start/${quiz.id}`}>Start Quiz</Link>
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Upcoming Quizzes</h2>
              <p className="text-sm text-gray-500">Prepare for these scheduled quizzes</p>
            </div>
            
            {upcomingQuizzes.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No upcoming quizzes scheduled</p>
              </div>
            ) : (
              <div className="divide-y">
                {upcomingQuizzes.map((quiz) => (
                  <div key={quiz.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{quiz.subject}: {quiz.title}</h3>
                        <p className="text-sm text-gray-500">
                          {quiz.date} at {quiz.time} • {quiz.duration} • {quiz.totalQuestions} questions
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link to={`/quizzes/prepare/${quiz.id}`}>Prepare</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Completed Quizzes</h2>
              <p className="text-sm text-gray-500">Review your past quiz results</p>
            </div>
            
            {completedQuizzes.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No completed quizzes yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {completedQuizzes.map((quiz) => (
                  <div key={quiz.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{quiz.subject}: {quiz.title}</h3>
                        <p className="text-sm text-gray-500">
                          {quiz.date} • Score: {quiz.score}/{quiz.totalQuestions}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Progress 
                            value={(quiz.score / quiz.totalQuestions) * 100} 
                            className="h-2 w-16" 
                          />
                        </div>
                        <Link 
                          to={`/quizzes/review/${quiz.id}`}
                          className="text-sm text-brand-purple hover:underline flex items-center"
                        >
                          Review
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Quizzes;
