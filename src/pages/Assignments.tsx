
import React, { useState } from 'react';
import { CalendarDays, Clock, ChevronRight, FileText, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { assignmentData } from '@/data/assignments';

const Assignments = () => {
  const [filter, setFilter] = useState('all');
  
  const handleFilterChange = (value: string) => {
    setFilter(value);
  };
  
  const filteredAssignments = filter === 'all' 
    ? assignmentData.assignments 
    : assignmentData.assignments.filter(assignment => 
        filter === 'pending' 
          ? !assignment.completed 
          : assignment.completed
      );
  
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <p className="text-gray-500">View and manage your academic assignments</p>
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Assignments</p>
                <p className="text-2xl font-bold">{assignmentData.assignments.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold">
                  {assignmentData.assignments.filter(a => a.completed).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">
                  {assignmentData.assignments.filter(a => !a.completed).length}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assignment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange('all')}
                className={filter === 'all' ? 'bg-brand-purple hover:bg-purple-700' : ''}
              >
                All
              </Button>
              <Button 
                variant={filter === 'pending' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange('pending')}
                className={filter === 'pending' ? 'bg-brand-purple hover:bg-purple-700' : ''}
              >
                Pending
              </Button>
              <Button 
                variant={filter === 'completed' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange('completed')}
                className={filter === 'completed' ? 'bg-brand-purple hover:bg-purple-700' : ''}
              >
                Completed
              </Button>
            </div>
            
            <Button className="bg-brand-purple hover:bg-purple-700">
              + New Assignment
            </Button>
          </div>
          
          <div className="divide-y">
            {filteredAssignments.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">No assignments found</p>
              </div>
            ) : (
              filteredAssignments.map((assignment) => (
                <Link 
                  key={assignment.id} 
                  to={`/assignments/${assignment.id}`}
                  className="block py-4 hover:bg-gray-50 transition-colors rounded-md px-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-3">
                      <div className={`p-2 rounded-md ${
                        assignment.subject === 'Math' ? 'bg-blue-100' :
                        assignment.subject === 'English' ? 'bg-green-100' :
                        assignment.subject === 'Hindi' ? 'bg-yellow-100' :
                        'bg-purple-100'
                      }`}>
                        <BookOpen className={`h-5 w-5 ${
                          assignment.subject === 'Math' ? 'text-blue-600' :
                          assignment.subject === 'English' ? 'text-green-600' :
                          assignment.subject === 'Hindi' ? 'text-yellow-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{assignment.title}</h3>
                          <Badge variant={assignment.completed ? 'outline' : 'default'} className={
                            assignment.completed ? 'text-green-600 bg-green-100' : 'bg-amber-100 text-amber-600'
                          }>
                            {assignment.completed ? 'Completed' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{assignment.subject} • {assignment.type}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-400 space-x-3">
                          <div className="flex items-center">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            Due: {assignment.dueDate}
                          </div>
                          {assignment.totalPoints && (
                            <div>
                              Total Points: {assignment.totalPoints}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {!assignment.completed && assignment.progress && (
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500 mb-1">{assignment.progress}% complete</span>
                          <Progress value={assignment.progress} className="h-1.5 w-20" />
                        </div>
                      )}
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignmentData.assignments
                .filter(a => !a.completed)
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .slice(0, 3)
                .map(assignment => (
                  <div key={assignment.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-gray-500">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{assignment.dueDate}</p>
                      <p className="text-xs text-gray-500">Due date</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subject Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                assignmentData.assignments.reduce((acc, curr) => {
                  acc[curr.subject] = (acc[curr.subject] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([subject, count]) => (
                <div key={subject} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{subject}</span>
                    <span className="text-sm text-gray-500">{count} assignments</span>
                  </div>
                  <Progress 
                    value={(count / assignmentData.assignments.length) * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Assignments;
