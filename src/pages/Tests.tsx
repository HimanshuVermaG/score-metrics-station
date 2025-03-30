
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { testSets } from '@/data/questionSets';

const Tests = () => {
  const upcomingTests = [
    {
      id: 1,
      subject: 'Math',
      title: 'Algebra Test',
      date: 'May 25, 2023',
      time: '10:00 AM',
      duration: '45 min',
      totalQuestions: 20,
    },
    {
      id: 2,
      subject: 'English',
      title: 'Grammar and Vocabulary',
      date: 'May 28, 2023',
      time: '11:30 AM',
      duration: '60 min',
      totalQuestions: 30,
    },
    {
      id: 3,
      subject: 'Hindi',
      title: 'Literature Test',
      date: 'June 2, 2023',
      time: '9:00 AM',
      duration: '45 min',
      totalQuestions: 25,
    },
  ];

  const ongoingTests = testSets.map((test, index) => ({
    id: test.id,
    subject: test.subject,
    title: test.title,
    dueDate: `May ${22 + index}, 2023`,
    progress: Math.floor(Math.random() * 70) + 10, // Random progress between 10-80%
    totalQuestions: test.totalQuestions || test.questions.length,
    completedQuestions: Math.floor((test.totalQuestions || test.questions.length) * (Math.floor(Math.random() * 70) + 10) / 100),
  }));

  const completedTests = [
    {
      id: 1,
      subject: 'Math',
      title: 'Number Theory',
      date: 'May 10, 2023',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
    },
    {
      id: 2,
      subject: 'English',
      title: 'Reading Comprehension',
      date: 'May 5, 2023',
      score: 78,
      totalQuestions: 25,
      correctAnswers: 19,
    },
    {
      id: 3,
      subject: 'Hindi',
      title: 'Grammar Test',
      date: 'April 28, 2023',
      score: 92,
      totalQuestions: 30,
      correctAnswers: 27,
    },
    {
      id: 4,
      subject: 'G.S.',
      title: 'Current Affairs',
      date: 'April 20, 2023',
      score: 70,
      totalQuestions: 20,
      correctAnswers: 14,
    },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tests</h1>
        <p className="text-gray-500">View and manage all your tests</p>
      </div>

      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Upcoming Tests</h2>
              <p className="text-sm text-gray-500">Prepare for these upcoming tests</p>
            </div>
            
            {upcomingTests.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No upcoming tests scheduled</p>
              </div>
            ) : (
              <div className="divide-y">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{test.subject}: {test.title}</h3>
                        <p className="text-sm text-gray-500">
                          {test.date} at {test.time} • {test.duration} • {test.totalQuestions} questions
                        </p>
                      </div>
                      <Link 
                        to={`/tests/prepare/${test.id}`}
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Prepare
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="ongoing">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Ongoing Tests</h2>
              <p className="text-sm text-gray-500">Continue your progress on these tests</p>
            </div>
            
            {ongoingTests.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No ongoing tests</p>
              </div>
            ) : (
              <div className="divide-y">
                {ongoingTests.map((test) => (
                  <div key={test.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{test.subject}: {test.title}</h3>
                        <p className="text-sm text-gray-500">
                          Due: {test.dueDate} • {test.completedQuestions}/{test.totalQuestions} completed
                        </p>
                      </div>
                      <Link 
                        to={`/tests/start/${test.id}`}
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Continue
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                    <Progress value={test.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Completed Tests</h2>
              <p className="text-sm text-gray-500">Review your past test results</p>
            </div>
            
            {completedTests.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No completed tests yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {completedTests.map((test) => (
                  <div key={test.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{test.subject}: {test.title}</h3>
                        <p className="text-sm text-gray-500">
                          {test.date} • Score: {test.score}% • {test.correctAnswers}/{test.totalQuestions} correct
                        </p>
                      </div>
                      <Link 
                        to={`/tests/review/${test.id}`}
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Review
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
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

export default Tests;
