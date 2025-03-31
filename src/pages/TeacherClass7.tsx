
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/ui/data-table';
import { 
  Users, User, BookOpen, Calendar, Clock, BarChart2, 
  AlertCircle, CheckCircle, FileText, PlusCircle 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for students
const classStudents = [
  { id: 1, name: 'Aakash Sharma', attendance: 92, performance: 85, lastActive: '2 hours ago', status: 'active' },
  { id: 2, name: 'Bhavya Patel', attendance: 88, performance: 78, lastActive: '1 day ago', status: 'inactive' },
  { id: 3, name: 'Charu Gupta', attendance: 95, performance: 90, lastActive: '5 hours ago', status: 'active' },
  { id: 4, name: 'Dhruv Singh', attendance: 80, performance: 75, lastActive: '3 days ago', status: 'inactive' },
  { id: 5, name: 'Esha Verma', attendance: 90, performance: 88, lastActive: '1 hour ago', status: 'active' },
  { id: 6, name: 'Farhan Khan', attendance: 85, performance: 80, lastActive: '6 hours ago', status: 'active' },
  { id: 7, name: 'Gitanjali Roy', attendance: 78, performance: 72, lastActive: '2 days ago', status: 'inactive' },
  { id: 8, name: 'Harshit Tiwari', attendance: 93, performance: 86, lastActive: '4 hours ago', status: 'active' },
];

// Mock data for active content
const activeContent = [
  {
    id: 1,
    title: 'Fractions and Decimals',
    type: 'quiz',
    subject: 'Mathematics',
    status: 'active',
    startDate: '2023-10-22',
    endDate: '2023-10-29',
    students: 28,
    studentsCompleted: 18,
    totalQuestions: 15,
    duration: '30 min',
  },
  {
    id: 2,
    title: 'Grammar Assessment',
    type: 'test',
    subject: 'English',
    status: 'active',
    startDate: '2023-10-25',
    endDate: '2023-10-31',
    students: 28,
    studentsCompleted: 20,
    totalQuestions: 20,
    duration: '45 min',
  },
  {
    id: 3,
    title: 'Hindi Literature',
    type: 'test',
    subject: 'Hindi',
    status: 'active',
    startDate: '2023-10-27',
    endDate: '2023-11-03',
    students: 28,
    studentsCompleted: 12,
    totalQuestions: 20,
    duration: '45 min',
  },
];

// Mock data for upcoming content
const upcomingContent = [
  {
    id: 4,
    title: 'Algebra Basics',
    type: 'quiz',
    subject: 'Mathematics',
    status: 'scheduled',
    startDate: '2023-11-05',
    endDate: '2023-11-12',
    totalQuestions: 15,
    duration: '30 min',
  },
  {
    id: 5,
    title: 'History Assessment',
    type: 'test',
    subject: 'Social Studies',
    status: 'scheduled',
    startDate: '2023-11-10',
    endDate: '2023-11-17',
    totalQuestions: 25,
    duration: '60 min',
  },
];

const TeacherClass7 = () => {
  const [studentTab, setStudentTab] = useState('all');
  
  // Filter students based on tab
  const filteredStudents = studentTab === 'all' 
    ? classStudents 
    : classStudents.filter(student => student.status === studentTab);
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'scheduled':
        return <Badge className="bg-amber-500">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };
  
  // Get content type icon
  const getContentIcon = (type: string) => {
    return type === 'quiz' 
      ? <BookOpen className="h-5 w-5 text-indigo-600" /> 
      : <FileText className="h-5 w-5 text-purple-600" />;
  };
  
  // Calculate performance color
  const getPerformanceColor = (performance: number) => {
    if (performance >= 85) return 'text-green-600';
    if (performance >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  
  // Calculate completion percentage
  const getCompletionPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <TeacherPageContainer>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Class 7</h1>
          <p className="text-gray-500">Manage your Class 7 students and content</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            asChild
          >
            <Link to="/teacher/reports?class=7">
              <BarChart2 className="h-4 w-4" />
              View Reports
            </Link>
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
            asChild
          >
            <Link to="/teacher/create">
              <PlusCircle className="h-4 w-4" />
              Create Content
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-indigo-700">{classStudents.length}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Students</p>
                <p className="text-2xl font-bold text-green-700">
                  {classStudents.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Content</p>
                <p className="text-2xl font-bold text-blue-700">{activeContent.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="students" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="content">Active Content</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Class 7 Students</CardTitle>
              <CardDescription>Manage all students in Class 7</CardDescription>
              
              <Tabs value={studentTab} onValueChange={setStudentTab} className="mt-2">
                <TabsList className="max-w-[400px]">
                  <TabsTrigger value="all">All Students</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-500">Attendance</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-500">Performance</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-500">Last Active</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-500">Status</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredStudents.map(student => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-medium text-sm mr-3">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {student.attendance}%
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={getPerformanceColor(student.performance)}>
                            {student.performance}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500">
                          {student.lastActive}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getStatusBadge(student.status)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button 
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link to={`/teacher/students/${student.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">Showing {filteredStudents.length} students</p>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/teacher/students">View All Students</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeContent.map((content) => (
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
                          {content.subject} • {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
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
                    <Link to={`/teacher/content/results/${content.id}`}>
                      View Results
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {activeContent.length === 0 && (
            <div className="text-center py-10">
              <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Active Content</h3>
              <p className="text-gray-500 mb-4">There's no active content for Class 7 right now.</p>
              <Button 
                asChild
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Link to="/teacher/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New Content
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingContent.map((content) => (
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
                          {content.subject} • {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(content.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
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
                      Edit
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {upcomingContent.length === 0 && (
            <div className="text-center py-10">
              <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Upcoming Content</h3>
              <p className="text-gray-500 mb-4">There's no upcoming content for Class 7 right now.</p>
              <Button 
                asChild
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Link to="/teacher/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New Content
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </TeacherPageContainer>
  );
};

export default TeacherClass7;
