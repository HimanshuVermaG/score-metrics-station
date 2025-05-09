
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarFooter, 
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart2, 
  Users, 
  Activity, 
  BookOpen, 
  Settings, 
  Mail, 
  FileText,
  Layers
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const TeacherSidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { user } = useAuth();
  
  const isActive = (route: string) => path === route;
  
  return (
    <Sidebar>
      <SidebarHeader className="pb-0">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
              TP
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-800">TeacherView</span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher')} tooltip="Dashboard">
                  <Link to="/teacher">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/create')} tooltip="Create Content">
                  <Link to="/teacher/create">
                    <PlusCircle />
                    <span>Create Content</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/active-content')} tooltip="Active Content">
                  <Link to="/teacher/active-content">
                    <Layers />
                    <span>Active Content</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/reports')} tooltip="Student Reports">
                  <Link to="/teacher/reports">
                    <BarChart2 />
                    <span>Student Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/students')} tooltip="Manage Students">
                  <Link to="/teacher/students">
                    <Users />
                    <span>Manage Students</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/activity-log')} tooltip="Activity Log">
                  <Link to="/teacher/activity-log">
                    <Activity />
                    <span>Activity Log</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>CLASSES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/class/6')} tooltip="Class 6">
                  <Link to="/teacher/class/6">
                    <BookOpen />
                    <span>Class 6</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/class/7')} tooltip="Class 7">
                  <Link to="/teacher/class/7">
                    <BookOpen />
                    <span>Class 7</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/class/8')} tooltip="Class 8">
                  <Link to="/teacher/class/8">
                    <BookOpen />
                    <span>Class 8</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>OTHER</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/messages')} tooltip="Messages">
                  <Link to="/teacher/messages">
                    <Mail />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/teacher/settings')} tooltip="Settings">
                  <Link to="/teacher/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <div className="border-t pt-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-medium text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name || 'Teacher'}</span>
                <span className="text-xs text-gray-500">Class Teacher</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default TeacherSidebar;
