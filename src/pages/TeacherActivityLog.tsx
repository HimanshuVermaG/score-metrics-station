
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, Filter, Search, Clock, Users, FileText, CheckCircle, 
  BookOpen, XCircle, BarChart, User, Server, RefreshCw, Bell, Info 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock data for activity logs
const activityLogs = [
  {
    id: 1,
    type: 'content',
    action: 'created',
    title: 'Mathematics Quiz - Fractions',
    timestamp: '2023-10-26T09:30:00',
    details: 'Created a new quiz with 15 questions',
    icon: 'file'
  },
  {
    id: 2,
    type: 'student',
    action: 'graded',
    title: 'Rahul Singh - English Assignment',
    timestamp: '2023-10-26T10:15:00',
    details: 'Scored 85/100, provided feedback',
    icon: 'check'
  },
  {
    id: 3,
    type: 'class',
    action: 'modified',
    title: 'Class 7 - Updated Schedule',
    timestamp: '2023-10-25T14:30:00',
    details: 'Changed class schedule for next week',
    icon: 'users'
  },
  {
    id: 4,
    type: 'content',
    action: 'published',
    title: 'Science Test - Physics',
    timestamp: '2023-10-25T11:45:00',
    details: 'Published test for Class 8 students',
    icon: 'file'
  },
  {
    id: 5,
    type: 'student',
    action: 'added',
    title: 'New Student - Meera Patel',
    timestamp: '2023-10-24T13:20:00',
    details: 'Added to Class 6',
    icon: 'user'
  },
  {
    id: 6,
    type: 'content',
    action: 'modified',
    title: 'Hindi Assignment - Poetry',
    timestamp: '2023-10-24T10:10:00',
    details: 'Updated submission deadline',
    icon: 'file'
  },
  {
    id: 7,
    type: 'class',
    action: 'reviewed',
    title: 'Class 8 - Performance Review',
    timestamp: '2023-10-23T15:30:00',
    details: 'Reviewed monthly performance metrics',
    icon: 'chart'
  },
  {
    id: 8,
    type: 'content',
    action: 'deleted',
    title: 'Duplicate Math Practice Set',
    timestamp: '2023-10-23T09:45:00',
    details: 'Removed duplicate content',
    icon: 'delete'
  },
  {
    id: 9,
    type: 'student',
    action: 'contacted',
    title: 'Parent Conference - Amit Kumar',
    timestamp: '2023-10-22T16:00:00',
    details: 'Discussed progress and areas for improvement',
    icon: 'mail'
  },
  {
    id: 10,
    type: 'content',
    action: 'graded',
    title: 'Social Studies Test - History',
    timestamp: '2023-10-22T11:30:00',
    details: 'Graded 24 student submissions',
    icon: 'check'
  },
  {
    id: 11,
    type: 'class',
    action: 'created',
    title: 'New Study Group - Advanced Math',
    timestamp: '2023-10-21T14:15:00',
    details: 'Created special study group for selected students',
    icon: 'users'
  },
  {
    id: 12,
    type: 'student',
    action: 'feedback',
    title: 'Performance Feedback - Sneha Joshi',
    timestamp: '2023-10-21T10:00:00',
    details: 'Provided detailed feedback on recent assignments',
    icon: 'message'
  }
];

// Mock data for system notifications
const systemNotifications = [
  {
    id: 101,
    type: 'system',
    title: 'System Maintenance',
    message: 'The system will be down for maintenance on Sunday, October 29th from 2:00 AM to 4:00 AM.',
    timestamp: '2023-10-26T08:00:00',
    priority: 'high',
    read: false
  },
  {
    id: 102,
    type: 'update',
    title: 'New Features Available',
    message: 'We\'ve added new features to the grading system. Check the help section for details.',
    timestamp: '2023-10-25T12:30:00',
    priority: 'medium',
    read: true
  },
  {
    id: 103,
    type: 'deadline',
    title: 'Upcoming Report Deadline',
    message: 'Quarterly reports are due by October 31st. Please complete all student evaluations by that date.',
    timestamp: '2023-10-24T09:15:00',
    priority: 'high',
    read: false
  },
  {
    id: 104,
    type: 'system',
    title: 'Backup Completed',
    message: 'All your data has been successfully backed up.',
    timestamp: '2023-10-23T14:45:00',
    priority: 'low',
    read: true
  },
  {
    id: 105,
    type: 'reminder',
    title: 'Parent-Teacher Conference',
    message: 'Remember to prepare for the parent-teacher conferences scheduled for next week.',
    timestamp: '2023-10-22T10:30:00',
    priority: 'medium',
    read: false
  }
];

const TeacherActivityLog = () => {
  const [tab, setTab] = useState('activity');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter activity logs
  const filteredActivityLogs = activityLogs.filter(log => {
    const typeMatch = activityTypeFilter === 'all' || log.type === activityTypeFilter;
    
    // Date filtering
    let dateMatch = true;
    const logDate = new Date(log.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateFilter === 'today') {
      dateMatch = logDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'yesterday') {
      dateMatch = logDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateMatch = logDate >= weekAgo;
    }
    
    const searchMatch = !searchQuery || 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    return typeMatch && dateMatch && searchMatch;
  });
  
  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get icon for activity type
  const getActivityIcon = (icon) => {
    switch(icon) {
      case 'file':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'check':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'users':
        return <Users className="h-5 w-5 text-indigo-600" />;
      case 'chart':
        return <BarChart className="h-5 w-5 text-purple-600" />;
      case 'delete':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'user':
        return <User className="h-5 w-5 text-amber-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-600" />;
    }
  };
  
  // Get priority badge for notifications
  const getPriorityBadge = (priority, read) => {
    if (read) return null;
    
    switch(priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <TeacherPageContainer>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Activity Log</h1>
          <p className="text-gray-500">Track your activities and system notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="text-white bg-red-600 text-sm py-1.5">
            <span className="font-bold mr-1">{systemNotifications.filter(n => !n.read).length}</span> Unread Notifications
          </Badge>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Export Log
          </Button>
        </div>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="notifications">System Notifications</TabsTrigger>
        </TabsList>
        
        {tab === 'activity' && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="w-full sm:w-1/4">
              <Select value={activityTypeFilter} onValueChange={setActivityTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="class">Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/4">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <TabsContent value="activity">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Record of your recent activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredActivityLogs.map(log => (
                  <div key={log.id} className="flex items-start gap-4 pb-6 border-b last:border-0">
                    <div className="p-2 rounded-full bg-gray-100 flex-shrink-0">
                      {getActivityIcon(log.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                        <h4 className="font-medium text-gray-900">{log.title}</h4>
                        <span className="text-sm text-gray-500">{formatDateTime(log.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{log.details}</p>
                      <div>
                        <Badge className={`
                          ${log.type === 'content' ? 'bg-blue-100 text-blue-800' : ''}
                          ${log.type === 'student' ? 'bg-amber-100 text-amber-800' : ''}
                          ${log.type === 'class' ? 'bg-indigo-100 text-indigo-800' : ''}
                        `}>
                          {log.type}
                        </Badge>
                        <Badge className="ml-2 bg-gray-100 text-gray-800">{log.action}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredActivityLogs.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No activity logs found</h3>
                    <p className="text-gray-500">Try changing your filters to see more activity</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredActivityLogs.length} of {activityLogs.length} activities
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>Important alerts and updates from the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {systemNotifications.map(notification => (
                  <div key={notification.id} className={`flex items-start gap-4 pb-6 border-b last:border-0 ${!notification.read ? 'bg-blue-50 p-4 rounded-md' : ''}`}>
                    <div className={`p-2 rounded-full ${
                      notification.type === 'system' ? 'bg-blue-100' :
                      notification.type === 'update' ? 'bg-green-100' :
                      notification.type === 'deadline' ? 'bg-red-100' :
                      notification.type === 'reminder' ? 'bg-amber-100' : 'bg-gray-100'
                    }`}>
                      {notification.type === 'system' ? <Server className="h-5 w-5 text-blue-600" /> :
                       notification.type === 'update' ? <RefreshCw className="h-5 w-5 text-green-600" /> :
                       notification.type === 'deadline' ? <Clock className="h-5 w-5 text-red-600" /> :
                       notification.type === 'reminder' ? <Bell className="h-5 w-5 text-amber-600" /> :
                       <Info className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          {getPriorityBadge(notification.priority, notification.read)}
                        </div>
                        <span className="text-sm text-gray-500">{formatDateTime(notification.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex justify-end gap-2">
                        {!notification.read && (
                          <Button size="sm" variant="outline">Mark as Read</Button>
                        )}
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                {systemNotifications.filter(n => !n.read).length} unread notifications
              </p>
              <Button variant="outline">
                Mark All as Read
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </TeacherPageContainer>
  );
};

export default TeacherActivityLog;
