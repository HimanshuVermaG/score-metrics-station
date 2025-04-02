
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, User, LogOut, Mail, Calendar, HelpCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Demo search results data
const searchData = [
  {
    type: 'student',
    items: [
      { id: 1, name: 'Rahul Singh', class: 'Class 6', link: '/teacher/students?id=1' },
      { id: 2, name: 'Priya Sharma', class: 'Class 7', link: '/teacher/students?id=2' },
      { id: 3, name: 'Aarav Patel', class: 'Class 8', link: '/teacher/students?id=3' },
    ]
  },
  {
    type: 'class',
    items: [
      { id: 'c6', name: 'Class 6', count: '28 students', link: '/teacher/class/6' },
      { id: 'c7', name: 'Class 7', count: '32 students', link: '/teacher/class/7' },
      { id: 'c8', name: 'Class 8', count: '30 students', link: '/teacher/class/8' },
    ]
  },
  {
    type: 'content',
    items: [
      { id: 'q1', name: 'Mathematics Quiz - Class 6', type: 'Quiz', link: '/teacher/content/q1' },
      { id: 'a1', name: 'Science Lab Report - Class 8', type: 'Assignment', link: '/teacher/content/a1' },
      { id: 't1', name: 'English Language Test - Class 7', type: 'Test', link: '/teacher/content/t1' },
    ]
  },
  {
    type: 'resource',
    items: [
      { id: 'r1', name: 'Interactive Geometry Diagrams', type: 'Teaching Resource', link: '/teacher/resources/r1' },
      { id: 'r2', name: 'Science Experiment Videos', type: 'Media Resource', link: '/teacher/resources/r2' },
    ]
  }
];

const TeacherNavbar = () => {
  const { logout, user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  
  // Helper function to safely get email 
  const getUserEmail = () => {
    // Check if user has email property
    if (user && 'email' in user) {
      return user.email;
    }
    return null;
  };
  
  // Handle search query change
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      // Filter search results based on query
      const results = searchData.map(category => {
        const filteredItems = category.items.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return {
          ...category,
          items: filteredItems
        };
      }).filter(category => category.items.length > 0);
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  // Focus on search input when modal opens
  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [searchModalOpen]);
  
  // Handle search item click
  const handleSearchItemClick = (link) => {
    setSearchModalOpen(false);
    setSearchQuery('');
    navigate(link);
  };
  
  return (
    <div className="border-b bg-white sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center mr-10 lg:hidden">
          <Link to="/teacher" className="text-xl font-bold text-indigo-700">
            TV
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:items-center lg:mr-10">
          <Link to="/teacher" className="text-xl font-bold text-indigo-700">
            TeacherView
          </Link>
        </div>
        
        <div className={`flex-1 mx-4 transition-all duration-200 ${searchOpen ? 'block' : 'hidden md:block'}`}>
          <div className="relative">
            <Button
              variant="ghost"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 p-0"
              onClick={() => setSearchModalOpen(true)}
            >
              <Search className="h-4 w-4 text-gray-400" />
            </Button>
            <Input
              type="text"
              placeholder="Search for classes, students, or resources..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onClick={() => setSearchModalOpen(true)}
              readOnly
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5 text-gray-600" />
          </Button>
          
          <div className="hidden sm:flex">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/teacher/calendar">
                <Calendar className="h-5 w-5 text-gray-600" />
              </Link>
            </Button>
          </div>
          
          <div className="hidden sm:flex">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/teacher/messages">
                <Mail className="h-5 w-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-indigo-600">
                  3
                </Badge>
              </Link>
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/teacher/activity-log">
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500">
                5
              </Badge>
            </Link>
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" asChild>
                  <Link to="/teacher/help">
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Support</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-red-500"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-indigo-700 text-white text-sm">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || 'Teacher'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {getUserEmail() || 'teacher@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/teacher/profile" className="cursor-pointer flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/teacher/settings" className="cursor-pointer flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Search Modal */}
      <Dialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <DialogHeader className="px-4 pt-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search for classes, students, resources..."
                className="w-full pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </DialogHeader>
          
          <div className="max-h-[400px] overflow-y-auto px-4 pb-4">
            {searchQuery.trim() === '' ? (
              <div className="py-6 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <p>Type to search for students, classes, content and more</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-6 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <p>No results found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((category) => (
                  <div key={category.type} className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {category.type === 'student' && 'Students'}
                      {category.type === 'class' && 'Classes'}
                      {category.type === 'content' && 'Content'}
                      {category.type === 'resource' && 'Resources'}
                    </h3>
                    <div className="space-y-1">
                      {category.items.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => handleSearchItemClick(item.link)}
                        >
                          <div className="flex items-center">
                            {category.type === 'student' && (
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarFallback className="bg-indigo-100 text-indigo-800">
                                  {item.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            {category.type === 'class' && (
                              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3">
                                <User className="h-4 w-4" />
                              </div>
                            )}
                            {category.type === 'content' && (
                              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
                                <FileText className="h-4 w-4" />
                              </div>
                            )}
                            {category.type === 'resource' && (
                              <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mr-3">
                                <BookOpen className="h-4 w-4" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">
                                {item.class || item.count || item.type}
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter className="border-t p-3 bg-gray-50 flex justify-between text-xs text-gray-500">
            <div>Press <kbd className="px-1 py-0.5 bg-gray-100 border rounded text-xs">↵</kbd> to select</div>
            <div>Press <kbd className="px-1 py-0.5 bg-gray-100 border rounded text-xs">Esc</kbd> to close</div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherNavbar;
