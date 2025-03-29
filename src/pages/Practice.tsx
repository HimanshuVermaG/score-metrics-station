
import React from 'react';
import { ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import ProgressCard from '@/components/ui/progress-card';

const Practice = () => {
  const subjects = [
    {
      id: 1,
      name: 'Math',
      topics: [
        {
          id: 1,
          title: 'Number Theory',
          progress: 85,
          difficultyLevel: 'Easy' as const,
          inProgress: true,
        },
        {
          id: 2,
          title: 'Algebraic Equations',
          progress: 66,
          difficultyLevel: 'Medium' as const,
          inProgress: true,
        },
        {
          id: 3,
          title: 'Geometry Basics',
          progress: 40,
          difficultyLevel: 'Hard' as const,
          inProgress: false,
        },
      ],
    },
    {
      id: 2,
      name: 'English',
      topics: [
        {
          id: 1,
          title: 'Grammar Rules',
          progress: 70,
          difficultyLevel: 'Medium' as const,
          inProgress: false,
        },
        {
          id: 2,
          title: 'Vocabulary Building',
          progress: 55,
          difficultyLevel: 'Medium' as const,
          inProgress: true,
        },
        {
          id: 3,
          title: 'Reading Comprehension',
          progress: 60,
          difficultyLevel: 'Hard' as const,
          inProgress: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Hindi',
      topics: [
        {
          id: 1,
          title: 'Hindi Grammar',
          progress: 65,
          difficultyLevel: 'Medium' as const,
          inProgress: false,
        },
        {
          id: 2,
          title: 'Comprehension Practice',
          progress: 50,
          difficultyLevel: 'Medium' as const,
          inProgress: true,
        },
      ],
    },
    {
      id: 4,
      name: 'G.S.',
      topics: [
        {
          id: 1,
          title: 'Indian History',
          progress: 80,
          difficultyLevel: 'Easy' as const,
          inProgress: false,
        },
        {
          id: 2,
          title: 'World Geography',
          progress: 72,
          difficultyLevel: 'Medium' as const,
          inProgress: true,
        },
        {
          id: 3,
          title: 'Current Affairs',
          progress: 60,
          difficultyLevel: 'Medium' as const,
          inProgress: false,
        },
      ],
    },
  ];

  const recommendedPractice = [
    {
      id: 1,
      subject: 'Math',
      title: 'Algebraic Equations',
      description: 'Focus on solving linear equations',
      difficultyLevel: 'Medium' as const,
      estimatedTime: '20 min',
    },
    {
      id: 2,
      subject: 'English',
      title: 'Grammar Practice',
      description: 'Work on parts of speech and sentence structure',
      difficultyLevel: 'Easy' as const,
      estimatedTime: '15 min',
    },
    {
      id: 3,
      subject: 'Hindi',
      title: 'Comprehension Practice',
      description: 'Improve your reading comprehension skills',
      difficultyLevel: 'Medium' as const,
      estimatedTime: '25 min',
    },
  ];

  const recentPractice = [
    {
      id: 1,
      subject: 'Math',
      title: 'Number Theory',
      date: 'Yesterday',
      score: 85,
      timeTaken: '18 min',
    },
    {
      id: 2,
      subject: 'G.S.',
      title: 'Indian History',
      date: '2 days ago',
      score: 72,
      timeTaken: '25 min',
    },
    {
      id: 3,
      subject: 'English',
      title: 'Vocabulary Building',
      date: '3 days ago',
      score: 65,
      timeTaken: '20 min',
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
        <h1 className="text-2xl font-bold">Practice</h1>
        <p className="text-gray-500">Improve your skills with focused practice</p>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="recent">Recent Practice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="space-y-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">{subject.name}</h2>
                  <p className="text-sm text-gray-500">Practice topics to improve your skills</p>
                </div>
                
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subject.topics.map((topic) => (
                    <ProgressCard
                      key={topic.id}
                      title={topic.title}
                      progress={topic.progress}
                      difficultyLevel={topic.difficultyLevel}
                      inProgress={topic.inProgress}
                      actionText="Practice"
                      actionLink={`/practice/${subject.name.toLowerCase()}/${topic.id}`}
                      bgColor="bg-white"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Recommended Practice</h2>
              <p className="text-sm text-gray-500">Personalized recommendations based on your performance</p>
            </div>
            
            <div className="divide-y">
              {recommendedPractice.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium">{item.subject}: {item.title}</h3>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getDifficultyClass(item.difficultyLevel)}`}>
                          {item.difficultyLevel}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Estimated time: {item.estimatedTime}</p>
                    </div>
                    <a 
                      href={`/practice/recommended/${item.id}`}
                      className="text-sm text-brand-purple hover:underline flex items-center"
                    >
                      Start Practice
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Recent Practice</h2>
              <p className="text-sm text-gray-500">Continue from where you left off</p>
            </div>
            
            <div className="divide-y">
              {recentPractice.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.subject}: {item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {item.date} • Score: {item.score}% • Time taken: {item.timeTaken}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Progress value={item.score} className="h-2 w-16" />
                      </div>
                      <a 
                        href={`/practice/recent/${item.id}`}
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Practice Again
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Practice;
