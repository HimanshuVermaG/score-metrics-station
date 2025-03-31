
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, Filter } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for student reports
const studentData = [
  { id: 1, name: "Aakash Singh", class: "Class 6", rollNo: "C6-001", mathScore: 92, englishScore: 87, hindiScore: 78, gsScore: 85, attendance: 95, improvement: "+5%" },
  { id: 2, name: "Nisha Sharma", class: "Class 6", rollNo: "C6-002", mathScore: 78, englishScore: 92, hindiScore: 88, gsScore: 82, attendance: 92, improvement: "+3%" },
  { id: 3, name: "Rahul Patel", class: "Class 6", rollNo: "C6-003", mathScore: 65, englishScore: 70, hindiScore: 82, gsScore: 75, attendance: 88, improvement: "+7%" },
  { id: 4, name: "Priya Gupta", class: "Class 7", rollNo: "C7-001", mathScore: 88, englishScore: 79, hindiScore: 85, gsScore: 90, attendance: 97, improvement: "+4%" },
  { id: 5, name: "Vikram Yadav", class: "Class 7", rollNo: "C7-002", mathScore: 72, englishScore: 68, hindiScore: 75, gsScore: 80, attendance: 85, improvement: "+6%" },
  { id: 6, name: "Shreya Verma", class: "Class 7", rollNo: "C7-003", mathScore: 95, englishScore: 90, hindiScore: 92, gsScore: 88, attendance: 98, improvement: "+2%" },
  { id: 7, name: "Arjun Malhotra", class: "Class 8", rollNo: "C8-001", mathScore: 85, englishScore: 82, hindiScore: 78, gsScore: 88, attendance: 90, improvement: "+5%" },
  { id: 8, name: "Divya Kapoor", class: "Class 8", rollNo: "C8-002", mathScore: 90, englishScore: 95, hindiScore: 88, gsScore: 92, attendance: 96, improvement: "+3%" },
  { id: 9, name: "Kunal Joshi", class: "Class 8", rollNo: "C8-003", mathScore: 75, englishScore: 80, hindiScore: 85, gsScore: 78, attendance: 89, improvement: "+4%" },
];

const TeacherReports = () => {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter students based on selected class and search term
  const filteredStudents = studentData.filter(student => 
    (selectedClass === "all" || student.class === selectedClass) &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate performance indicators
  const getPerformanceColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceText = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    return "Needs Improvement";
  };

  return (
    <TeacherPageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Student Reports</h1>
        <p className="text-gray-600">View and analyze performance of students across all classes</p>
      </div>
      
      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Performance Overview</CardTitle>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
            <CardDescription>
              Detailed view of academic performance for all students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-1 items-center gap-2 relative">
                <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  className="pl-8" 
                  placeholder="Search by name or roll number" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="Class 6">Class 6</SelectItem>
                    <SelectItem value="Class 7">Class 7</SelectItem>
                    <SelectItem value="Class 8">Class 8</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="academic">
              <TabsList className="mb-6">
                <TabsTrigger value="academic">Academic Performance</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="improvement">Improvement Trends</TabsTrigger>
              </TabsList>
              
              <TabsContent value="academic" className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Class/Roll No</TableHead>
                      <TableHead>Mathematics</TableHead>
                      <TableHead>English</TableHead>
                      <TableHead>Hindi</TableHead>
                      <TableHead>General Studies</TableHead>
                      <TableHead>Overall</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const avgScore = Math.round((student.mathScore + student.englishScore + student.hindiScore + student.gsScore) / 4);
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{student.class}</span>
                              <span className="text-xs text-gray-500">{student.rollNo}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={getPerformanceColor(student.mathScore)}>{student.mathScore}%</span>
                          </TableCell>
                          <TableCell>
                            <span className={getPerformanceColor(student.englishScore)}>{student.englishScore}%</span>
                          </TableCell>
                          <TableCell>
                            <span className={getPerformanceColor(student.hindiScore)}>{student.hindiScore}%</span>
                          </TableCell>
                          <TableCell>
                            <span className={getPerformanceColor(student.gsScore)}>{student.gsScore}%</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${avgScore >= 85 ? 'bg-green-100 text-green-800' : avgScore >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {getPerformanceText(avgScore)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="attendance" className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Class/Roll No</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                      <TableHead>Days Present</TableHead>
                      <TableHead>Days Absent</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{student.class}</span>
                            <span className="text-xs text-gray-500">{student.rollNo}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.attendance}%</TableCell>
                        <TableCell>{Math.round(180 * (student.attendance / 100))}</TableCell>
                        <TableCell>{Math.round(180 * (1 - student.attendance / 100))}</TableCell>
                        <TableCell>
                          <Badge className={`${student.attendance >= 90 ? 'bg-green-100 text-green-800' : student.attendance >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {student.attendance >= 90 ? 'Excellent' : student.attendance >= 80 ? 'Good' : 'Needs Improvement'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="improvement" className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Class/Roll No</TableHead>
                      <TableHead>Previous Average</TableHead>
                      <TableHead>Current Average</TableHead>
                      <TableHead>Improvement</TableHead>
                      <TableHead>Areas of Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const avgScore = Math.round((student.mathScore + student.englishScore + student.hindiScore + student.gsScore) / 4);
                      const prevAvg = Math.round(avgScore - parseFloat(student.improvement.replace('%', '').replace('+', '')));
                      
                      // Determine best subject
                      const scores = [
                        { name: 'Mathematics', score: student.mathScore },
                        { name: 'English', score: student.englishScore },
                        { name: 'Hindi', score: student.hindiScore },
                        { name: 'General Studies', score: student.gsScore }
                      ];
                      const bestSubject = scores.reduce((prev, current) => (prev.score > current.score) ? prev : current);
                      
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{student.class}</span>
                              <span className="text-xs text-gray-500">{student.rollNo}</span>
                            </div>
                          </TableCell>
                          <TableCell>{prevAvg}%</TableCell>
                          <TableCell>{avgScore}%</TableCell>
                          <TableCell className="text-green-600 font-medium">{student.improvement}</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">
                              {bestSubject.name}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Key insights from the latest assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <h3 className="font-medium text-blue-700 mb-1">Top Performers</h3>
                  <p className="text-sm text-blue-600">3 students have shown exceptional performance with scores above 90%</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                  <h3 className="font-medium text-yellow-700 mb-1">Attention Needed</h3>
                  <p className="text-sm text-yellow-600">5 students need additional support in Mathematics</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                  <h3 className="font-medium text-green-700 mb-1">Most Improved</h3>
                  <p className="text-sm text-green-600">Class 7 has shown the highest improvement rate of 6%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Suggested actions based on current performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3 p-4 rounded-lg border">
                  <div className="min-w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">1</div>
                  <div>
                    <h3 className="font-medium mb-1">Organize remedial sessions</h3>
                    <p className="text-sm text-gray-600">Schedule additional classes for students who scored below 70% in Mathematics</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-lg border">
                  <div className="min-w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">2</div>
                  <div>
                    <h3 className="font-medium mb-1">Create personalized study plans</h3>
                    <p className="text-sm text-gray-600">Develop targeted plans for students in Class 8 to improve Hindi scores</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-lg border">
                  <div className="min-w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">3</div>
                  <div>
                    <h3 className="font-medium mb-1">Parent-teacher meetings</h3>
                    <p className="text-sm text-gray-600">Schedule meetings for students with attendance below 85%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherPageContainer>
  );
};

export default TeacherReports;
