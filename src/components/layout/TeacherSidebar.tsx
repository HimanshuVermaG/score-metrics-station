
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, BarChart2, Users, Activity, BookOpen, Calendar, Settings } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to, active }: { icon: any, label: string, to: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm ${
      active 
        ? 'bg-indigo-50 text-indigo-700 font-medium' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);

const TeacherSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="w-64 border-r bg-white min-h-screen py-4 px-2">
      <div className="mb-6 px-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          MAIN MENU
        </h3>
      </div>
      
      <nav className="space-y-1">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          to="/teacher" 
          active={path === '/teacher'} 
        />
        <SidebarItem 
          icon={PlusCircle} 
          label="Create Content" 
          to="/teacher/create" 
          active={path === '/teacher/create'} 
        />
        <SidebarItem 
          icon={BarChart2} 
          label="Student Reports" 
          to="/teacher/reports" 
          active={path === '/teacher/reports'} 
        />
        <SidebarItem 
          icon={Users} 
          label="Manage Students" 
          to="/teacher/students" 
          active={path === '/teacher/students'} 
        />
        <SidebarItem 
          icon={Activity} 
          label="Activity Log" 
          to="/teacher/activity" 
          active={path === '/teacher/activity'} 
        />
      </nav>
      
      <div className="mt-8 mb-6 px-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          CLASSES
        </h3>
      </div>
      
      <nav className="space-y-1">
        <SidebarItem 
          icon={BookOpen} 
          label="Class 6" 
          to="/teacher/class/6" 
          active={path === '/teacher/class/6'} 
        />
        <SidebarItem 
          icon={BookOpen} 
          label="Class 7" 
          to="/teacher/class/7" 
          active={path === '/teacher/class/7'} 
        />
        <SidebarItem 
          icon={BookOpen} 
          label="Class 8" 
          to="/teacher/class/8" 
          active={path === '/teacher/class/8'} 
        />
      </nav>
      
      <div className="mt-8 mb-6 px-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          OTHER
        </h3>
      </div>
      
      <nav className="space-y-1">
        <SidebarItem 
          icon={Calendar} 
          label="Calendar" 
          to="/teacher/calendar" 
          active={path === '/teacher/calendar'} 
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          to="/teacher/settings" 
          active={path === '/teacher/settings'} 
        />
      </nav>
    </div>
  );
};

export default TeacherSidebar;
