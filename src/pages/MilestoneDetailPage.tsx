
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import ResourceItem from '@/components/improvement/ResourceItem';
import { MilestoneType } from '@/types/improvement-plan';

const MilestoneDetailPage = () => {
  const { planId, milestoneId } = useParams<{ planId: string; milestoneId: string }>();
  const [milestone, setMilestone] = useState<MilestoneType | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Sample milestone data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const milestoneSample: MilestoneType = {
        id: milestoneId || '1',
        title: milestoneId === '1' ? "Master Algebra Fundamentals" : 
               milestoneId === '2' ? "Advanced Geometry Concepts" :
               milestoneId === '3' ? "Calculus Introduction" : "Mathematics Milestone",
        description: "Complete these resources to build a strong foundation in the subject area.",
        status: milestoneId === '1' ? 'in-progress' : 'upcoming',
        dueDate: "June 30, 2023",
        resources: [
          {
            id: "r1",
            title: "Algebraic Expressions and Equations",
            type: "video",
            duration: "25 min",
            difficulty: "Medium",
            completed: true,
            link: `/improvement-plan/${planId}/resource/r1`
          },
          {
            id: "r2",
            title: "Practice with Linear Equations",
            type: "interactive",
            duration: "45 min",
            difficulty: "Medium",
            completed: false,
            link: `/improvement-plan/${planId}/resource/r2`
          },
          {
            id: "r3",
            title: "Algebraic Expressions Quiz",
            type: "quiz",
            duration: "20 min",
            difficulty: "Hard",
            completed: false,
            link: `/improvement-plan/${planId}/resource/r3`
          },
          {
            id: "r4",
            title: "Word Problems with Algebra",
            type: "document",
            duration: "30 min",
            difficulty: "Easy",
            completed: false,
            link: `/improvement-plan/${planId}/resource/r4`
          }
        ]
      };
      
      setMilestone(milestoneSample);
      setLoading(false);
    }, 500);
  }, [milestoneId, planId]);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <p>Loading milestone details...</p>
        </div>
      </PageContainer>
    );
  }

  if (!milestone) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg mb-4">Milestone not found</p>
          <Button asChild>
            <Link to={`/improvement-plan/${planId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Improvement Plan
            </Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  const completedResources = milestone.resources.filter(r => r.completed).length;
  const totalResources = milestone.resources.length;
  const progressPercentage = totalResources > 0 ? (completedResources / totalResources) * 100 : 0;

  return (
    <PageContainer>
      <div className="mb-6">
        <Link 
          to={`/improvement-plan/${planId}`}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Improvement Plan
        </Link>
        
        <h1 className="text-2xl font-bold">{milestone.title}</h1>
        <p className="text-gray-500">{milestone.description}</p>
      </div>

      <Card className={`border-l-4 ${
        milestone.status === 'completed' ? 'border-l-green-500' : 
        milestone.status === 'in-progress' ? 'border-l-blue-500' : 'border-l-gray-300'
      } mb-6`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle>Milestone Progress</CardTitle>
            <Badge className={`
              ${milestone.status === 'completed' ? 'bg-green-100 text-green-700' : 
                milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}
            `}>
              {milestone.status === 'in-progress' ? 'In Progress' : 
               milestone.status === 'completed' ? 'Completed' : 'Upcoming'}
            </Badge>
          </div>
          <CardDescription>Track your progress in this milestone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Completion Progress</span>
                <span className="text-sm font-medium">{completedResources}/{totalResources} resources completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Due: {milestone.dueDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>Estimated: {milestone.resources.reduce((acc, r) => {
                  const minutes = parseInt(r.duration.split(' ')[0]);
                  return acc + minutes;
                }, 0)} minutes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resources to Complete</CardTitle>
          <CardDescription>Work through these resources to master this milestone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestone.resources.map((resource) => (
              <ResourceItem key={resource.id} resource={resource} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 flex flex-wrap justify-between items-center gap-4">
          <Button variant="outline" asChild>
            <Link to={`/improvement-plan/${planId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plan
            </Link>
          </Button>
          
          <div className="flex gap-3">
            {milestone.id !== '1' && (
              <Button variant="outline" asChild>
                <Link to={`/improvement-plan/${planId}/milestone/${parseInt(milestone.id) - 1}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Milestone
                </Link>
              </Button>
            )}
            
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <Link to={`/improvement-plan/${planId}/milestone/${parseInt(milestone.id) + 1}`}>
                Next Milestone
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default MilestoneDetailPage;
