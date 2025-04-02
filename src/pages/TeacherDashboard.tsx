
import React from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import TeacherStats from '@/components/dashboard/TeacherStats';
import TeacherActionCards from '@/components/dashboard/TeacherActionCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Plus, BookOpen, ArrowUp, ArrowDown, Minus, BarChart2, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';

// Class-wise subject performance data
const classSubjectPerformance = [
  {
    class: 'Class 6',
    subjects: [
      { name: 'Mathematics', score: 76 },
      { name: 'English', score: 82 },
      { name: 'Hindi', score: 85 },
      { name: 'Science', score: 79 },
      { name: 'Social Studies', score: 74 },
    ]
  },
  {
    class: 'Class 7',
    subjects: [
      { name: 'Mathematics', score: 82 },
      { name: 'English', score: 88 },
      { name: 'Hindi', score: 80 },
      { name: 'Science', score: 85 },
      { name: 'Social Studies', score: 78 },
    ]
  },
  {
    class: 'Class 8',
    subjects: [
      { name: 'Mathematics', score: 72 },
      { name: 'English', score: 79 },
      { name: 'Hindi', score: 76 },
      { name: 'Science', score: 80 },
      { name: 'Social Studies', score: 70 },
    ]
  }
];

// Recent activities
const recentActivities = [
  { id: 1, type: 'Quiz', title: 'Algebra Quiz', class: 'Class 6', status: 'completed', date: '3 hours ago', participants: 32 },
  { id: 2, type: 'Test', title: 'Grammar Test', class: 'Class 7', status: 'active', date: '1 day ago', participants: 28 },
  { id: 3, type: 'Assignment', title: 'Science Project', class: 'Class 8', status: 'pending', date: '2 days ago', participants: 30 },
  { id: 4, type: 'Quiz', title: 'History Quiz', class: 'Class 6', status: 'scheduled', date: '2 days ago', participants: 32 },
];

// Calculation for charts
const chartData = classSubjectPerformance.map(classData => {
  const dataPoint = { class: classData.class };
  classData.subjects.forEach(subject => {
    dataPoint[subject.name] = subject.score;
  });
  return dataPoint;
});

const TeacherDashboard = () => {
  const { user } = useAuth();
  const teacherName = user?.name || 'Teacher';
  
  // Helper function to get trend icon
  const getTrendIcon = (value: number) => {
    if (value > 0) {
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    } else if (value < 0) {
      return <ArrowDown className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Helper function to get subject score color
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <TeacherPageContainer>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome back, {teacherName}</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center" asChild>
            <Link to="/teacher/activity-log">
              <Activity className="mr-2 h-4 w-4" />
              Activity Log
            </Link>
          </Button>
          <Button variant="outline" className="flex items-center" asChild>
            <Link to="/teacher/students">
              <Users className="mr-2 h-4 w-4" />
              Manage Students
            </Link>
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center" asChild>
            <Link to="/teacher/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Content
            </Link>
          </Button>
        </div>
      </div>

      <TeacherStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-indigo-600" />
                Class-wise Subject Performance
              </CardTitle>
              <Link to="/teacher/reports" className="text-sm text-indigo-600 hover:underline">
                View Detailed Reports
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Mathematics" fill="#8884d8" />
                  <Bar dataKey="English" fill="#82ca9d" />
                  <Bar dataKey="Hindi" fill="#ffc658" />
                  <Bar dataKey="Science" fill="#ff8042" />
                  <Bar dataKey="Social Studies" fill="#8dd1e1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest activities on your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className={`p-2 rounded-full 
                    ${activity.type === 'Quiz' ? 'bg-indigo-100' : 
                     activity.type === 'Test' ? 'bg-purple-100' : 'bg-green-100'}`}>
                    <BookOpen className={`h-4 w-4 
                      ${activity.type === 'Quiz' ? 'text-indigo-700' : 
                       activity.type === 'Test' ? 'text-purple-700' : 'text-green-700'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.class} • {activity.participants} participants</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium px-2 py-1 rounded-full 
                      ${activity.status === 'completed' ? 'bg-green-100 text-green-700' : 
                       activity.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                       activity.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                       'bg-gray-100 text-gray-700'}`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <TeacherActionCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {classSubjectPerformance.map((classData, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{classData.class}</CardTitle>
              <CardDescription>Subject-wise performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classData.subjects.map((subject, subIndex) => (
                  <div key={subIndex} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{subject.name}</span>
                      <span className={getScoreColor(subject.score)}>{subject.score}%</span>
                    </div>
                    <Progress 
                      value={subject.score} 
                      className={`h-2 ${
                        subject.score >= 85 ? 'bg-green-100' : 
                        subject.score >= 70 ? 'bg-amber-100' : 
                        'bg-red-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  asChild
                >
                  <Link to={`/teacher/class/${classData.class.split(' ')[1]}`}>
                    View Class Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TeacherPageContainer>
  );
};

export default TeacherDashboard;
