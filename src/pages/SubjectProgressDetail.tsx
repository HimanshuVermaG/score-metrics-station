
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, ChevronRight, Clock, Target, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const SubjectProgressDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  
  // Mock data for the subject
  const subjectName = subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : '';
  
  const performanceData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 70 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 80 },
    { month: 'Jun', score: 85 },
  ];
  
  const topicScores = [
    { topic: 'Algebra', score: 85, average: 72 },
    { topic: 'Geometry', score: 70, average: 68 },
    { topic: 'Statistics', score: 90, average: 75 },
    { topic: 'Trigonometry', score: 75, average: 70 },
    { topic: 'Calculus', score: 65, average: 60 },
  ];
  
  const recentTests = [
    { id: 1, title: 'Algebra Quiz', date: 'Jun 15, 2023', score: 85 },
    { id: 2, title: 'Geometry Test', date: 'May 28, 2023', score: 70 },
    { id: 3, title: 'Trigonometry Practice', date: 'May 10, 2023', score: 75 },
  ];
  
  const recommendations = [
    { id: 1, title: 'Practice Geometry Basics', link: '/practice/math/geometry' },
    { id: 2, title: 'Advanced Algebra Quiz', link: '/quizzes/start/1' },
    { id: 3, title: 'Statistics Revision Sheet', link: '/resources/math/statistics' },
  ];

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/report">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{subjectName} Progress</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-green-100">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Score</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
            <Progress value={85} className="h-2 mb-2" />
            <p className="text-xs text-gray-500 text-right">Target: 90%</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-100">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Improvement</p>
                <p className="text-2xl font-bold">+20%</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">From last 3 months</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-purple-100">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Time Spent</p>
                <p className="text-2xl font-bold">24h 30m</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Total study time this month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="performance" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="plan">Study Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>Topic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Your Score" fill="#8B5CF6" />
                    <Bar dataKey="average" name="Class Average" fill="#E9D5FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Strengths & Weaknesses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-green-600 mb-2">Strengths</h4>
                    <ul className="space-y-2">
                      <li className="text-sm">• Statistics (90%)</li>
                      <li className="text-sm">• Algebra (85%)</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-red-600 mb-2">Needs Improvement</h4>
                    <ul className="space-y-2">
                      <li className="text-sm">• Calculus (65%)</li>
                      <li className="text-sm">• Geometry (70%)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tests">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <Link 
                    key={test.id} 
                    to={`/tests/review/${test.id}`}
                    className="block"
                  >
                    <div className="flex justify-between items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="font-medium">{test.title}</div>
                        <div className="text-sm text-gray-500">{test.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          test.score >= 80 ? 'bg-green-100 text-green-800' : 
                          test.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {test.score}%
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6">
                <Button className="w-full" variant="outline">View All Tests</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Study Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((item) => (
                  <Link 
                    key={item.id} 
                    to={item.link}
                    className="block"
                  >
                    <div className="flex justify-between items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-100">
                          <BookOpen className="h-4 w-4 text-brand-purple" />
                        </div>
                        <div className="font-medium">{item.title}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6">
                <Button className="w-full bg-brand-purple hover:bg-purple-700">
                  Create Custom Study Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SubjectProgressDetail;
