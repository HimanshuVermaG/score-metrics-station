
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Download, Mail, UserPlus } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';

// Mock data for students
const studentsData = [
  { id: 1, name: "Aakash Singh", rollNo: "C6-001", attendance: 95, completed: 85, avatar: "AS" },
  { id: 2, name: "Nisha Sharma", rollNo: "C6-002", attendance: 92, completed: 78, avatar: "NS" },
  { id: 3, name: "Rahul Patel", rollNo: "C6-003", attendance: 88, completed: 65, avatar: "RP" },
  { id: 4, name: "Maya Verma", rollNo: "C6-004", attendance: 97, completed: 90, avatar: "MV" },
  { id: 5, name: "Aryan Gupta", rollNo: "C6-005", attendance: 85, completed: 72, avatar: "AG" },
  { id: 6, name: "Shreya Joshi", rollNo: "C6-006", attendance: 93, completed: 88, avatar: "SJ" },
  { id: 7, name: "Dev Malhotra", rollNo: "C6-007", attendance: 90, completed: 75, avatar: "DM" },
  { id: 8, name: "Ananya Kapoor", rollNo: "C6-008", attendance: 94, completed: 82, avatar: "AK" },
];

// Mock data for recent activities
const recentActivities = [
  { id: 1, title: "Mathematics Quiz", date: "Today, 10:30 AM", students: 24, avgScore: 78 },
  { id: 2, title: "English Assignment", date: "Yesterday, 2:15 PM", students: 24, avgScore: 82 },
  { id: 3, title: "Science Experiment", date: "15 May, 11:00 AM", students: 23, avgScore: 85 },
  { id: 4, title: "Hindi Test", date: "12 May, 9:45 AM", students: 24, avgScore: 72 },
];

const TeacherClass6 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("students");
  
  // Filter students based on search term
  const filteredStudents = studentsData.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TeacherPageContainer>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Class 6 Management</h1>
          <p className="text-gray-600">Overview and management for Class 6 students</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Message Class
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-indigo-600">24</div>
              <div className="text-sm text-gray-500">Total enrolled</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-600">92%</div>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-amber-600">78%</div>
              <div className="text-sm text-gray-500">Last assessment</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="students" onValueChange={setCurrentTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus Progress</TabsTrigger>
        </TabsList>
        
        <div className="flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              className="pl-8" 
              placeholder={currentTab === "students" ? "Search students..." : "Search activities..."} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {currentTab === "students" && (
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export List
            </Button>
          )}
          
          {currentTab === "activities" && (
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Activity
            </Button>
          )}
        </div>
        
        <TabsContent value="students" className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Assignments Completed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-medium text-sm">
                        {student.avatar}
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.attendance} className="h-2 w-16" />
                      <span>{student.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.completed} className="h-2 w-16" />
                      <span>{student.completed}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={student.attendance >= 90 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                      {student.attendance >= 90 ? "Active" : "Attention Needed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="activities" className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Participation</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.title}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.students}/24 students</TableCell>
                  <TableCell>
                    <Badge className={
                      activity.avgScore >= 85 ? "bg-green-100 text-green-800" : 
                      activity.avgScore >= 70 ? "bg-amber-100 text-amber-800" : 
                      "bg-red-100 text-red-800"
                    }>
                      {activity.avgScore}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Results</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="syllabus" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mathematics</CardTitle>
              <CardDescription>Chapter completion and assessment status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Chapter 1-3: Numbers and Operations</span>
                  <span className="text-green-600">Completed</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Chapter 4-5: Geometry</span>
                  <span className="text-green-600">Completed</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Chapter 6-7: Fractions and Decimals</span>
                  <span className="text-amber-600">In Progress</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Chapter 8-10: Data Handling</span>
                  <span className="text-gray-500">Not Started</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>English</CardTitle>
              <CardDescription>Chapter completion and assessment status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Unit 1-2: Prose and Poetry</span>
                  <span className="text-green-600">Completed</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Unit 3-4: Grammar</span>
                  <span className="text-green-600">Completed</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Unit 5-6: Creative Writing</span>
                  <span className="text-amber-600">In Progress</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Unit 7-8: Comprehension</span>
                  <span className="text-gray-500">Not Started</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </TeacherPageContainer>
  );
};

export default TeacherClass6;
