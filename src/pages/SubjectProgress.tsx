
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { subjectTopics } from '@/data/questionSets';
import { CheckCircle, XCircle, ChevronLeft, BarChart2, Clock, BookOpen, Brain } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SubjectProgress = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { toast } = useToast();
  
  const subjects = {
    math: {
      name: 'Mathematics',
      color: 'text-blue-700',
      bgColor: 'bg-math-bg',
      icon: <BookOpen className="h-5 w-5 text-blue-700" />,
      progress: 70,
      topics: ['Algebra', 'Geometry', 'Calculus', 'Trigonometry', 'Number Theory'],
      topicProgress: [85, 60, 75, 50, 80],
      recentTests: [
        { name: 'Weekly Algebra Quiz', score: 8, outOf: 10, date: '2 days ago' },
        { name: 'Geometry Mid-term', score: 75, outOf: 100, date: '1 week ago' },
        { name: 'Number Theory Test', score: 48, outOf: 50, date: '3 weeks ago' },
      ],
      weakAreas: ['Trigonometry', 'Complex Numbers'],
      strongAreas: ['Algebra', 'Number Theory']
    },
    english: {
      name: 'English',
      color: 'text-purple-700',
      bgColor: 'bg-english-bg',
      icon: <BookOpen className="h-5 w-5 text-purple-700" />,
      progress: 55,
      topics: ['Grammar', 'Vocabulary', 'Comprehension', 'Writing', 'Literature'],
      topicProgress: [70, 45, 60, 50, 45],
      recentTests: [
        { name: 'Grammar Quiz', score: 7, outOf: 10, date: '3 days ago' },
        { name: 'Vocabulary Test', score: 68, outOf: 100, date: '2 weeks ago' },
        { name: 'Reading Comprehension', score: 18, outOf: 25, date: '1 month ago' },
      ],
      weakAreas: ['Vocabulary', 'Literature Analysis'],
      strongAreas: ['Grammar', 'Comprehension']
    },
    hindi: {
      name: 'Hindi',
      color: 'text-amber-700',
      bgColor: 'bg-hindi-bg',
      icon: <BookOpen className="h-5 w-5 text-amber-700" />,
      progress: 45,
      topics: ['Grammar', 'Literature', 'Composition', 'Vocabulary', 'Comprehension'],
      topicProgress: [55, 40, 45, 35, 50],
      recentTests: [
        { name: 'Hindi Grammar', score: 6, outOf: 10, date: '1 week ago' },
        { name: 'Literature Quiz', score: 65, outOf: 100, date: '3 weeks ago' },
        { name: 'Vocabulary Test', score: 15, outOf: 25, date: '1 month ago' },
      ],
      weakAreas: ['Literature', 'Composition'],
      strongAreas: ['Grammar', 'Comprehension']
    },
    gs: {
      name: 'General Studies',
      color: 'text-green-700',
      bgColor: 'bg-gs-bg',
      icon: <BookOpen className="h-5 w-5 text-green-700" />,
      progress: 65,
      topics: ['History', 'Geography', 'Science', 'Civics', 'Current Affairs'],
      topicProgress: [75, 65, 70, 60, 55],
      recentTests: [
        { name: 'History Quiz', score: 9, outOf: 10, date: '5 days ago' },
        { name: 'Geography Test', score: 80, outOf: 100, date: '2 weeks ago' },
        { name: 'Science Mid-term', score: 40, outOf: 50, date: '1 month ago' },
      ],
      weakAreas: ['Current Affairs', 'Civics'],
      strongAreas: ['History', 'Geography', 'Science']
    }
  };

  const subjectData = subjects[subjectId as keyof typeof subjects];
  
  if (!subjectData) {
    return (
      <PageContainer>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Subject Not Found</h2>
          <p className="mb-4">We couldn't find the subject you're looking for.</p>
          <Button className="bg-brand-purple" asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  const handleStartPractice = () => {
    toast({
      title: "Practice session starting",
      description: `Loading practice questions for ${subjectData.name}`,
    });
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${subjectData.bgColor}`}>
              {subjectData.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{subjectData.name} Progress</h1>
              <p className="text-gray-500">Track your progress and improve your skills</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className={`text-${subjectData.color.split('-')[0]}-500 stroke-current`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - subjectData.progress / 100)}`}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{subjectData.progress}%</span>
                </div>
              </div>
              <Button className="w-full bg-brand-purple" onClick={handleStartPractice}>
                Start Practice
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Strengths & Weaknesses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Strong Areas
                </h3>
                <ul className="space-y-1">
                  {subjectData.strongAreas.map((area, index) => (
                    <li key={index} className="text-sm ml-5">• {area}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-1" /> Areas to Improve
                </h3>
                <ul className="space-y-1">
                  {subjectData.weakAreas.map((area, index) => (
                    <li key={index} className="text-sm ml-5">• {area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjectData.recentTests.map((test, index) => (
                <div key={index} className="border-b pb-2 last:border-0">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium">{test.name}</h4>
                    <span className="text-xs text-gray-500">{test.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{test.score}/{test.outOf}</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {Math.round((test.score / test.outOf) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="topics" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="topics">Topics Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="practice">Practice Questions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Topic Breakdown</CardTitle>
              <CardDescription>
                Your progress in different topics of {subjectData.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectData.topics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{topic}</span>
                      <span className="text-sm font-medium">{subjectData.topicProgress[index]}%</span>
                    </div>
                    <Progress value={subjectData.topicProgress[index]} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Personalized Recommendations</CardTitle>
              <CardDescription>
                Based on your performance, we recommend these resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectData.weakAreas.map((area, index) => (
                  <Card key={index} className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <Brain className="mr-2 h-4 w-4 text-brand-purple" />
                        {area} Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <p className="text-sm text-gray-600 mb-3">
                        Focus on improving your {area.toLowerCase()} skills with these resources.
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" className="text-sm justify-start" asChild>
                          <Link to={`/practice/${subjectId}/${index + 1}`}>
                            Practice Questions
                          </Link>
                        </Button>
                        <Button variant="outline" className="text-sm justify-start" asChild>
                          <Link to={`/quizzes`}>
                            Take a Quiz
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Practice Resources</CardTitle>
              <CardDescription>
                Access practice questions and tests for {subjectData.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Quick Practice</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-3">
                      10 minutes of focused practice on basic concepts.
                    </p>
                    <Button className="w-full bg-brand-purple">Start</Button>
                  </CardContent>
                </Card>
                
                <Card className="border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Topic Quiz</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-3">
                      Test your knowledge on specific topics with our quizzes.
                    </p>
                    <Button className="w-full bg-brand-purple">Choose Topic</Button>
                  </CardContent>
                </Card>
                
                <Card className="border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Full Test</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-3">
                      Complete assessment covering all topics in {subjectData.name}.
                    </p>
                    <Button className="w-full bg-brand-purple">Start Test</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SubjectProgress;
