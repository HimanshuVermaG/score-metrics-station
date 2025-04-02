
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, BookOpen, Brain, CheckCircle, Clock, Award, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PlanResource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'interactive';
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed?: boolean;
  link: string;
}

interface MilestoneType {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dueDate: string;
  resources: PlanResource[];
}

const PersonalizedImprovementPlanPage = () => {
  const { planId } = useParams<{ planId: string }>();
  
  // Mock data for plan details
  const planDetails = {
    id: planId,
    title: 'Mathematics Improvement Plan',
    subject: 'Mathematics',
    startDate: '2023-04-01',
    endDate: '2023-05-15',
    progress: 35,
    weakAreas: ['Algebra', 'Geometry', 'Fractions'],
    overview: 'This personalized improvement plan focuses on strengthening your skills in mathematics, particularly in the areas of algebra, geometry, and fractions. Follow the milestones to track your progress and complete the recommended resources.',
    milestones: [
      {
        id: 'm1',
        title: 'Master Basic Algebra',
        description: 'Complete all resources to understand basic algebraic concepts and operations.',
        status: 'in-progress',
        dueDate: '2023-04-15',
        resources: [
          { id: 'r1', title: 'Introduction to Algebra', type: 'video', duration: '15 min', difficulty: 'Easy', completed: true, link: '/practice/math/algebra' },
          { id: 'r2', title: 'Solving Linear Equations', type: 'interactive', duration: '20 min', difficulty: 'Medium', completed: false, link: '/practice/math/equations' },
          { id: 'r3', title: 'Algebra Practice Quiz', type: 'quiz', duration: '10 min', difficulty: 'Medium', completed: false, link: '/quizzes/start/2' },
        ]
      },
      {
        id: 'm2',
        title: 'Geometry Fundamentals',
        description: 'Learn the basic concepts of geometry including angles, shapes, and formulas.',
        status: 'upcoming',
        dueDate: '2023-04-30',
        resources: [
          { id: 'r4', title: 'Geometry Basics', type: 'document', duration: '25 min', difficulty: 'Easy', completed: false, link: '/practice/math/geometry' },
          { id: 'r5', title: 'Understanding Angles', type: 'interactive', duration: '15 min', difficulty: 'Medium', completed: false, link: '/practice/math/angles' },
          { id: 'r6', title: 'Geometry Shapes Quiz', type: 'quiz', duration: '10 min', difficulty: 'Hard', completed: false, link: '/quizzes/start/3' },
        ]
      },
      {
        id: 'm3',
        title: 'Mastering Fractions',
        description: 'Strengthen your understanding of fractions through these curated resources.',
        status: 'upcoming',
        dueDate: '2023-05-15',
        resources: [
          { id: 'r7', title: 'Fractions Overview', type: 'video', duration: '20 min', difficulty: 'Easy', completed: false, link: '/practice/math/fractions' },
          { id: 'r8', title: 'Operations with Fractions', type: 'interactive', duration: '25 min', difficulty: 'Medium', completed: false, link: '/practice/math/fractions-operations' },
          { id: 'r9', title: 'Advanced Fractions', type: 'document', duration: '15 min', difficulty: 'Hard', completed: false, link: '/practice/math/advanced-fractions' },
        ]
      }
    ]
  };

  // Get the resource icon based on its type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <Brain className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'interactive': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  // Get the milestone status color
  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'upcoming': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <PageContainer>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-4" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{planDetails.title}</h1>
          <p className="text-gray-600">Subject: {planDetails.subject} | Completion: {planDetails.progress}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Plan Overview</CardTitle>
            <CardDescription>
              Duration: {planDetails.startDate} to {planDetails.endDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{planDetails.overview}</p>
            
            <div className="mb-4">
              <p className="font-medium mb-2">Areas of Focus:</p>
              <div className="flex flex-wrap gap-2">
                {planDetails.weakAreas.map((area, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-2">
              <p className="font-medium mb-1">Overall Progress:</p>
              <div className="flex items-center gap-3">
                <Progress value={planDetails.progress} className="h-2 flex-1" />
                <span className="text-sm font-medium">{planDetails.progress}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">Resources Completed:</span>
                <span className="font-medium">1/9</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">Time Invested:</span>
                <span className="font-medium">15 min</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">Current Streak:</span>
                <span className="font-medium">3 days</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">Next Milestone:</span>
                <span className="font-medium">In 5 days</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
              <Link to="/subjects/math">
                View Subject Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="milestones" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="resources">All Resources</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones">
          <div className="space-y-6">
            {planDetails.milestones.map((milestone) => (
              <Card key={milestone.id} className={`border-l-4 ${
                milestone.status === 'completed' ? 'border-l-green-500' : 
                milestone.status === 'in-progress' ? 'border-l-blue-500' : 'border-l-gray-300'
              }`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{milestone.title}</CardTitle>
                      <CardDescription>{milestone.description}</CardDescription>
                    </div>
                    <Badge className={getMilestoneStatusColor(milestone.status)}>
                      {milestone.status === 'in-progress' ? 'In Progress' : 
                       milestone.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Due: {milestone.dueDate}</span>
                  </div>
                  
                  <p className="text-sm font-medium mb-2">Resources:</p>
                  <div className="space-y-3">
                    {milestone.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full ${
                            resource.type === 'video' ? 'bg-blue-100' : 
                            resource.type === 'quiz' ? 'bg-purple-100' : 
                            resource.type === 'interactive' ? 'bg-amber-100' : 'bg-green-100'
                          } mr-3`}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{resource.title}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span className="mr-3">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                              <span className="mr-3">{resource.duration}</span>
                              <Badge variant="outline" className={`
                                ${resource.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                                  resource.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                                  'bg-red-50 text-red-700 border-red-200'}
                              `}>
                                {resource.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {resource.completed ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mr-3">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          ) : null}
                          <Button size="sm" variant="outline" asChild>
                            <Link to={resource.link}>
                              Start
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>All Learning Resources</CardTitle>
              <CardDescription>Complete these resources to improve your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {planDetails.milestones.flatMap(milestone => 
                    milestone.resources.map(resource => (
                      <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full ${
                            resource.type === 'video' ? 'bg-blue-100' : 
                            resource.type === 'quiz' ? 'bg-purple-100' : 
                            resource.type === 'interactive' ? 'bg-amber-100' : 'bg-green-100'
                          } mr-3`}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span className="mr-3">Part of: {milestone.title}</span>
                              <span className="mr-3">{resource.duration}</span>
                              <Badge variant="outline" className={`
                                ${resource.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                                  resource.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                                  'bg-red-50 text-red-700 border-red-200'}
                              `}>
                                {resource.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant={resource.completed ? "ghost" : "outline"} asChild>
                          <Link to={resource.link}>
                            {resource.completed ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                                Completed
                              </>
                            ) : (
                              <>
                                Start
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </>
                            )}
                          </Link>
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Track your improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Overall Completion</h3>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{planDetails.progress}%</span>
                    </div>
                    <Progress value={planDetails.progress} className="h-3" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Milestone Breakdown</h3>
                  <div className="space-y-4">
                    {planDetails.milestones.map((milestone) => {
                      // Calculate completion percentage for each milestone
                      const totalResources = milestone.resources.length;
                      const completedResources = milestone.resources.filter(r => r.completed).length;
                      const completionPercentage = totalResources > 0 
                        ? Math.round((completedResources / totalResources) * 100) 
                        : 0;
                      
                      return (
                        <div key={milestone.id} className="border p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{milestone.title}</h4>
                            <Badge className={getMilestoneStatusColor(milestone.status)}>
                              {completionPercentage}%
                            </Badge>
                          </div>
                          <Progress 
                            value={completionPercentage} 
                            className={`h-2 ${
                              completionPercentage === 100 ? 'bg-green-100' : 
                              completionPercentage > 0 ? 'bg-blue-100' : 'bg-gray-100'
                            }`} 
                          />
                          <div className="text-xs text-gray-500 mt-2">
                            {completedResources}/{totalResources} resources completed
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

// Need to define FileText since it's used but not imported
const FileText = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
};

export default PersonalizedImprovementPlanPage;
