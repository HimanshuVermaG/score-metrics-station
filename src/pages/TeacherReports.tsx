import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart2, 
  PieChart as PieChartIcon, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  Download, 
  Filter, 
  BarChart as BarChartIcon,
  BookOpen,
  Users,
  Clock,
  Calendar
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { DataTable } from '@/components/ui/data-table';

const classMetrics = [
  { id: 'class6', name: 'Class 6', students: 32, avgScore: 78, tests: 15, improvement: 5.2 },
  { id: 'class7', name: 'Class 7', students: 28, avgScore: 82, tests: 12, improvement: 3.8 },
  { id: 'class8', name: 'Class 8', students: 30, avgScore: 75, tests: 14, improvement: -1.5 },
];

const subjectPerformance = [
  { name: 'Mathematics', score: 76, tests: 10, stdDev: 8.5 },
  { name: 'English', score: 82, tests: 8, stdDev: 6.2 },
  { name: 'Hindi', score: 85, tests: 7, stdDev: 5.8 },
  { name: 'Science', score: 79, tests: 9, stdDev: 7.3 },
  { name: 'Social Studies', score: 74, tests: 6, stdDev: 9.1 },
];

const topStudents = [
  { id: 1, name: 'Priya Sharma', class: 'Class 7', avgScore: 95, improvement: 4.2, streak: 12 },
  { id: 2, name: 'Rahul Singh', class: 'Class 8', avgScore: 92, improvement: 6.5, streak: 8 },
  { id: 3, name: 'Aisha Patel', class: 'Class 6', avgScore: 91, improvement: 3.8, streak: 10 },
  { id: 4, name: 'Vikram Mehta', class: 'Class 7', avgScore: 90, improvement: 2.5, streak: 7 },
  { id: 5, name: 'Neha Gupta', class: 'Class 6', avgScore: 89, improvement: 5.0, streak: 9 },
];

const strugglingStudents = [
  { id: 1, name: 'Arjun Kumar', class: 'Class 8', avgScore: 58, decline: 4.5, missedTests: 3 },
  { id: 2, name: 'Kavita Sharma', class: 'Class 6', avgScore: 62, decline: 3.2, missedTests: 2 },
  { id: 3, name: 'Rajesh Verma', class: 'Class 7', avgScore: 65, decline: 6.8, missedTests: 4 },
  { id: 4, name: 'Sunita Patel', class: 'Class 8', avgScore: 67, decline: 2.1, missedTests: 1 },
  { id: 5, name: 'Deepak Joshi', class: 'Class 6', avgScore: 68, decline: 3.5, missedTests: 2 },
];

const monthlyPerformanceData = [
  { month: 'Jan', class6: 72, class7: 76, class8: 70 },
  { month: 'Feb', class6: 74, class7: 78, class8: 71 },
  { month: 'Mar', class6: 73, class7: 80, class8: 69 },
  { month: 'Apr', class6: 75, class7: 79, class8: 72 },
  { month: 'May', class6: 78, class7: 81, class8: 73 },
  { month: 'Jun', class6: 76, class7: 83, class8: 75 },
  { month: 'Jul', class6: 79, class7: 82, class8: 74 },
  { month: 'Aug', class6: 81, class7: 84, class8: 76 },
];

const subjectDistributionData = [
  { name: 'Mathematics', value: 22 },
  { name: 'English', value: 18 },
  { name: 'Hindi', value: 15 },
  { name: 'Science', value: 20 },
  { name: 'Social Studies', value: 12 },
  { name: 'Others', value: 8 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#44a3cc', '#a4de6c'];

const TeacherReports = () => {
  const [searchParams] = useSearchParams();
  const [classFilter, setClassFilter] = useState(searchParams.get('class') || 'all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('last30');
  
  const getImprovementTrend = (value: number) => {
    if (value > 0) {
      return { icon: <ArrowUp className="h-4 w-4 text-green-500" />, color: 'text-green-500' };
    } else if (value < 0) {
      return { icon: <ArrowDown className="h-4 w-4 text-red-500" />, color: 'text-red-500' };
    } else {
      return { icon: <Minus className="h-4 w-4 text-gray-500" />, color: 'text-gray-500' };
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const topStudentColumns = [
    {
      id: 'name',
      header: 'Student Name',
      cell: (student: typeof topStudents[0]) => (
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
      id: 'class',
      header: 'Class',
      cell: (student: typeof topStudents[0]) => student.class
    },
    {
      id: 'score',
      header: 'Avg. Score',
      cell: (student: typeof topStudents[0]) => (
        <span className={getScoreColor(student.avgScore)}>{student.avgScore}%</span>
      )
    },
    {
      id: 'improvement',
      header: 'Improvement',
      cell: (student: typeof topStudents[0]) => {
        const { icon, color } = getImprovementTrend(student.improvement);
        return (
          <div className="flex items-center">
            {icon}
            <span className={`ml-1 ${color}`}>{Math.abs(student.improvement)}%</span>
          </div>
        );
      }
    },
    {
      id: 'action',
      header: 'Action',
      cell: (student: typeof topStudents[0]) => (
        <Button 
          variant="outline" 
          size="sm"
          asChild
        >
          <Link to={`/teacher/students/${student.id}`}>View Details</Link>
        </Button>
      )
    }
  ];
  
  const strugglingStudentColumns = [
    {
      id: 'name',
      header: 'Student Name',
      cell: (student: typeof strugglingStudents[0]) => (
        <div className="flex items-center">
          <div className="h-8 w-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-medium text-sm mr-3">
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <Link to={`/teacher/students/${student.id}`} className="font-medium text-indigo-600 hover:underline">
            {student.name}
          </Link>
        </div>
      )
    },
    {
      id: 'class',
      header: 'Class',
      cell: (student: typeof strugglingStudents[0]) => student.class
    },
    {
      id: 'score',
      header: 'Avg. Score',
      cell: (student: typeof strugglingStudents[0]) => (
        <span className={getScoreColor(student.avgScore)}>{student.avgScore}%</span>
      )
    },
    {
      id: 'decline',
      header: 'Decline',
      cell: (student: typeof strugglingStudents[0]) => (
        <div className="flex items-center">
          <ArrowDown className="h-4 w-4 text-red-500" />
          <span className="ml-1 text-red-500">{student.decline}%</span>
        </div>
      )
    },
    {
      id: 'missedTests',
      header: 'Missed Tests',
      cell: (student: typeof strugglingStudents[0]) => (
        <Badge variant="destructive">{student.missedTests}</Badge>
      )
    },
    {
      id: 'action',
      header: 'Action',
      cell: (student: typeof strugglingStudents[0]) => (
        <Button 
          variant="outline" 
          size="sm"
          asChild
        >
          <Link to={`/teacher/students/${student.id}`}>View Details</Link>
        </Button>
      )
    }
  ];

  return (
    <TeacherPageContainer>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Student Reports</h1>
          <p className="text-gray-500">Comprehensive analytics and performance insights</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-indigo-100 mr-3">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="font-medium">Total Classes</span>
              </div>
              <span className="text-2xl font-bold">3</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Class 6, 7, 8</span>
              <span>{classMetrics.reduce((sum, m) => sum + m.students, 0)} Students</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <BarChartIcon className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Average Score</span>
              </div>
              <span className="text-2xl font-bold">78%</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>All Classes</span>
              <div className="flex items-center">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">2.5%</span>
                <span className="ml-1">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">Tests Conducted</span>
              </div>
              <span className="text-2xl font-bold">
                {classMetrics.reduce((sum, m) => sum + m.tests, 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Last 30 days</span>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>5 scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row flex-wrap gap-4">
        <div className="w-full sm:w-1/4">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="6">Class 6</SelectItem>
              <SelectItem value="7">Class 7</SelectItem>
              <SelectItem value="8">Class 8</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-1/4">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="social">Social Studies</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-1/4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="last90">Last 90 days</SelectItem>
              <SelectItem value="allTime">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-indigo-600" />
              Monthly Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyPerformanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="class6" stroke="#8884d8" name="Class 6" />
                  <Line type="monotone" dataKey="class7" stroke="#82ca9d" name="Class 7" />
                  <Line type="monotone" dataKey="class8" stroke="#ffc658" name="Class 8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="mr-2 h-5 w-5 text-indigo-600" />
              Subject Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-center text-gray-500 mt-4">
              Distribution of tests by subject
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topStudents">Top Students</TabsTrigger>
          <TabsTrigger value="strugglingStudents">Struggling Students</TabsTrigger>
          <TabsTrigger value="subjectAnalysis">Subject Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {classMetrics.map(cls => (
              <Card key={cls.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-2 ${
                  cls.name === 'Class 6' ? 'bg-blue-500' :
                  cls.name === 'Class 7' ? 'bg-green-500' :
                  'bg-amber-500'
                }`} />
                <CardHeader className="pb-2">
                  <CardTitle>{cls.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Students</p>
                      <p className="text-xl font-bold">{cls.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg. Score</p>
                      <p className={`text-xl font-bold ${getScoreColor(cls.avgScore)}`}>
                        {cls.avgScore}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tests</p>
                      <p className="text-xl font-bold">{cls.tests}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Improvement</p>
                      <div className="flex items-center">
                        {getImprovementTrend(cls.improvement).icon}
                        <span className={`ml-1 text-xl font-bold ${getImprovementTrend(cls.improvement).color}`}>
                          {Math.abs(cls.improvement)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link to={`/teacher/class/${cls.name.split(' ')[1]}`}>
                      View Class Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map(subject => {
                  return (
                    <div key={subject.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{subject.name}</span>
                        <span className={getScoreColor(subject.score)}>{subject.score}%</span>
                      </div>
                      <Progress 
                        value={subject.score} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{subject.tests} Tests</span>
                        <span>Std Dev: ±{subject.stdDev}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="topStudents">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={topStudents}
                columns={topStudentColumns}
                searchField="name"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strugglingStudents">
          <Card>
            <CardHeader>
              <CardTitle>Students Requiring Attention</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={strugglingStudents}
                columns={strugglingStudentColumns}
                searchField="name"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjectAnalysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#8884d8" name="Average Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subject Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjectPerformance.map(subject => (
                    <div key={subject.name} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-lg">{subject.name}</h3>
                        <Badge className={
                          subject.score >= 85 ? 'bg-green-500' :
                          subject.score >= 70 ? 'bg-amber-500' :
                          'bg-red-500'
                        }>
                          {subject.score}%
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-500">Tests</p>
                          <p className="font-medium">{subject.tests}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Standard Deviation</p>
                          <p className="font-medium">±{subject.stdDev}%</p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link to={`/teacher/subject/${subject.name.toLowerCase()}`}>
                          View Detailed Analysis
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </TeacherPageContainer>
  );
};

export default TeacherReports;
