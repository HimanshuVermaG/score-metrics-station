
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, BookOpen, FileText, Download, ChevronRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { getAssignmentById } from '@/data/assignments';

const AssignmentDetail = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const assignment = getAssignmentById(assignmentId || '1');
  
  if (!assignment) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Assignment Not Found</h1>
          <p className="text-gray-500 mb-6">The assignment you're looking for doesn't exist.</p>
          <Button asChild className="bg-brand-purple hover:bg-purple-700">
            <Link to="/assignments">Back to Assignments</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <Button 
            variant="outline" 
            asChild
            size="sm"
            className="mb-2"
          >
            <Link to="/assignments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assignments
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{assignment.title}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant={assignment.completed ? 'outline' : 'default'} className={
              assignment.completed ? 'text-green-600 bg-green-100' : 'bg-amber-100 text-amber-600'
            }>
              {assignment.completed ? 'Completed' : 'Pending'}
            </Badge>
            <span className="text-gray-500">{assignment.subject} • {assignment.type}</span>
          </div>
        </div>
        
        {!assignment.completed && (
          <Button className="bg-brand-purple hover:bg-purple-700">
            Submit Assignment
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600">{assignment.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Instructions</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Complete all questions in the assigned textbook chapter.</li>
                  <li>Show all your work for mathematical problems.</li>
                  <li>Cite sources for any referenced material.</li>
                  <li>Submit your work in PDF format.</li>
                </ul>
              </div>
              
              {assignment.resources && assignment.resources.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Resources</h3>
                  <div className="space-y-2">
                    {assignment.resources.map((resource, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="flex-1">{resource.name}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!assignment.completed && (
                <div>
                  <h3 className="font-medium mb-2">Your Progress</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{assignment.progress || 0}%</span>
                    </div>
                    <Progress value={assignment.progress || 0} className="h-2" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {assignment.completed && assignment.feedback && (
            <Card>
              <CardHeader>
                <CardTitle>Teacher Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="italic text-gray-600">{assignment.feedback}</p>
                  {assignment.grade && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-medium">Grade:</span>
                        <span className="font-medium text-brand-purple">{assignment.grade}/100</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Due Date</p>
                  <p className="text-sm text-gray-500">{assignment.dueDate}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start space-x-3">
                <BookOpen className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Subject</p>
                  <p className="text-sm text-gray-500">{assignment.subject}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Estimated Time</p>
                  <p className="text-sm text-gray-500">{assignment.estimatedTime || '45 minutes'}</p>
                </div>
              </div>
              
              {assignment.totalPoints && (
                <>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Total Points</p>
                      <p className="text-sm text-gray-500">{assignment.totalPoints} points</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Related Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to={`/subjects/${assignment.subject.toLowerCase()}`} className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <BookOpen className="h-4 w-4 mr-2 text-brand-purple" />
                  <span className="flex-1">{assignment.subject} Course Material</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                
                <Link to="/practice" className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <Clock className="h-4 w-4 mr-2 text-brand-purple" />
                  <span className="flex-1">Practice {assignment.subject} Questions</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default AssignmentDetail;
