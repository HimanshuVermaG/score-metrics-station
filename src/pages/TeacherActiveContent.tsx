
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, User, CheckCircle, XCircle, AlertCircle, BookOpen, BarChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for active quizzes and tests
const activeContent = [
  {
    id: 1,
    title: 'Algebra Quiz',
    type: 'quiz',
    subject: 'Mathematics',
    class: 'Class 6',
    status: 'active',
    startDate: '2023-10-24',
    endDate: '2023-10-30',
    students: 32,
    studentsCompleted: 18,
    totalQuestions: 15,
    duration: '30 min',
  },
  {
    id: 2,
    title: 'Grammar Test',
    type: 'test',
    subject: 'English',
    class: 'Class 7',
    status: 'active',
    startDate: '2023-10-22',
    endDate: '2023-10-28',
    students: 28,
    studentsCompleted: 20,
    totalQuestions: 20,
    duration: '45 min',
  },
  {
    id: 3,
    title: 'History Assessment',
    type: 'test',
    subject: 'Social Studies',
    class: 'Class 8',
    status: 'scheduled',
    startDate: '2023-11-02',
    endDate: '2023-11-08',
    students: 30,
    studentsCompleted: 0,
    totalQuestions: 25,
    duration: '60 min',
  },
  {
    id: 4,
    title: 'Science Quiz',
    type: 'quiz',
    subject: 'Science',
    class: 'Class 6',
    status: 'scheduled',
    startDate: '2023-11-05',
    endDate: '2023-11-11',
    students: 32, 
    studentsCompleted: 0,
    totalQuestions: 15,
    duration: '30 min',
  },
  {
    id: 5,
    title: 'Hindi Literature',
    type: 'test',
    subject: 'Hindi',
    class: 'Class 7',
    status: 'active',
    startDate: '2023-10-25',
    endDate: '2023-10-31',
    students: 28,
    studentsCompleted: 12,
    totalQuestions: 20,
    duration: '45 min',
  },
  {
    id: 6,
    title: 'Physics Quiz',
    type: 'quiz',
    subject: 'Science',
    class: 'Class 8',
    status: 'active',
    startDate: '2023-10-23',
    endDate: '2023-10-29',
    students: 30,
    studentsCompleted: 22,
    totalQuestions: 15,
    duration: '30 min',
  },
];

const TeacherActiveContent = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  // Filter content based on selected filters
  const filteredContent = activeContent.filter(content => {
    const statusMatch = statusFilter === 'all' || content.status === statusFilter;
    const classMatch = classFilter === 'all' || content.class === classFilter;
    return statusMatch && classMatch;
  });

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'scheduled':
        return <Badge className="bg-amber-500">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  // Calculate content statistics
  const activeCount = activeContent.filter(content => content.status === 'active').length;
  const scheduledCount = activeContent.filter(content => content.status === 'scheduled').length;

  // Get content type icon
  const getContentIcon = (type: string) => {
    return type === 'quiz' ? 
      <BookOpen className="h-5 w-5 text-indigo-600" /> : 
      <BarChart className="h-5 w-5 text-purple-600" />;
  };

  // Get completion percentage
  const getCompletionPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <TeacherPageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Active Content</h1>
        <p className="text-gray-500">Manage your active quizzes, tests, and assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-indigo-700">{activeCount}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="text-2xl font-bold text-amber-700">{scheduledCount}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-blue-700">90</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/4">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="Class 6">Class 6</SelectItem>
              <SelectItem value="Class 7">Class 7</SelectItem>
              <SelectItem value="Class 8">Class 8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContent.map((content) => (
          <Card key={content.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-2 ${
              content.subject === 'Mathematics' ? 'bg-blue-500' :
              content.subject === 'English' ? 'bg-green-500' :
              content.subject === 'Hindi' ? 'bg-yellow-500' :
              content.subject === 'Science' ? 'bg-red-500' :
              'bg-purple-500'
            }`} />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getContentIcon(content.type)}
                  <div>
                    <CardTitle>{content.title}</CardTitle>
                    <CardDescription>
                      {content.subject} • {content.class}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(content.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {new Date(content.startDate).toLocaleDateString()} - {new Date(content.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{content.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{content.totalQuestions} Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{content.students} Students</span>
                </div>
              </div>

              {content.status === 'active' && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion</span>
                    <span>{content.studentsCompleted}/{content.students} students</span>
                  </div>
                  <Progress 
                    value={getCompletionPercentage(content.studentsCompleted, content.students)} 
                    className="h-2 mb-3"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                asChild
              >
                <Link to={`/teacher/content/view/${content.id}`}>
                  View Details
                </Link>
              </Button>
              <Button
                asChild
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Link to={`/teacher/content/edit/${content.id}`}>
                  {content.status === 'scheduled' ? 'Edit' : 'View Results'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </TeacherPageContainer>
  );
};

export default TeacherActiveContent;
