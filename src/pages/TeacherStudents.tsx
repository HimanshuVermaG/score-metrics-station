
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Users, User, Search, PlusCircle, Download, Filter, UploadCloud,
  ArrowUp, ArrowDown, Minus, Mail, BarChart, FileText, MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DataTable } from '@/components/ui/data-table';

// Mock data for students
const allStudents = [
  { id: 1, name: 'Aakash Sharma', class: 'Class 6', avgScore: 82, attendance: 92, lastActive: '2 hours ago', status: 'active' },
  { id: 2, name: 'Bhavya Patel', class: 'Class 6', avgScore: 78, attendance: 88, lastActive: '1 day ago', status: 'inactive' },
  { id: 3, name: 'Charu Gupta', class: 'Class 6', avgScore: 90, attendance: 95, lastActive: '5 hours ago', status: 'active' },
  { id: 4, name: 'Dhruv Singh', class: 'Class 6', avgScore: 75, attendance: 80, lastActive: '3 days ago', status: 'inactive' },
  { id: 5, name: 'Priya Sharma', class: 'Class 7', avgScore: 95, attendance: 94, lastActive: '1 hour ago', status: 'active' },
  { id: 6, name: 'Rajesh Verma', class: 'Class 7', avgScore: 65, attendance: 78, lastActive: '2 days ago', status: 'inactive' },
  { id: 7, name: 'Vikram Mehta', class: 'Class 7', avgScore: 90, attendance: 92, lastActive: '4 hours ago', status: 'active' },
  { id: 8, name: 'Gitanjali Roy', class: 'Class 7', avgScore: 72, attendance: 82, lastActive: '1 day ago', status: 'inactive' },
  { id: 9, name: 'Ananya Joshi', class: 'Class 8', avgScore: 88, attendance: 94, lastActive: '1 hour ago', status: 'active' },
  { id: 10, name: 'Rahul Singh', class: 'Class 8', avgScore: 92, attendance: 91, lastActive: '3 hours ago', status: 'active' },
  { id: 11, name: 'Arjun Kumar', class: 'Class 8', avgScore: 58, attendance: 75, lastActive: '2 days ago', status: 'inactive' },
  { id: 12, name: 'Gauri Mishra', class: 'Class 8', avgScore: 90, attendance: 95, lastActive: '4 hours ago', status: 'active' },
];

// Mock data for student performance reports
const studentReports = [
  { 
    id: 1, 
    name: 'Priya Sharma', 
    class: 'Class 7',
    latestTest: 'Mathematics - Algebra', 
    latestScore: 92,
    avgScore: 95,
    improvement: 3.5,
    strengths: ['Algebra', 'Geometry'],
    weaknesses: ['Statistics'],
    lastUpdated: '2 days ago'
  },
  { 
    id: 5, 
    name: 'Rahul Singh', 
    class: 'Class 8',
    latestTest: 'Science - Physics', 
    latestScore: 88,
    avgScore: 92,
    improvement: 2.1,
    strengths: ['Physics', 'Chemistry'],
    weaknesses: ['Biology'],
    lastUpdated: '3 days ago'
  },
  { 
    id: 3, 
    name: 'Charu Gupta', 
    class: 'Class 6',
    latestTest: 'English - Grammar', 
    latestScore: 95,
    avgScore: 90,
    improvement: 5.0,
    strengths: ['Grammar', 'Vocabulary'],
    weaknesses: ['Comprehension'],
    lastUpdated: '1 week ago'
  },
  { 
    id: 10, 
    name: 'Vikram Mehta', 
    class: 'Class 7',
    latestTest: 'Social Studies - History', 
    latestScore: 85,
    avgScore: 90,
    improvement: -2.5,
    strengths: ['History', 'Geography'],
    weaknesses: ['Civics'],
    lastUpdated: '5 days ago'
  },
  { 
    id: 9, 
    name: 'Ananya Joshi', 
    class: 'Class 8',
    latestTest: 'Hindi - Literature', 
    latestScore: 90,
    avgScore: 88,
    improvement: 1.8,
    strengths: ['Poetry', 'Prose'],
    weaknesses: ['Grammar'],
    lastUpdated: '1 week ago'
  },
];

const TeacherStudents = () => {
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter students based on filters
  const filteredStudents = allStudents.filter(student => {
    const classMatch = classFilter === 'all' || student.class === `Class ${classFilter}`;
    const statusMatch = statusFilter === 'all' || student.status === statusFilter;
    const searchMatch = !searchQuery || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return classMatch && statusMatch && searchMatch;
  });
  
  // Calculate stats
  const totalStudents = allStudents.length;
  const activeStudents = allStudents.filter(s => s.status === 'active').length;
  const inactiveStudents = allStudents.filter(s => s.status === 'inactive').length;
  
  // Class distribution
  const class6Count = allStudents.filter(s => s.class === 'Class 6').length;
  const class7Count = allStudents.filter(s => s.class === 'Class 7').length;
  const class8Count = allStudents.filter(s => s.class === 'Class 8').length;
  
  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-500">Active</Badge>
      : <Badge className="bg-gray-500">Inactive</Badge>;
  };
  
  // Function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  
  // Function to get improvement trend icon and color
  const getImprovementTrend = (value: number) => {
    if (value > 0) {
      return { icon: <ArrowUp className="h-4 w-4 text-green-500" />, color: 'text-green-500' };
    } else if (value < 0) {
      return { icon: <ArrowDown className="h-4 w-4 text-red-500" />, color: 'text-red-500' };
    } else {
      return { icon: <Minus className="h-4 w-4 text-gray-500" />, color: 'text-gray-500' };
    }
  };
  
  // Columns for student table
  const studentColumns = [
    {
      id: 'name',
      header: 'Student Name',
      cell: (student: typeof allStudents[0]) => (
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
      cell: (student: typeof allStudents[0]) => student.class
    },
    {
      id: 'score',
      header: 'Avg. Score',
      cell: (student: typeof allStudents[0]) => (
        <span className={getScoreColor(student.avgScore)}>{student.avgScore}%</span>
      )
    },
    {
      id: 'attendance',
      header: 'Attendance',
      cell: (student: typeof allStudents[0]) => (
        <span className={
          student.attendance >= 90 ? 'text-green-600' :
          student.attendance >= 80 ? 'text-amber-600' :
          'text-red-600'
        }>
          {student.attendance}%
        </span>
      )
    },
    {
      id: 'lastActive',
      header: 'Last Active',
      cell: (student: typeof allStudents[0]) => (
        <span className="text-gray-500">{student.lastActive}</span>
      )
    },
    {
      id: 'status',
      header: 'Status',
      cell: (student: typeof allStudents[0]) => getStatusBadge(student.status)
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (student: typeof allStudents[0]) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to={`/teacher/students/${student.id}`}>
              View
            </Link>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0">
              <div className="py-1">
                <Link 
                  to={`/teacher/students/${student.id}/message`}
                  className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Message
                </Link>
                <Link 
                  to={`/teacher/students/${student.id}/report`}
                  className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Reports
                </Link>
                <Link 
                  to={`/teacher/students/${student.id}/assignments`}
                  className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Assignments
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    }
  ];
  
  // Columns for report table
  const reportColumns = [
    {
      id: 'name',
      header: 'Student Name',
      cell: (report: typeof studentReports[0]) => (
        <div className="flex items-center">
          <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-medium text-sm mr-3">
            {report.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <Link to={`/teacher/students/${report.id}`} className="font-medium text-indigo-600 hover:underline">
              {report.name}
            </Link>
            <div className="text-xs text-gray-500">{report.class}</div>
          </div>
        </div>
      )
    },
    {
      id: 'lastTest',
      header: 'Latest Test',
      cell: (report: typeof studentReports[0]) => (
        <div>
          <div className="font-medium">{report.latestTest}</div>
          <div className={`text-sm ${getScoreColor(report.latestScore)}`}>
            {report.latestScore}%
          </div>
        </div>
      )
    },
    {
      id: 'average',
      header: 'Average',
      cell: (report: typeof studentReports[0]) => (
        <span className={getScoreColor(report.avgScore)}>{report.avgScore}%</span>
      )
    },
    {
      id: 'improvement',
      header: 'Trend',
      cell: (report: typeof studentReports[0]) => {
        const { icon, color } = getImprovementTrend(report.improvement);
        return (
          <div className="flex items-center">
            {icon}
            <span className={`ml-1 ${color}`}>{Math.abs(report.improvement)}%</span>
          </div>
        );
      }
    },
    {
      id: 'strengths',
      header: 'Strengths',
      cell: (report: typeof studentReports[0]) => (
        <div className="flex flex-wrap gap-1">
          {report.strengths.map((strength, idx) => (
            <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {strength}
            </Badge>
          ))}
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (report: typeof studentReports[0]) => (
        <Button 
          variant="outline" 
          size="sm"
          asChild
        >
          <Link to={`/teacher/students/${report.id}/report`}>
            Full Report
          </Link>
        </Button>
      )
    }
  ];

  return (
    <TeacherPageContainer>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Manage Students</h1>
          <p className="text-gray-500">View and manage all student accounts</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            Import
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-indigo-100 mr-3">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="font-medium">Total Students</span>
              </div>
              <span className="text-2xl font-bold">{totalStudents}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>All Classes</span>
              <span>Class 6: {class6Count}, Class 7: {class7Count}, Class 8: {class8Count}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Active Students</span>
              </div>
              <span className="text-2xl font-bold">{activeStudents}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Last 7 days</span>
              <span>{Math.round((activeStudents/totalStudents)*100)}% of total</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-amber-100 mr-3">
                  <User className="h-5 w-5 text-amber-600" />
                </div>
                <span className="font-medium">Inactive Students</span>
              </div>
              <span className="text-2xl font-bold">{inactiveStudents}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Not active in 3+ days</span>
              <span>{Math.round((inactiveStudents/totalStudents)*100)}% of total</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="list" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="reports">Performance Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage student accounts and view information</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DataTable
                data={filteredStudents}
                columns={studentColumns}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredStudents.length} of {totalStudents} students
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Student Performance Reports</CardTitle>
              <CardDescription>View detailed academic performance reports for students</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <DataTable
                data={studentReports}
                columns={reportColumns}
                searchField="name"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Showing {studentReports.length} performance reports
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Reports
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </TeacherPageContainer>
  );
};

export default TeacherStudents;
