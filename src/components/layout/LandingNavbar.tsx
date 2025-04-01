
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingNavbar = () => {
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-indigo-600">
            <svg 
              className="w-8 h-8 mr-2 text-indigo-600" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            EduConnect
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="hidden sm:inline-flex">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Sign up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
