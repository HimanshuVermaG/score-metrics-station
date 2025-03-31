
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const TeacherNavbar = () => {
  const { logout, user } = useAuth();
  
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center mr-10">
          <Link to="/teacher" className="text-xl font-bold text-indigo-700">
            TeacherView Portal
          </Link>
        </div>
        
        <div className="flex-1 mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for classes, students, or resources..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <button 
              onClick={logout} 
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-500"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 bg-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
              TP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherNavbar;
