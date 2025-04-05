
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ResourceItem from '@/components/improvement/ResourceItem';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

// Mock data - in a real app this would come from an API
const getMilestoneData = (milestoneId: string) => {
  const milestones = {
    'milestone-1': {
      id: 'milestone-1',
      title: 'Algebra Fundamentals',
      description: 'Master the core concepts of algebraic expressions, equations, and functions',
      status: 'in-progress' as const,
      dueDate: 'May 15, 2025',
      progress: 65,
      completedTasks: 4,
      totalTasks: 7,
      objectives: [
        'Understand algebraic expressions and operations',
        'Solve linear equations and inequalities',
        'Graph linear functions and understand their properties',
        'Apply algebraic concepts to real-world problems'
      ],
      resources: [
        {
          id: 'resource-1',
          title: 'Algebra Basics Video Course',
          type: 'video' as const,
          duration: '45 min',
          difficulty: 'Medium' as const,
          completed: true,
          link: '/resources/algebra-basics'
        },
        {
          id: 'resource-2',
          title: 'Linear Equations Practice Set',
          type: 'interactive' as const,
          duration: '30 min',
          difficulty: 'Medium' as const,
          completed: false,
          link: '/resources/linear-equations'
        },
        {
          id: 'resource-3',
          title: 'Graphing Linear Functions',
          type: 'document' as const,
          duration: '15 min',
          difficulty: 'Easy' as const,
          completed: true,
          link: '/resources/graphing-functions'
        },
        {
          id: 'resource-4',
          title: 'Algebra Quiz',
          type: 'quiz' as const,
          duration: '20 min',
          difficulty: 'Hard' as const,
          completed: false,
          link: '/resources/algebra-quiz'
        }
      ]
    },
    'milestone-2': {
      id: 'milestone-2',
      title: 'Geometry Foundations',
      description: 'Build a strong understanding of geometric shapes, properties, and theorems',
      status: 'upcoming' as const,
      dueDate: 'June 10, 2025',
      progress: 0,
      completedTasks: 0,
      totalTasks: 5,
      objectives: [
        'Understand properties of angles, lines, and curves',
        'Calculate area and perimeter of various shapes',
        'Learn and apply Pythagorean theorem',
        'Comprehend geometric transformations'
      ],
      resources: [
        {
          id: 'resource-5',
          title: 'Introduction to Geometry',
          type: 'video' as const,
          duration: '35 min',
          difficulty: 'Easy' as const,
          completed: false,
          link: '/resources/intro-geometry'
        },
        {
          id: 'resource-6',
          title: 'Triangles and Quadrilaterals',
          type: 'document' as const,
          duration: '25 min',
          difficulty: 'Medium' as const,
          completed: false,
          link: '/resources/triangles'
        },
        {
          id: 'resource-7',
          title: 'Pythagorean Theorem Practice',
          type: 'interactive' as const,
          duration: '30 min',
          difficulty: 'Medium' as const,
          completed: false,
          link: '/resources/pythagoras'
        }
      ]
    },
    'milestone-3': {
      id: 'milestone-3',
      title: 'Word Problem Mastery',
      description: 'Develop techniques to solve complex word problems using algebraic and geometric methods',
      status: 'completed' as const,
      dueDate: 'April 5, 2025',
      progress: 100,
      completedTasks: 6,
      totalTasks: 6,
      objectives: [
        'Translate word problems into mathematical expressions',
        'Identify the correct mathematical operations for different scenarios',
        'Apply algebraic techniques to solve real-world problems',
        'Verify solutions in the context of the original problem'
      ],
      resources: [
        {
          id: 'resource-8',
          title: 'Word Problem Strategies',
          type: 'video' as const,
          duration: '40 min',
          difficulty: 'Medium' as const,
          completed: true,
          link: '/resources/word-problem-strategies'
        },
        {
          id: 'resource-9',
          title: 'Multi-Step Problem Solving',
          type: 'interactive' as const,
          duration: '45 min',
          difficulty: 'Hard' as const,
          completed: true,
          link: '/resources/multi-step-problems'
        },
        {
          id: 'resource-10',
          title: 'Word Problem Final Assessment',
          type: 'quiz' as const,
          duration: '30 min',
          difficulty: 'Hard' as const,
          completed: true,
          link: '/resources/word-problem-assessment'
        }
      ]
    }
  };
  
  return milestones[milestoneId as keyof typeof milestones] || milestones['milestone-1'];
};

const MilestoneDetailPage = () => {
  const { milestoneId } = useParams<{ milestoneId: string }>();
  const { toast } = useToast();
  
  const milestone = getMilestoneData(milestoneId || 'milestone-1');
  
  const handleMarkComplete = () => {
    toast({
      title: "Milestone updated",
      description: "This milestone has been marked as completed!",
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'upcoming': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <PageContainer>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center mb-2">
            <Link to="/improvement-plan/math" className="text-brand-purple hover:underline flex items-center mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Plan
            </Link>
            <Badge className={getStatusColor(milestone.status)}>
              {milestone.status === 'in-progress' ? 'In Progress' : 
               milestone.status === 'completed' ? 'Completed' : 'Upcoming'}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">{milestone.title}</h1>
          <p className="text-gray-600 mt-1">{milestone.description}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            Due: {milestone.dueDate}
          </div>
        </div>
        {milestone.status !== 'completed' && (
          <Button 
            onClick={handleMarkComplete} 
            className="bg-brand-purple hover:bg-purple-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Complete
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative inline-block mb-4">
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
                    stroke={milestone.status === 'completed' ? '#10B981' : '#8B5CF6'}
                    strokeWidth="3"
                    strokeDasharray={`${milestone.progress}, 100`}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold">{milestone.progress}%</div>
                </div>
              </div>
              <p className="text-center">{milestone.completedTasks} of {milestone.totalTasks} tasks completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Objectives</CardTitle>
            <CardDescription>What you'll learn in this milestone</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {milestone.objectives.map((objective, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center mr-2">
                    {index + 1}
                  </div>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Learning Resources</CardTitle>
          <CardDescription>Complete these resources to master the concepts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestone.resources.map((resource) => (
              <ResourceItem key={resource.id} resource={resource} />
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default MilestoneDetailPage;
