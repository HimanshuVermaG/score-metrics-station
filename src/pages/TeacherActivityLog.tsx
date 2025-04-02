
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, Clock, MoreHorizontal, User, FileText, Search, ArrowUpDown, Filter, Download, Trash2, BookOpen, Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

// Mock data for activity logs
const activityLogs = [
  {
    id: 1,
    action: "Created new test",
    resource: "Mathematics Quiz - Class 6",
    timestamp: "2023-10-28T09:30:00",
    user: "You",
    type: "content",
    details: "Created a new quiz with 20 questions for Class 6 Mathematics"
  },
  {
    id: 2,
    action: "Modified assignment",
    resource: "Science Lab Report - Class 8",
    timestamp: "2023-10-28T10:15:00",
    user: "You",
    type: "content",
    details: "Extended deadline by 2 days and added additional instructions"
  },
  {
    id: 3,
    action: "Graded submissions",
    resource: "English Essay - Class 7",
    timestamp: "2023-10-27T14:20:00",
    user: "You",
    type: "assessment",
    details: "Graded 15 student submissions with feedback"
  },
  {
    id: 4,
    action: "Added comment",
    resource: "Priya Sharma's Profile",
    timestamp: "2023-10-27T11:45:00",
    user: "You",
    type: "student",
    details: "Added a comment regarding class participation and recent improvement"
  },
  {
    id: 5,
    action: "Scheduled event",
    resource: "Parent-Teacher Meeting",
    timestamp: "2023-10-26T16:30:00",
    user: "You",
    type: "event",
    details: "Scheduled a meeting with Rahul Singh's parents for October 30"
  },
  {
    id: 6,
    action: "Logged attendance",
    resource: "Class 6 - Mathematics",
    timestamp: "2023-10-26T09:00:00",
    user: "You",
    type: "class",
    details: "Marked attendance for 28 students, 2 absent"
  },
  {
    id: 7,
    action: "Published results",
    resource: "Quarterly Test - All Classes",
    timestamp: "2023-10-25T15:10:00",
    user: "You",
    type: "assessment",
    details: "Published results for 90 students across 3 classes"
  },
  {
    id: 8,
    action: "Created assignment",
    resource: "Hindi Literature Review - Class 6",
    timestamp: "2023-10-25T11:20:00",
    user: "You",
    type: "content",
    details: "Created a new assignment due on November 5"
  },
  {
    id: 9,
    action: "Modified classroom settings",
    resource: "Class 7 - Digital Learning",
    timestamp: "2023-10-24T13:40:00",
    user: "You",
    type: "settings",
    details: "Updated resource access permissions and enabled discussion forum"
  },
  {
    id: 10,
    action: "Reviewed submission",
    resource: "Aarav Patel's Science Project",
    timestamp: "2023-10-24T10:30:00",
    user: "You",
    type: "assessment",
    details: "Provided detailed feedback on the submitted project"
  },
  {
    id: 11,
    action: "Added teaching resource",
    resource: "Interactive Geometry Diagrams",
    timestamp: "2023-10-23T15:50:00",
    user: "You",
    type: "content",
    details: "Uploaded 12 interactive diagrams for Class 8 Geometry lessons"
  },
  {
    id: 12,
    action: "Sent notification",
    resource: "Class 6 - Reminder",
    timestamp: "2023-10-23T09:15:00",
    user: "You",
    type: "communication",
    details: "Sent a reminder about upcoming science project deadline"
  }
];

const TeacherActivityLog = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Filter logs based on current filter and search query
  const filteredLogs = activityLogs.filter(log => {
    const matchesFilter = filter === 'all' || log.type === filter;
    const matchesSearch = searchQuery === '' || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  // Paginate logs
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Get log type badge color
  const getLogTypeBadge = (type) => {
    switch(type) {
      case 'content':
        return <Badge className="bg-blue-500 text-white">Content</Badge>;
      case 'assessment':
        return <Badge className="bg-purple-500 text-white">Assessment</Badge>;
      case 'student':
        return <Badge className="bg-emerald-500 text-white">Student</Badge>;
      case 'event':
        return <Badge className="bg-pink-500 text-white">Event</Badge>;
      case 'class':
        return <Badge className="bg-amber-500 text-white">Class</Badge>;
      case 'settings':
        return <Badge className="bg-gray-500 text-white">Settings</Badge>;
      case 'communication':
        return <Badge className="bg-indigo-500 text-white">Communication</Badge>;
      default:
        return <Badge className="bg-gray-400">Other</Badge>;
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'MMM d, yyyy • h:mm a');
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <TeacherPageContainer>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Activity Log</h1>
          <p className="text-gray-500">Track your recent actions and activities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Log
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Advanced Filter
          </Button>
        </div>
      </div>
      
      <Card className="bg-white shadow-sm border-gray-100">
        <CardHeader className="pb-2 border-b">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle>Recent Activities</CardTitle>
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setFilter}>
              <TabsList className="grid grid-cols-3 sm:grid-cols-7 w-full sm:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="event">Event</TabsTrigger>
                <TabsTrigger value="class">Class</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search activities..."
                className="pl-10 pr-4 py-2 rounded-md border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                  <SelectItem value="quarter">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[180px]">Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead className="w-[150px]">
                    <div className="flex items-center">
                      Date & Time
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead className="w-[80px]">User</TableHead>
                  <TableHead className="w-[60px] text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.length > 0 ? (
                  paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="text-gray-500">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-400" />
                          {formatTimestamp(log.timestamp)}
                        </div>
                      </TableCell>
                      <TableCell>{getLogTypeBadge(log.type)}</TableCell>
                      <TableCell className="text-center">
                        {log.user === "You" ? (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700">You</Badge>
                        ) : (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {log.user}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Open Resource
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bell className="mr-2 h-4 w-4" />
                              Set Alert
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Record
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FileText className="h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-800">No activities found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {Math.min(filteredLogs.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filteredLogs.length, currentPage * itemsPerPage)} of {filteredLogs.length} activities
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  className={page === currentPage ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </TeacherPageContainer>
  );
};

export default TeacherActivityLog;
