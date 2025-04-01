
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
  CardFooter,
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
import { Link } from 'react-router-dom';

// Mock data for students with detailed info
const studentsData = [
  { 
    id: 1,
    name: "Aakash Singh",
    rollNo: "C6-001",
    attendance: 95,
    completed: 85,
    avatar: "AS",
    performance: 82,
    subjects: [
      { name: "Mathematics", score: 78, progress: 80 },
      { name: "Science", score: 85, progress: 85 },
      { name: "English", score: 90, progress: 90 },
      { name: "Hindi", score: 75, progress: 80 },
      { name: "Social Studies", score: 82, progress: 75 }
    ],
    recentActivities: [
      { type: "quiz", title: "Mathematics Quiz", date: "Oct 24, 2023", score: 80 },
      { type: "assignment", title: "Science Project", date: "Oct 21, 2023", score: 85 },
      { type: "test", title: "English Grammar", date: "Oct 18, 2023", score: 90 }
    ],
    contact: {
      parentName: "Rajesh Singh",
      phone: "+91 98765 43210",
      email: "rajesh.singh@example.com",
      address: "123 Main Street, Delhi"
    },
    notes: "Excellent in English, needs support in Hindi. Participates actively in class discussions."
  },
  { 
    id: 2,
    name: "Nisha Sharma",
    rollNo: "C6-002",
    attendance: 92,
    completed: 78,
    avatar: "NS",
    performance: 75,
    subjects: [
      { name: "Mathematics", score: 70, progress: 75 },
      { name: "Science", score: 75, progress: 80 },
      { name: "English", score: 85, progress: 85 },
      { name: "Hindi", score: 80, progress: 85 },
      { name: "Social Studies", score: 65, progress: 70 }
    ],
    recentActivities: [
      { type: "assignment", title: "Hindi Essay", date: "Oct 25, 2023", score: 85 },
      { type: "quiz", title: "Science Quiz", date: "Oct 22, 2023", score: 70 },
      { type: "test", title: "Mathematics Test", date: "Oct 19, 2023", score: 65 }
    ],
    contact: {
      parentName: "Priya Sharma",
      phone: "+91 98765 43211",
      email: "priya.sharma@example.com",
      address: "456 Park Avenue, Mumbai"
    },
    notes: "Good in Hindi and English. Requires additional support in Mathematics and Science."
  },
  { 
    id: 3,
    name: "Rahul Patel",
    rollNo: "C6-003",
    attendance: 88,
    completed: 65,
    avatar: "RP",
    performance: 68,
    subjects: [
      { name: "Mathematics", score: 60, progress: 65 },
      { name: "Science", score: 75, progress: 70 },
      { name: "English", score: 65, progress: 60 },
      { name: "Hindi", score: 70, progress: 65 },
      { name: "Social Studies", score: 70, progress: 65 }
    ],
    recentActivities: [
      { type: "quiz", title: "Social Studies Quiz", date: "Oct 25, 2023", score: 70 },
      { type: "assignment", title: "English Writing", date: "Oct 20, 2023", score: 65 },
      { type: "test", title: "Science Test", date: "Oct 17, 2023", score: 75 }
    ],
    contact: {
      parentName: "Nitin Patel",
      phone: "+91 98765 43212",
      email: "nitin.patel@example.com",
      address: "789 Lake View, Ahmedabad"
    },
    notes: "Showing improvement in Science. Needs encouragement to participate more in class."
  },
  { 
    id: 4,
    name: "Maya Verma",
    rollNo: "C6-004",
    attendance: 97,
    completed: 90,
    avatar: "MV",
    performance: 92,
    subjects: [
      { name: "Mathematics", score: 95, progress: 95 },
      { name: "Science", score: 90, progress: 90 },
      { name: "English", score: 88, progress: 85 },
      { name: "Hindi", score: 90, progress: 95 },
      { name: "Social Studies", score: 97, progress: 90 }
    ],
    recentActivities: [
      { type: "test", title: "Mathematics Test", date: "Oct 26, 2023", score: 95 },
      { type: "quiz", title: "Hindi Quiz", date: "Oct 23, 2023", score: 90 },
      { type: "assignment", title: "Science Project", date: "Oct 20, 2023", score: 92 }
    ],
    contact: {
      parentName: "Sanjay Verma",
      phone: "+91 98765 43213",
      email: "sanjay.verma@example.com",
      address: "321 Green Hills, Bangalore"
    },
    notes: "Outstanding student. Shows exceptional abilities in all subjects, especially Mathematics."
  },
  { 
    id: 5,
    name: "Aryan Gupta",
    rollNo: "C6-005",
    attendance: 85,
    completed: 72,
    avatar: "AG",
    performance: 78,
    subjects: [
      { name: "Mathematics", score: 85, progress: 80 },
      { name: "Science", score: 80, progress: 75 },
      { name: "English", score: 70, progress: 65 },
      { name: "Hindi", score: 75, progress: 70 },
      { name: "Social Studies", score: 80, progress: 70 }
    ],
    recentActivities: [
      { type: "assignment", title: "Social Studies Project", date: "Oct 24, 2023", score: 80 },
      { type: "quiz", title: "Mathematics Quiz", date: "Oct 21, 2023", score: 85 },
      { type: "test", title: "Hindi Test", date: "Oct 18, 2023", score: 75 }
    ],
    contact: {
      parentName: "Vikram Gupta",
      phone: "+91 98765 43214",
      email: "vikram.gupta@example.com",
      address: "567 River Road, Kolkata"
    },
    notes: "Good in Mathematics and Social Studies. Needs to focus more on English."
  }
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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetailTab, setStudentDetailTab] = useState("overview");
  
  // Filter students based on search term
  const filteredStudents = studentsData.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // View student details
  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setStudentDetailTab("overview");
  };

  // Close student details
  const closeStudentDetails = () => {
    setSelectedStudent(null);
  };

  // Get color based on score
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

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
      
      {selectedStudent ? (
        <Card className="mb-6">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-medium text-lg">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <CardTitle>{selectedStudent.name}</CardTitle>
                  <CardDescription>Roll No: {selectedStudent.rollNo}</CardDescription>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={closeStudentDetails}>Close</Button>
          </CardHeader>
          <CardContent>
            <Tabs value={studentDetailTab} onValueChange={setStudentDetailTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-blue-700 font-medium mb-2">Attendance</div>
                    <div className="text-3xl font-bold text-blue-800 mb-2">{selectedStudent.attendance}%</div>
                    <Progress value={selectedStudent.attendance} className="h-2" />
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-green-700 font-medium mb-2">Completed Assignments</div>
                    <div className="text-3xl font-bold text-green-800 mb-2">{selectedStudent.completed}%</div>
                    <Progress value={selectedStudent.completed} className="h-2" />
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="text-amber-700 font-medium mb-2">Overall Performance</div>
                    <div className="text-3xl font-bold text-amber-800 mb-2">{selectedStudent.performance}%</div>
                    <Progress value={selectedStudent.performance} className="h-2" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedStudent.notes}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Subject Performance</h3>
                  <div className="space-y-4">
                    {selectedStudent.subjects.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{subject.name}</span>
                          <span className={getScoreColor(subject.score)}>{subject.score}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Performance Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Subject Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <table className="w-full text-sm">
                          <thead>
                            <tr>
                              <th className="text-left font-medium text-gray-500 pb-2">Subject</th>
                              <th className="text-center font-medium text-gray-500 pb-2">Score</th>
                              <th className="text-center font-medium text-gray-500 pb-2">Class Avg</th>
                              <th className="text-right font-medium text-gray-500 pb-2">Rank</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedStudent.subjects.map((subject, index) => (
                              <tr key={index}>
                                <td className="py-2">{subject.name}</td>
                                <td className={`text-center ${getScoreColor(subject.score)}`}>
                                  {subject.score}%
                                </td>
                                <td className="text-center text-gray-600">78%</td>
                                <td className="text-right">{Math.floor(Math.random() * 10) + 1}/24</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Strengths & Weaknesses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStudent.subjects
                              .filter(s => s.score >= 80)
                              .map((subject, index) => (
                                <Badge key={index} className="bg-green-100 text-green-800">
                                  {subject.name}
                                </Badge>
                              ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-600 mb-2">Areas for Improvement</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStudent.subjects
                              .filter(s => s.score < 75)
                              .map((subject, index) => (
                                <Badge key={index} className="bg-red-100 text-red-800">
                                  {subject.name}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Performance chart would be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Recent Activities</h3>
                  <div className="space-y-4">
                    {selectedStudent.recentActivities.map((activity, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{activity.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">
                                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                </Badge>
                                <span className="text-sm text-gray-500">{activity.date}</span>
                              </div>
                            </div>
                            <div className={`text-lg font-bold ${getScoreColor(activity.score)}`}>
                              {activity.score}%
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button>View All Activities</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Parent/Guardian Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-500">Parent Name</label>
                          <p className="font-medium">{selectedStudent.contact.parentName}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Phone Number</label>
                          <p className="font-medium">{selectedStudent.contact.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Email Address</label>
                          <p className="font-medium">{selectedStudent.contact.email}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Home Address</label>
                          <p className="font-medium">{selectedStudent.contact.address}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Parent
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Communication History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-2 border-blue-300 pl-4 py-2">
                          <h4 className="font-medium">Parent-Teacher Meeting</h4>
                          <p className="text-sm text-gray-500">October 15, 2023</p>
                          <p className="text-sm mt-1">Discussed progress in Mathematics and areas for improvement.</p>
                        </div>
                        <div className="border-l-2 border-blue-300 pl-4 py-2">
                          <h4 className="font-medium">Email Communication</h4>
                          <p className="text-sm text-gray-500">October 10, 2023</p>
                          <p className="text-sm mt-1">Sent update about upcoming Science project deadline.</p>
                        </div>
                        <div className="border-l-2 border-blue-300 pl-4 py-2">
                          <h4 className="font-medium">Phone Call</h4>
                          <p className="text-sm text-gray-500">September 28, 2023</p>
                          <p className="text-sm mt-1">Discussed attendance concerns and improvement plan.</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        View Full History
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              asChild
            >
              <Link to={`/teacher/students/${selectedStudent.id}`}>
                View Full Profile
              </Link>
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              asChild
            >
              <Link to={`/teacher/students/${selectedStudent.id}/report`}>
                Generate Report
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => viewStudentDetails(student)}
                      >
                        View Details
                      </Button>
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
      )}
    </TeacherPageContainer>
  );
};

export default TeacherClass6;
