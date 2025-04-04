import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, PlayCircle, FileText, BookOpen, Brain, Award, ClipboardCheck, Clock, Calendar } from 'lucide-react';
import { PlanResource } from '@/types/improvement-plan';
import { useToast } from '@/hooks/use-toast';

const ResourceDetailPage = () => {
  const { planId, resourceId } = useParams<{ planId: string; resourceId: string }>();
  const [resource, setResource] = useState<PlanResource | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      const resourceSample: PlanResource = {
        id: resourceId || 'r1',
        title: resourceId === 'r1' ? "Algebraic Expressions and Equations" : 
               resourceId === 'r2' ? "Practice with Linear Equations" :
               resourceId === 'r3' ? "Algebraic Expressions Quiz" : "Mathematics Resource",
        type: resourceId === 'r1' ? 'video' : 
              resourceId === 'r2' ? 'interactive' :
              resourceId === 'r3' ? 'quiz' : 'document',
        duration: resourceId === 'r1' ? '25 min' :
                  resourceId === 'r2' ? '45 min' :
                  resourceId === 'r3' ? '20 min' : '30 min',
        difficulty: resourceId === 'r1' ? 'Medium' :
                    resourceId === 'r2' ? 'Medium' :
                    resourceId === 'r3' ? 'Hard' : 'Easy',
        completed: resourceId === 'r1',
        link: `/improvement-plan/${planId}/resource/${resourceId}`
      };
      
      setResource(resourceSample);
      setCompleted(resourceSample.completed || false);
      setLoading(false);
    }, 500);
  }, [resourceId, planId]);

  const handleMarkComplete = () => {
    setCompleted(!completed);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-6 w-6 text-blue-600" />;
      case 'quiz': return <Brain className="h-6 w-6 text-purple-600" />;
      case 'document': return <FileText className="h-6 w-6 text-green-600" />;
      case 'interactive': return <Award className="h-6 w-6 text-amber-600" />;
      default: return <BookOpen className="h-6 w-6 text-gray-600" />;
    }
  };

  const getResourceContent = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <PlayCircle className="h-16 w-16 text-gray-400 mb-3" />
            <p className="text-gray-600">Video player would be embedded here</p>
            <p className="text-sm text-gray-500 mt-1">Video covers key concepts of {resource?.title}</p>
          </div>
        );
      case 'interactive':
        return (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Interactive Exercise</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="font-medium mb-2">Exercise 1: Solve for x</p>
                <p className="mb-3">2x + 5 = 15</p>
                <div className="flex gap-4 mb-2">
                  <Button variant="outline" size="sm">x = 5</Button>
                  <Button variant="outline" size="sm">x = 10</Button>
                  <Button variant="outline" size="sm">x = 7</Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="font-medium mb-2">Exercise 2: Simplify the expression</p>
                <p className="mb-3">3(x + 4) - 2(x - 1)</p>
                <div className="flex gap-4 mb-2">
                  <Button variant="outline" size="sm">x + 14</Button>
                  <Button variant="outline" size="sm">x + 10</Button>
                  <Button variant="outline" size="sm">x + 2</Button>
                </div>
              </div>
              <Button className="w-full">Check Answers</Button>
            </div>
          </div>
        );
      case 'quiz':
        return (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Quiz: {resource?.title}</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="font-medium mb-2">Question 1 of 10</p>
                <p className="mb-3">Which of the following is a linear equation?</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="q1a" />
                    <label htmlFor="q1a">y = x²</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="q1b" />
                    <label htmlFor="q1b">y = 3x + 5</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="q1c" />
                    <label htmlFor="q1c">y = 1/x</label>
                  </div>
                </div>
              </div>
              <Button className="w-full">Next Question</Button>
            </div>
          </div>
        );
      case 'document':
        return (
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Document: {resource?.title}</h3>
            <div className="prose max-w-none">
              <p>This document provides an overview of key concepts in {resource?.title}.</p>
              <h4 className="mt-4">Introduction</h4>
              <p>
                Algebra is a branch of mathematics that uses symbols to represent numbers and quantities 
                in formulas and equations. These symbols, typically letters like x, y, and z, stand for 
                variables or unknown values.
              </p>
              <h4 className="mt-4">Key Concepts</h4>
              <ul>
                <li>Variables and constants</li>
                <li>Expressions and equations</li>
                <li>Solving for unknown values</li>
                <li>Linear and quadratic equations</li>
              </ul>
              <p className="mt-4">
                Continue reading the full document to master these concepts and improve 
                your understanding of the subject.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="rounded-lg flex flex-col items-center justify-center p-6 bg-gray-50">
            <BookOpen className="h-16 w-16 text-gray-400 mb-3" />
            <p className="text-gray-600">Resource content would be displayed here</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <p>Loading resource details...</p>
        </div>
      </PageContainer>
    );
  }

  if (!resource) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg mb-4">Resource not found</p>
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
        
        <h1 className="text-2xl font-bold">{resource.title}</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${
                resource.type === 'video' ? 'bg-blue-100' : 
                resource.type === 'quiz' ? 'bg-purple-100' : 
                resource.type === 'interactive' ? 'bg-amber-100' : 'bg-green-100'
              }`}>
                {getResourceIcon(resource.type)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{resource.title}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <Badge 
                    variant="outline" 
                    className={`${
                      resource.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                      resource.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {resource.difficulty}
                  </Badge>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {resource.duration}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Badge variant="outline" className="bg-gray-50">
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resource Content</CardTitle>
          <CardDescription>
            Complete this {resource.type} to progress in your improvement plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getResourceContent(resource.type)}
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
          
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Checkbox 
                id="mark-complete" 
                checked={completed}
                onCheckedChange={handleMarkComplete}
                className="mr-2"
              />
              <label htmlFor="mark-complete" className="text-sm cursor-pointer">
                Mark as completed
              </label>
            </div>
            
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Save Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ResourceDetailPage;
