
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const TeacherNavbar = () => {
  const { logout, user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Helper function to safely get email 
  const getUserEmail = () => {
    // Check if user has email property
    if (user && 'email' in user) {
      return user.email;
    }
    return null;
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for classes, students, or resources..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500">
              5
            </Badge>
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
    </div>
  );
};

export default TeacherNavbar;
