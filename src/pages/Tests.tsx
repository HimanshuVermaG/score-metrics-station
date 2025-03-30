
import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, BarChart3, BookOpen, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { testSets } from '@/data/questionSets';

const Tests = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  const upcomingTests = [
    {
      id: 1,
      subject: 'Math',
      title: 'Algebra Test',
      date: 'May 25, 2023',
      time: '10:00 AM',
      duration: '45 min',
      totalQuestions: 20,
      topics: ['Quadratic Equations', 'Polynomials', 'Functions']
    },
    {
      id: 2,
      subject: 'English',
      title: 'Grammar and Vocabulary',
      date: 'May 28, 2023',
      time: '11:30 AM',
      duration: '60 min',
      totalQuestions: 30,
      topics: ['Parts of Speech', 'Sentence Structure', 'Vocabulary']
    },
    {
      id: 3,
      subject: 'Hindi',
      title: 'Literature Test',
      date: 'June 2, 2023',
      time: '9:00 AM',
      duration: '45 min',
      totalQuestions: 25,
      topics: ['Poetry', 'Prose', 'Grammar']
    },
  ];

  const ongoingTests = testSets.map((test, index) => ({
    id: test.id,
    subject: test.subject,
    title: test.title,
    dueDate: `May ${22 + index}, 2023`,
    progress: Math.floor(Math.random() * 70) + 10, 
    totalQuestions: test.totalQuestions || test.questions.length,
    completedQuestions: Math.floor((test.totalQuestions || test.questions.length) * (Math.floor(Math.random() * 70) + 10) / 100),
    estimatedTime: test.estimatedTime,
    difficulty: test.difficulty || 'Medium'
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
      timeTaken: '38 min'
    },
    {
      id: 2,
      subject: 'English',
      title: 'Reading Comprehension',
      date: 'May 5, 2023',
      score: 78,
      totalQuestions: 25,
      correctAnswers: 19,
      timeTaken: '52 min'
    },
    {
      id: 3,
      subject: 'Hindi',
      title: 'Grammar Test',
      date: 'April 28, 2023',
      score: 92,
      totalQuestions: 30,
      correctAnswers: 27,
      timeTaken: '40 min'
    },
    {
      id: 4,
      subject: 'G.S.',
      title: 'Current Affairs',
      date: 'April 20, 2023',
      score: 70,
      totalQuestions: 20,
      correctAnswers: 14,
      timeTaken: '35 min'
    },
  ];

  const filteredOngoingTests = selectedSubject === 'all' 
    ? ongoingTests 
    : ongoingTests.filter(test => test.subject === selectedSubject);
  
  const subjects = ['all', 'Math', 'English', 'Hindi', 'G.S.'];
  
  const getSubjectColor = (subject: string) => {
    switch(subject) {
      case 'Math': return 'bg-blue-100 text-blue-800';
      case 'English': return 'bg-green-100 text-green-800';
      case 'Hindi': return 'bg-yellow-100 text-yellow-800';
      case 'G.S.': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tests</h1>
        <p className="text-gray-500">View and manage your academic tests</p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Tests</p>
                <p className="text-2xl font-bold">{ongoingTests.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming Tests</p>
                <p className="text-2xl font-bold">{upcomingTests.length}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed Tests</p>
                <p className="text-2xl font-bold">{completedTests.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ongoing" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="ongoing">Available Tests</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ongoing">
          <div className="mb-4 flex flex-wrap gap-2">
            {subjects.map(subject => (
              <Button 
                key={subject}
                variant={selectedSubject === subject ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
                className={selectedSubject === subject ? 'bg-brand-purple hover:bg-purple-700' : ''}
              >
                {subject === 'all' ? 'All Subjects' : subject}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOngoingTests.map((test) => (
              <Card key={test.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-2 ${
                  test.subject === 'Math' ? 'bg-blue-500' :
                  test.subject === 'English' ? 'bg-green-500' :
                  test.subject === 'Hindi' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`} />
                <CardContent className="pt-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Badge className={getSubjectColor(test.subject)}>
                        {test.subject}
                      </Badge>
                      <Badge className={`ml-2 ${getDifficultyClass(test.difficulty)}`}>
                        {test.difficulty}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {test.estimatedTime}
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1">{test.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {test.totalQuestions} questions • Due: {test.dueDate}
                  </p>
                  
                  {test.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{test.completedQuestions}/{test.totalQuestions} completed</span>
                      </div>
                      <Progress value={test.progress} className="h-2" />
                    </div>
                  )}
                  
                  <Link to={`/tests/start/${test.id}`}>
                    <Button className="w-full bg-brand-purple hover:bg-purple-700">
                      {test.progress > 0 ? 'Continue Test' : 'Start Test'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Upcoming Tests</h2>
              <p className="text-sm text-gray-500">Prepare for these scheduled tests</p>
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
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{test.subject}: {test.title}</h3>
                          <Badge className={getSubjectColor(test.subject)}>
                            {test.subject}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                          {test.date} at {test.time} • {test.duration} • {test.totalQuestions} questions
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {test.topics.map((topic, idx) => (
                            <Badge variant="outline" key={idx} className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                        className="min-w-[100px] text-brand-purple border-brand-purple"
                      >
                        <Link to={`/tests/prepare/${test.id}`}>
                          Prepare
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedTests.map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <Badge className={getSubjectColor(test.subject)}>
                        {test.subject}
                      </Badge>
                      <h3 className="font-medium mt-2">{test.title}</h3>
                      <p className="text-sm text-gray-500">
                        Completed on {test.date} • {test.timeTaken}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-purple">{test.score}%</div>
                      <p className="text-sm text-gray-500">{test.correctAnswers}/{test.totalQuestions} correct</p>
                    </div>
                  </div>
                  
                  <Progress 
                    value={test.score} 
                    className="h-2 mb-4" 
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="text-brand-purple"
                    >
                      <Link to={`/tests/review/${test.id}`} className="flex items-center">
                        View Results
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-brand-purple" />
            Test Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Math', 'English', 'Hindi', 'G.S.'].map(subject => {
              const subjectTests = completedTests.filter(test => test.subject === subject);
              const averageScore = subjectTests.length 
                ? Math.round(subjectTests.reduce((acc, test) => acc + test.score, 0) / subjectTests.length) 
                : 0;
              
              return (
                <div key={subject} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{subject}</span>
                    <span className="text-sm text-gray-500">Average: {averageScore}%</span>
                  </div>
                  <Progress 
                    value={averageScore} 
                    className="h-2" 
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Tests;
