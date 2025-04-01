
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Tests', path: '/tests' },
  { name: 'Quizzes', path: '/quizzes' },
  { name: 'Practice', path: '/practice' },
  { name: 'Grades', path: '/grades' },
  { name: 'Assignments', path: '/assignments' },
  { name: 'Tasks', path: '/tasks' },
];

const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center mr-10">
          <Link to="/dashboard" className="text-xl font-bold text-brand-purple">
            Student Homepage
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6 mr-auto overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-1 py-2 text-sm font-medium transition-colors hover:text-brand-purple ${
                location.pathname === item.path
                  ? 'text-brand-purple border-b-2 border-brand-purple'
                  : 'text-gray-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100">
            <User className="h-5 w-5 text-gray-600" />
          </Link>
          <button 
            onClick={logout} 
            className="p-2 rounded-full hover:bg-gray-100 flex items-center text-gray-600 hover:text-red-500"
          >
            <LogOut className="h-5 w-5 mr-1" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
