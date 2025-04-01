
import React, { useState, useRef, useEffect } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { 
  Plus, ChevronLeft, ChevronRight, Users, BookOpen, Clock, 
  Calendar as CalendarIcon, MapPin, Tag, ListChecks, FileText,
  Search, MoreHorizontal, Repeat, Star, Bell, Trash2, Edit
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays, subDays, isSameDay, parseISO, addMonths, subMonths } from 'date-fns';

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
    location: 'Room 101',
    description: 'Quarterly mathematics assessment covering algebra and geometry.'
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting - Rahul Singh',
    date: '2023-10-28',
    startTime: '14:00',
    endTime: '14:30',
    type: 'meeting',
    class: 'Class 6',
    location: 'Conference Room',
    description: 'Discussion about academic progress and behavior.'
  },
  {
    id: 3,
    title: 'Science Lab - Class 8',
    date: '2023-10-29',
    startTime: '11:00',
    endTime: '12:30',
    type: 'class',
    class: 'Class 8',
    location: 'Science Lab',
    description: 'Practical demonstration of the principles of electricity.'
  },
  {
    id: 4,
    title: 'English Test - Class 7',
    date: '2023-10-30',
    startTime: '10:00',
    endTime: '11:30',
    type: 'test',
    class: 'Class 7',
    location: 'Room 102',
    description: 'Written examination on grammar, comprehension, and vocabulary.'
  },
  {
    id: 5,
    title: 'Staff Meeting',
    date: '2023-10-30',
    startTime: '14:00',
    endTime: '15:00',
    type: 'meeting',
    location: 'Conference Room',
    description: 'Monthly staff meeting to discuss academic plans and ongoing issues.'
  },
  {
    id: 6,
    title: 'Hindi Assignment Due - Class 6',
    date: '2023-10-31',
    type: 'deadline',
    class: 'Class 6',
    description: 'Submission deadline for the essay on Indian literature.'
  },
  {
    id: 7,
    title: 'Social Studies Presentation - Class 8',
    date: '2023-11-01',
    startTime: '09:00',
    endTime: '10:30',
    type: 'presentation',
    class: 'Class 8',
    location: 'Room 105',
    description: 'Student presentations on world history topics.'
  },
  {
    id: 8,
    title: 'Mathematics Remedial Class',
    date: '2023-11-01',
    startTime: '15:00',
    endTime: '16:00',
    type: 'class',
    class: 'Multiple Classes',
    location: 'Room 101',
    description: 'Extra help session for students struggling with mathematics concepts.'
  },
  {
    id: 9,
    title: 'Science Project Deadline - Class 7',
    date: '2023-11-02',
    type: 'deadline',
    class: 'Class 7',
    description: 'Final submission date for the term science projects.'
  },
  {
    id: 10,
    title: 'Annual School Function Rehearsal',
    date: '2023-11-03',
    startTime: '13:00',
    endTime: '16:00',
    type: 'event',
    class: 'All Classes',
    location: 'Auditorium',
    description: 'Practice session for the upcoming annual day performances.'
  },
  {
    id: 11,
    title: 'Mathematics Workshop',
    date: '2023-11-05',
    startTime: '10:00',
    endTime: '12:00',
    type: 'workshop',
    class: 'Teachers',
    location: 'Staff Room',
    description: 'Professional development workshop on new teaching methodologies.'
  },
  {
    id: 12,
    title: 'PTM - Class 7',
    date: '2023-11-06',
    startTime: '09:00',
    endTime: '13:00',
    type: 'meeting',
    class: 'Class 7',
    location: 'Classrooms',
    description: 'Parent-teacher meetings to discuss student progress and address concerns.'
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [events, setEvents] = useState(calendarEvents);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Helper function to get full date
  const getFullDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
      case 'workshop':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Helper function to get event badge color
  const getEventBadgeColor = (type) => {
    switch(type) {
      case 'quiz':
        return 'bg-blue-500 text-white';
      case 'test':
        return 'bg-purple-500 text-white';
      case 'class':
        return 'bg-green-500 text-white';
      case 'meeting':
        return 'bg-amber-500 text-white';
      case 'deadline':
        return 'bg-red-500 text-white';
      case 'presentation':
        return 'bg-indigo-500 text-white';
      case 'event':
        return 'bg-pink-500 text-white';
      case 'workshop':
        return 'bg-teal-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  // Get events for the selected date
  const getEventsForSelectedDate = () => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    let filteredEvents = events.filter(event => event.date === dateStr);
    
    if (classFilter !== 'all') {
      filteredEvents = filteredEvents.filter(event => {
        if (!event.class) return false;
        return event.class === `Class ${classFilter}` || event.class === 'All Classes' || event.class === 'Multiple Classes';
      });
    }
    
    if (eventTypeFilter !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === eventTypeFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(query) || 
        (event.description && event.description.toLowerCase().includes(query)) ||
        (event.location && event.location.toLowerCase().includes(query))
      );
    }
    
    return filteredEvents;
  };
  
  // Get all events filtered by search/class/type
  const getFilteredEvents = () => {
    let filteredEvents = [...events];
    
    if (classFilter !== 'all') {
      filteredEvents = filteredEvents.filter(event => {
        if (!event.class) return false;
        return event.class === `Class ${classFilter}` || event.class === 'All Classes' || event.class === 'Multiple Classes';
      });
    }
    
    if (eventTypeFilter !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === eventTypeFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(query) || 
        (event.description && event.description.toLowerCase().includes(query)) ||
        (event.location && event.location.toLowerCase().includes(query))
      );
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

  // Navigate to previous month/week/day
  const navigatePrevious = () => {
    if (calendarView === 'month') {
      setCurrentMonth(subMonths(currentMonth, 1));
    } else if (calendarView === 'week') {
      setDate(subDays(date, 7));
    } else {
      setDate(subDays(date, 1));
    }
  };
  
  // Navigate to next month/week/day
  const navigateNext = () => {
    if (calendarView === 'month') {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else if (calendarView === 'week') {
      setDate(addDays(date, 7));
    } else {
      setDate(addDays(date, 1));
    }
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  // Add a new event
  const handleAddEvent = (newEvent) => {
    setEvents(prev => [...prev, { ...newEvent, id: prev.length + 100 }]);
    setIsAddEventOpen(false);
  };

  // Get week dates
  const getWeekDates = () => {
    if (!date) return [];
    
    const dayOfWeek = date.getDay();
    const startDate = subDays(date, dayOfWeek);
    
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const weekDates = getWeekDates();
  const selectedDateEvents = getEventsForSelectedDate();
  const filteredEvents = getFilteredEvents();

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
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
            onClick={() => setIsAddEventOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar and Events */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-indigo-600" />
                  {calendarView === 'month' 
                    ? format(currentMonth, 'MMMM yyyy') 
                    : calendarView === 'week' 
                      ? `Week of ${format(weekDates[0], 'MMM d')} - ${format(weekDates[6], 'MMM d, yyyy')}`
                      : format(date, 'EEEE, MMMM d, yyyy')}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-l-md rounded-r-none flex items-center justify-center"
                      onClick={navigatePrevious}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-l-none rounded-r-md flex items-center justify-center"
                      onClick={navigateNext}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setDate(new Date());
                      setCurrentMonth(new Date());
                    }}
                  >
                    Today
                  </Button>
                  <Select value={calendarView} onValueChange={(value) => setCalendarView(value as 'month' | 'week' | 'day')}>
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

              <div className="mt-4">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for events..."
                    className="pl-10 pr-4 py-2 rounded-md border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {calendarView === 'month' && (
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    className="rounded-md border"
                  />
                </div>
              )}

              {calendarView === 'week' && (
                <div className="border rounded-md overflow-hidden">
                  <div className="grid grid-cols-7 bg-gray-50 border-b">
                    {weekDays.map((day, index) => (
                      <div key={day} className="py-2 px-3 text-center text-sm font-medium">
                        <div className="text-gray-600">{day.substring(0, 3)}</div>
                        <div className={`flex justify-center mt-1 ${isSameDay(weekDates[index], new Date()) ? 'bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto text-indigo-700' : ''}`}>
                          {format(weekDates[index], 'd')}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-0 h-[320px]">
                    {weekDates.map((weekDate, index) => {
                      const dateStr = weekDate.toISOString().split('T')[0];
                      const dayEvents = filteredEvents.filter(event => event.date === dateStr);
                      return (
                        <div 
                          key={index} 
                          className={`p-1 border-r border-b min-h-[100px] ${
                            isSameDay(weekDate, date) ? 'bg-indigo-50' : ''
                          } ${
                            isSameDay(weekDate, new Date()) ? 'bg-indigo-50/30' : ''
                          }`}
                          onClick={() => setDate(weekDate)}
                        >
                          <div className="h-full overflow-y-auto space-y-1 p-1">
                            {dayEvents.slice(0, 3).map(event => (
                              <div 
                                key={event.id}
                                className={`text-xs p-1 rounded truncate cursor-pointer ${getEventColor(event.type)}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event);
                                }}
                              >
                                {event.startTime && <span className="font-medium">{event.startTime} - </span>}
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-center text-gray-500 font-medium">
                                +{dayEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {calendarView === 'day' && date && (
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gray-50 border-b py-3 px-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">{format(date, 'EEEE')}</div>
                      <div className="text-2xl font-semibold">{format(date, 'd')}</div>
                      <div className="text-sm text-gray-600">{format(date, 'MMMM yyyy')}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                    {selectedDateEvents.length > 0 ? (
                      selectedDateEvents.map(event => (
                        <div 
                          key={event.id} 
                          className={`p-3 rounded-lg border shadow-sm cursor-pointer transition-all hover:shadow-md ${getEventColor(event.type)}`}
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              {event.startTime && (
                                <div className="flex items-center text-sm mt-1">
                                  <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                  {event.startTime} - {event.endTime}
                                </div>
                              )}
                            </div>
                            <Badge className={getEventBadgeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center text-sm mt-2">
                              <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                              {event.location}
                            </div>
                          )}
                          
                          {event.class && (
                            <div className="flex items-center text-sm mt-1">
                              <Users className="h-3 w-3 mr-1 text-gray-500" />
                              {event.class}
                            </div>
                          )}
                          
                          {event.description && (
                            <div className="text-sm mt-2 line-clamp-2 text-gray-600">
                              {event.description}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-800">No events scheduled</h3>
                        <p className="text-gray-500 mb-4">There are no events scheduled for this date</p>
                        <Button onClick={() => setIsAddEventOpen(true)}>
                          Add New Event
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between gap-4 border-t bg-gray-50 rounded-b-lg">
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
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
          
          <Card className="bg-white shadow-sm border-gray-100">
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
                    <div 
                      key={event.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${getEventColor(event.type)}`}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge className={getEventBadgeColor(event.type)}>{event.type}</Badge>
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
                      
                      {event.description && (
                        <div className="mt-3 text-sm text-gray-600">
                          {event.description}
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800">No events scheduled</h3>
                  <p className="text-gray-500 mb-4">There are no events scheduled for this date</p>
                  <Button onClick={() => setIsAddEventOpen(true)}>
                    Add New Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Tasks and deadlines requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
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
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
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
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Start Working</Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  View All Deadlines
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2 text-indigo-600" />
                Quick Add
              </CardTitle>
              <CardDescription>Quickly add events to your calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Type</label>
                  <Select defaultValue="class">
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Event Title</label>
                  <Input placeholder="Enter event title" className="border-gray-200" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Date & Time</label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left border-gray-200">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Select date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" className="pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    
                    <Select defaultValue="09:00">
                      <SelectTrigger className="w-[110px] border-gray-200">
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
                    <SelectTrigger className="border-gray-200">
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

                <div>
                  <label className="block text-sm font-medium mb-1">Location (Optional)</label>
                  <Input placeholder="Enter location" className="border-gray-200" />
                </div>
                
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Add to Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Detail Modal */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedEvent.title}</span>
                  <Badge className={getEventBadgeColor(selectedEvent.type)}>
                    {selectedEvent.type}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {getFullDate(selectedEvent.date)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {selectedEvent.startTime && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Time</div>
                      <div>{selectedEvent.startTime} - {selectedEvent.endTime}</div>
                    </div>
                  </div>
                )}

                {selectedEvent.location && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Location</div>
                      <div>{selectedEvent.location}</div>
                    </div>
                  </div>
                )}

                {selectedEvent.class && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Participants</div>
                      <div>{selectedEvent.class}</div>
                    </div>
                  </div>
                )}

                {selectedEvent.description && (
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Description</div>
                      <div className="mt-1">{selectedEvent.description}</div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <div className="flex gap-2 sm:mr-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 text-amber-600 border-amber-200 hover:bg-amber-50"
                  >
                    <Bell className="h-4 w-4" />
                    Set Reminder
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  >
                    <Repeat className="h-4 w-4" />
                    Recurring
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Event Modal */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event in your calendar
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-title" className="text-right text-sm font-medium">
                Title
              </label>
              <Input
                id="event-title"
                placeholder="Enter event title"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-type" className="text-right text-sm font-medium">
                Type
              </label>
              <Select defaultValue="class">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="event">School Event</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-date" className="text-right text-sm font-medium">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="col-span-3 justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Select date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">
                Time
              </label>
              <div className="col-span-3 flex gap-2">
                <Select defaultValue="09:00">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Start time" />
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
                
                <span className="flex items-center">to</span>
                
                <Select defaultValue="10:00">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-class" className="text-right text-sm font-medium">
                Class
              </label>
              <Select defaultValue="6">
                <SelectTrigger className="col-span-3">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-location" className="text-right text-sm font-medium">
                Location
              </label>
              <Input
                id="event-location"
                placeholder="Enter location"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-description" className="text-right text-sm font-medium">
                Description
              </label>
              <Input
                id="event-description"
                placeholder="Enter description"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => {
                const newEvent = {
                  id: events.length + 100,
                  title: "New Event",
                  date: new Date().toISOString().split('T')[0],
                  type: "class",
                  class: "Class 6",
                  location: "Room 101",
                  startTime: "10:00",
                  endTime: "11:00",
                  description: "New event description"
                };
                handleAddEvent(newEvent);
              }}
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TeacherPageContainer>
  );
};

export default TeacherCalendar;
