
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Clock, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for pending reviews
const pendingReviews = [
  {
    id: 1,
    studentName: 'Rahul Singh',
    class: 'Class 6',
    submissionType: 'Quiz',
    title: 'Mathematics - Fractions',
    submittedOn: '2023-10-25T14:30:00',
    dueBy: '2023-10-28',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 2,
    studentName: 'Priya Sharma',
    class: 'Class 7',
    submissionType: 'Assignment',
    title: 'English - Essay Writing',
    submittedOn: '2023-10-24T10:15:00',
    dueBy: '2023-10-27',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 3,
    studentName: 'Amit Kumar',
    class: 'Class 8',
    submissionType: 'Test',
    title: 'Science - Physics Concepts',
    submittedOn: '2023-10-23T16:45:00',
    dueBy: '2023-10-26',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 4,
    studentName: 'Neha Gupta',
    class: 'Class 6',
    submissionType: 'Project',
    title: 'Social Studies - Historical Timeline',
    submittedOn: '2023-10-22T11:30:00',
    dueBy: '2023-10-29',
    status: 'pending',
    priority: 'low'
  },
  {
    id: 5,
    studentName: 'Vikram Patel',
    class: 'Class 7',
    submissionType: 'Quiz',
    title: 'Hindi - Grammar',
    submittedOn: '2023-10-26T09:20:00',
    dueBy: '2023-10-29',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 6,
    studentName: 'Anjali Verma',
    class: 'Class 8',
    submissionType: 'Assignment',
    title: 'Mathematics - Algebra',
    submittedOn: '2023-10-25T15:10:00',
    dueBy: '2023-10-28',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 7,
    studentName: 'Rajesh Kumar',
    class: 'Class 6',
    submissionType: 'Test',
    title: 'English - Reading Comprehension',
    submittedOn: '2023-10-24T13:45:00',
    dueBy: '2023-10-27',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 8,
    studentName: 'Sneha Joshi',
    class: 'Class 7',
    submissionType: 'Project',
    title: 'Science - Ecosystem Model',
    submittedOn: '2023-10-23T10:30:00',
    dueBy: '2023-10-30',
    status: 'pending',
    priority: 'low'
  },
];

// Mock data for recently graded
const recentlyGraded = [
  {
    id: 101,
    studentName: 'Arjun Singh',
    class: 'Class 8',
    submissionType: 'Quiz',
    title: 'Mathematics - Geometry',
    submittedOn: '2023-10-20T11:30:00',
    gradedOn: '2023-10-22T14:15:00',
    score: 85,
    feedback: 'Good understanding of concepts, needs to work on application'
  },
  {
    id: 102,
    studentName: 'Meera Patel',
    class: 'Class 7',
    submissionType: 'Assignment',
    title: 'Science - Chemistry Experiment',
    submittedOn: '2023-10-19T09:45:00',
    gradedOn: '2023-10-21T16:30:00',
    score: 92,
    feedback: 'Excellent work, shows thorough understanding'
  },
  {
    id: 103,
    studentName: 'Karan Malhotra',
    class: 'Class 6',
    submissionType: 'Test',
    title: 'Social Studies - Geography',
    submittedOn: '2023-10-18T14:20:00',
    gradedOn: '2023-10-20T10:45:00',
    score: 78,
    feedback: 'Good effort, needs more attention to detail'
  },
  {
    id: 104,
    studentName: 'Divya Sharma',
    class: 'Class 8',
    submissionType: 'Project',
    title: 'Hindi - Poetry Analysis',
    submittedOn: '2023-10-17T13:15:00',
    gradedOn: '2023-10-19T15:20:00',
    score: 88,
    feedback: 'Creative approach, good analysis'
  },
  {
    id: 105,
    studentName: 'Rohit Verma',
    class: 'Class 7',
    submissionType: 'Quiz',
    title: 'English - Vocabulary',
    submittedOn: '2023-10-16T10:30:00',
    gradedOn: '2023-10-18T12:45:00',
    score: 95,
    feedback: 'Outstanding vocabulary knowledge'
  }
];

const TeacherReviews = () => {
  const [tab, setTab] = useState('pending');
  const [classFilter, setClassFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter pending reviews
  const filteredPendingReviews = pendingReviews.filter(review => {
    const classMatch = classFilter === 'all' || review.class === `Class ${classFilter}`;
    const typeMatch = typeFilter === 'all' || review.submissionType.toLowerCase() === typeFilter.toLowerCase();
    const priorityMatch = priorityFilter === 'all' || review.priority === priorityFilter;
    const searchMatch = !searchQuery || 
      review.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return classMatch && typeMatch && priorityMatch && searchMatch;
  });
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };
  
  // Get score class
  const getScoreClass = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <TeacherPageContainer>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Review Submissions</h1>
          <p className="text-gray-500">Grade and provide feedback on student submissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="text-white bg-indigo-600 hover:bg-indigo-700 text-sm py-1.5">
            <span className="font-bold mr-1">{pendingReviews.length}</span> Pending Reviews
          </Badge>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Grade Next Submission
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Pending</p>
                <p className="text-2xl font-bold text-indigo-700">{pendingReviews.length}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Due Today</p>
                <p className="text-2xl font-bold text-red-700">
                  {pendingReviews.filter(r => r.dueBy === '2023-10-26').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed This Week</p>
                <p className="text-2xl font-bold text-green-700">{recentlyGraded.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="completed">Recently Graded</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {tab === 'pending' && (
            <>
              <div className="w-full sm:w-1/5">
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="6">Class 6</SelectItem>
                    <SelectItem value="7">Class 7</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/5">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/5">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>Submissions that need to be graded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Student</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Class</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Submission</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Submitted</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Due By</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-500">Priority</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredPendingReviews.map(review => (
                      <tr key={review.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{review.studentName}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{review.class}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{review.title}</div>
                          <div className="text-xs text-gray-500">{review.submissionType}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          <div>{formatDate(review.submittedOn)}</div>
                          <div className="text-xs">{formatTime(review.submittedOn)}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{review.dueBy}</td>
                        <td className="px-4 py-3 text-center">{getPriorityBadge(review.priority)}</td>
                        <td className="px-4 py-3 text-right">
                          <Button asChild>
                            <Link to={`/teacher/reviews/${review.id}`}>
                              Grade
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
              <p className="text-sm text-gray-500">
                Showing {filteredPendingReviews.length} of {pendingReviews.length} pending reviews
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recently Graded</CardTitle>
              <CardDescription>Submissions that have been graded recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Student</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Class</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Submission</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Graded On</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-500">Score</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Feedback</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentlyGraded.map(review => (
                      <tr key={review.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{review.studentName}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{review.class}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{review.title}</div>
                          <div className="text-xs text-gray-500">{review.submissionType}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          <div>{formatDate(review.gradedOn)}</div>
                          <div className="text-xs">{formatTime(review.gradedOn)}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={getScoreClass(review.score)}>{review.score}%</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">
                          {review.feedback}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="outline" asChild>
                            <Link to={`/teacher/reviews/${review.id}`}>
                              View Details
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
              <p className="text-sm text-gray-500">
                Showing {recentlyGraded.length} recently graded submissions
              </p>
              <Button variant="outline">
                View All History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </TeacherPageContainer>
  );
};

export default TeacherReviews;
