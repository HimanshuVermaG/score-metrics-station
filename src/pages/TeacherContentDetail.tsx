
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '@/components/ui/data-table';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Download, 
  Eye, 
  Pencil, 
  Trash2, 
  ArrowLeft,
  PlusCircle 
} from 'lucide-react';

const contentItems = [
  {
    id: '1',
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
    description: 'This quiz covers basic algebraic concepts including variables, equations, and simple problem-solving techniques.',
    questions: [
      { id: 1, text: 'If x + 5 = 12, what is the value of x?', correctAnswer: '7', type: 'short_answer' },
      { id: 2, text: 'Which of the following is a solution to 2y - 3 = 7?', options: ['y = 2', 'y = 5', 'y = 4', 'y = 6'], correctAnswer: 'y = 5', type: 'multiple_choice' },
    ]
  },
  {
    id: '2',
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
    description: 'This test evaluates understanding of grammar rules including parts of speech, sentence structure, and punctuation.',
    questions: [
      { id: 1, text: 'Identify the noun in the following sentence: "The teacher gave homework to the class."', options: ['teacher', 'gave', 'homework', 'to'], correctAnswer: 'teacher', type: 'multiple_choice' },
      { id: 2, text: 'Correct the following sentence: "She don\'t like ice cream."', correctAnswer: 'She doesn\'t like ice cream.', type: 'short_answer' },
    ]
  },
  {
    id: '3',
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
    description: 'This quiz covers basic scientific concepts including matter, energy, and simple experiments.',
    questions: [
      { id: 1, text: 'What is the chemical symbol for water?', correctAnswer: 'H2O', type: 'short_answer' },
      { id: 2, text: 'Which of the following is NOT a state of matter?', options: ['Solid', 'Liquid', 'Gas', 'Energy'], correctAnswer: 'Energy', type: 'multiple_choice' },
    ]
  },
];

const TeacherContentDetail = () => {
  const { contentId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  const content = contentItems.find(item => item.id === contentId);
  
  if (!content) {
    return (
      <TeacherPageContainer>
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-bold mb-2">Content Not Found</h1>
          <p className="text-gray-500 mb-4">The content you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/teacher/active-content">Back to Active Content</Link>
          </Button>
        </div>
      </TeacherPageContainer>
    );
  }
  
  const completionPercentage = Math.round((content.studentsCompleted / content.students) * 100);
  
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
  
  const studentResults = [
    { id: 1, name: 'Priya Sharma', score: 92, status: 'completed', submittedAt: '2023-10-26 14:30', timeSpent: '28 min' },
    { id: 2, name: 'Rahul Singh', score: 85, status: 'completed', submittedAt: '2023-10-25 15:42', timeSpent: '24 min' },
    { id: 3, name: 'Aisha Patel', score: 78, status: 'completed', submittedAt: '2023-10-27 09:15', timeSpent: '29 min' },
    { id: 4, name: 'Vikram Mehta', score: 90, status: 'completed', submittedAt: '2023-10-26 11:20', timeSpent: '22 min' },
    { id: 5, name: 'Neha Gupta', status: 'not_started', score: 0, submittedAt: '', timeSpent: '' },
  ];
  
  const studentResultsColumns = [
    {
      id: 'name',
      header: 'Student Name',
      cell: (student: typeof studentResults[0]) => (
        <div className="flex items-center">
          <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-medium text-sm mr-3">
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <Link to={`/teacher/students/${student.id}`} className="font-medium text-indigo-600 hover:underline">
            {student.name}
          </Link>
        </div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      cell: (student: typeof studentResults[0]) => (
        <div className="flex items-center">
          {student.status === 'completed' ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">Completed</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-600">Not Started</span>
            </>
          )}
        </div>
      )
    },
    {
      id: 'score',
      header: 'Score',
      cell: (student: typeof studentResults[0]) => (
        <span className={student.score >= 80 ? 'text-green-600 font-semibold' : 
                         student.score >= 60 ? 'text-amber-600 font-semibold' : 
                         'text-red-600 font-semibold'}>
          {student.status === 'completed' ? `${student.score}%` : '-'}
        </span>
      )
    },
    {
      id: 'submittedAt',
      header: 'Submitted At',
      cell: (student: typeof studentResults[0]) => (
        <span>{student.submittedAt || '-'}</span>
      )
    },
    {
      id: 'timeSpent',
      header: 'Time Spent',
      cell: (student: typeof studentResults[0]) => (
        <span>{student.timeSpent || '-'}</span>
      )
    },
    {
      id: 'action',
      header: 'Action',
      cell: (student: typeof studentResults[0]) => (
        <Button 
          variant="outline" 
          size="sm"
          asChild
          disabled={student.status !== 'completed'}
        >
          <Link to={`/teacher/content/${contentId}/student/${student.id}`}>
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Link>
        </Button>
      )
    }
  ];
  
  const questionColumns = [
    {
      id: 'id',
      header: '#',
      cell: (question: typeof content.questions[0]) => <span>Q{question.id}</span>
    },
    {
      id: 'text',
      header: 'Question',
      cell: (question: typeof content.questions[0]) => <span>{question.text}</span>
    },
    {
      id: 'type',
      header: 'Type',
      cell: (question: typeof content.questions[0]) => (
        <Badge className={question.type === 'multiple_choice' ? 'bg-blue-500' : 'bg-purple-500'}>
          {question.type === 'multiple_choice' ? 'Multiple Choice' : 'Short Answer'}
        </Badge>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (question: typeof content.questions[0]) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4 text-indigo-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      )
    }
  ];
  
  return (
    <TeacherPageContainer>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/teacher/active-content">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{content.title}</h1>
          {getStatusBadge(content.status)}
        </div>
        <p className="text-gray-500">{content.description}</p>
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Date Range</p>
                  <p className="font-medium">
                    {new Date(content.startDate).toLocaleDateString()} - {new Date(content.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Questions</p>
                  <p className="font-medium">{content.totalQuestions}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{content.duration}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Students</p>
                  <p className="font-medium">{content.students}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
              <CardDescription>
                A summary of this {content.type === 'quiz' ? 'quiz' : 'test'} and its performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Completion Statistics</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Student Completion</span>
                    <span>{content.studentsCompleted}/{content.students} students</span>
                  </div>
                  <Progress 
                    value={completionPercentage} 
                    className="h-2 mb-3"
                  />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Completed: {content.studentsCompleted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span>Pending: {content.students - content.studentsCompleted}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Performance Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Average Score</p>
                      <p className="text-xl font-bold text-indigo-700">78%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Highest Score</p>
                      <p className="text-xl font-bold text-green-600">92%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Lowest Score</p>
                      <p className="text-xl font-bold text-amber-600">65%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-3">
                {content.status === 'scheduled' ? (
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Content
                  </Button>
                ) : (
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Student Results</CardTitle>
              <CardDescription>
                Detailed performance data for all students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={studentResults}
                columns={studentResultsColumns}
                searchField="name"
              />
            </CardContent>
            <CardFooter>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Question Bank</CardTitle>
              <CardDescription>
                All questions in this {content.type === 'quiz' ? 'quiz' : 'test'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={content.questions}
                columns={questionColumns}
                pagination={false}
              />
            </CardContent>
            <CardFooter>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Manage settings for this {content.type === 'quiz' ? 'quiz' : 'test'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Content Title</p>
                        <p className="font-medium">{content.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Subject</p>
                        <p className="font-medium">{content.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Class</p>
                        <p className="font-medium">{content.class}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Availability Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Start Date</p>
                        <p className="font-medium">{new Date(content.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">End Date</p>
                        <p className="font-medium">{new Date(content.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <div>
                          {getStatusBadge(content.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                  Delete Content
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Settings
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </TeacherPageContainer>
  );
};

export default TeacherContentDetail;
