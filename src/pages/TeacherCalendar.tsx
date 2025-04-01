
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, ChevronLeft, ChevronRight, Users, BookOpen, Clock, 
  Calendar as CalendarIcon, MapPin, Tag, ListChecks, FileText
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for events
const calendarEvents = [
  {
    id: 1,
    title: 'Mathematics Quiz - Class 6',
    date: '2023-10-28',
    startTime: '09:30',
    endTime: '10:30',
    type: 'quiz',
    class: 'Class 6',
    location: 'Room 101'
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting - Rahul Singh',
    date: '2023-10-28',
    startTime: '14:00',
    endTime: '14:30',
    type: 'meeting',
    class: 'Class 6',
    location: 'Conference Room'
  },
  {
    id: 3,
    title: 'Science Lab - Class 8',
    date: '2023-10-29',
    startTime: '11:00',
    endTime: '12:30',
    type: 'class',
    class: 'Class 8',
    location: 'Science Lab'
  },
  {
    id: 4,
    title: 'English Test - Class 7',
    date: '2023-10-30',
    startTime: '10:00',
    endTime: '11:30',
    type: 'test',
    class: 'Class 7',
    location: 'Room 102'
  },
  {
    id: 5,
    title: 'Staff Meeting',
    date: '2023-10-30',
    startTime: '14:00',
    endTime: '15:00',
    type: 'meeting',
    location: 'Conference Room'
  },
  {
    id: 6,
    title: 'Hindi Assignment Due - Class 6',
    date: '2023-10-31',
    type: 'deadline',
    class: 'Class 6'
  },
  {
    id: 7,
    title: 'Social Studies Presentation - Class 8',
    date: '2023-11-01',
    startTime: '09:00',
    endTime: '10:30',
    type: 'presentation',
    class: 'Class 8',
    location: 'Room 105'
  },
  {
    id: 8,
    title: 'Mathematics Remedial Class',
    date: '2023-11-01',
    startTime: '15:00',
    endTime: '16:00',
    type: 'class',
    class: 'Multiple Classes',
    location: 'Room 101'
  },
  {
    id: 9,
    title: 'Science Project Deadline - Class 7',
    date: '2023-11-02',
    type: 'deadline',
    class: 'Class 7'
  },
  {
    id: 10,
    title: 'Annual School Function Rehearsal',
    date: '2023-11-03',
    startTime: '13:00',
    endTime: '16:00',
    type: 'event',
    class: 'All Classes',
    location: 'Auditorium'
  }
];

// Mock data for upcoming deadlines
const upcomingDeadlines = [
  {
    id: 101,
    title: 'Mathematics Assignment Grading',
    deadline: '2023-10-27',
    type: 'grading',
    class: 'Class 6',
    status: 'urgent',
    submissions: 28,
    completed: 12
  },
  {
    id: 102,
    title: 'English Test Preparation',
    deadline: '2023-10-29',
    type: 'preparation',
    class: 'Class 7',
    status: 'normal',
    items: 20,
    completed: 15
  },
  {
    id: 103,
    title: 'Science Lab Reports Review',
    deadline: '2023-10-31',
    type: 'grading',
    class: 'Class 8',
    status: 'normal',
    submissions: 24,
    completed: 0
  },
  {
    id: 104,
    title: 'Quarterly Student Evaluations',
    deadline: '2023-11-05',
    type: 'report',
    class: 'All Classes',
    status: 'upcoming',
    students: 90,
    completed: 25
  },
  {
    id: 105,
    title: 'Parent-Teacher Conference Materials',
    deadline: '2023-11-10',
    type: 'preparation',
    status: 'upcoming',
    items: 10,
    completed: 2
  }
];

const TeacherCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState('month');
  const [classFilter, setClassFilter] = useState('all');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Helper function to get event color based on type
  const getEventColor = (type) => {
    switch(type) {
      case 'quiz':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'test':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'class':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'meeting':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'deadline':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'presentation':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'event':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Get events for the selected date
  const getEventsForSelectedDate = () => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    let filteredEvents = calendarEvents.filter(event => event.date === dateStr);
    
    if (classFilter !== 'all') {
      filteredEvents = filteredEvents.filter(event => {
        if (!event.class) return false;
        return event.class === `Class ${classFilter}` || event.class === 'All Classes' || event.class === 'Multiple Classes';
      });
    }
    
    if (eventTypeFilter !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === eventTypeFilter);
    }
    
    return filteredEvents;
  };
  
  // Get deadline status class
  const getDeadlineStatusClass = (status) => {
    switch(status) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-amber-100 text-amber-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get completion percentage
  const getCompletionPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };
  
  // Calculate days remaining
  const getDaysRemaining = (deadlineDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadline = new Date(deadlineDate);
    deadline.setHours(0, 0, 0, 0);
    
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    return `${diffDays} days`;
  };
  
  const selectedDateEvents = getEventsForSelectedDate();

  return (
    <TeacherPageContainer>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Teacher Calendar</h1>
          <p className="text-gray-500">Manage your schedule, events, and deadlines</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Export Calendar
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar and Events */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-l-md rounded-r-none flex items-center justify-center">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-l-none rounded-r-md flex items-center justify-center">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                    Today
                  </Button>
                  <Select value={view} onValueChange={setView}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="6">Class 6</SelectItem>
                  <SelectItem value="7">Class 7</SelectItem>
                  <SelectItem value="8">Class 8</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="event">School Event</SelectItem>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                {date ? (
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    {formatDate(date.toISOString())}
                    {selectedDateEvents.length > 0 && (
                      <Badge className="ml-2 bg-indigo-100 text-indigo-800">
                        {selectedDateEvents.length} events
                      </Badge>
                    )}
                  </div>
                ) : (
                  <span>Select a date to view events</span>
                )}
              </CardTitle>
              <CardDescription>
                Schedule for the selected date
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className={`border rounded-lg p-4 ${getEventColor(event.type)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {event.class && (
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{event.class}</span>
                          </div>
                        )}
                        
                        {event.startTime && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                        )}
                        
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800">No events scheduled</h3>
                  <p className="text-gray-500 mb-4">There are no events scheduled for this date</p>
                  <Button>
                    Add New Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Tasks and deadlines requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="border rounded-lg overflow-hidden">
                    <div className={`px-4 py-2 ${getDeadlineStatusClass(deadline.status)}`}>
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{deadline.title}</h3>
                        <Badge variant="outline">
                          {getDaysRemaining(deadline.deadline)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{formatDate(deadline.deadline)}</span>
                        </div>
                        
                        {deadline.class && (
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{deadline.class}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{deadline.type}</span>
                        </div>
                        
                        {deadline.submissions && (
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{deadline.submissions} submissions</span>
                          </div>
                        )}
                        
                        {deadline.students && (
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{deadline.students} students</span>
                          </div>
                        )}
                        
                        {deadline.items && (
                          <div className="flex items-center">
                            <ListChecks className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{deadline.items} items</span>
                          </div>
                        )}
                      </div>
                      
                      {deadline.submissions || deadline.students || deadline.items ? (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>
                              {deadline.completed}/
                              {deadline.submissions || deadline.students || deadline.items}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ 
                                width: `${getCompletionPercentage(
                                  deadline.completed, 
                                  deadline.submissions || deadline.students || deadline.items
                                )}%` 
                              }}
                            />
                          </div>
                        </div>
                      ) : null}
                      
                      <div className="flex justify-end">
                        <Button size="sm">Start Working</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Add</CardTitle>
              <CardDescription>Quickly add events to your calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Type</label>
                  <Select defaultValue="class">
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Event Title</label>
                  <Input placeholder="Enter event title" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Date & Time</label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Select date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" />
                      </PopoverContent>
                    </Popover>
                    
                    <Select defaultValue="09:00">
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Class</label>
                  <Select defaultValue="6">
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">Class 6</SelectItem>
                      <SelectItem value="7">Class 7</SelectItem>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="all">All Classes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">Add to Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherPageContainer>
  );
};

export default TeacherCalendar;
