
import React from 'react';
import TeacherNavbar from './TeacherNavbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider } from '@/components/ui/sidebar';
import TeacherSidebar from './TeacherSidebar';

interface TeacherPageContainerProps {
  children: React.ReactNode;
}

const TeacherPageContainer: React.FC<TeacherPageContainerProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-gray-50 flex flex-col w-full">
        <TeacherNavbar />
        <div className="flex flex-1 overflow-hidden">
          <TeacherSidebar />
          <TooltipProvider>
            <main className="flex-1 overflow-auto bg-background">
              <div className="p-6">
                {children}
              </div>
            </main>
          </TooltipProvider>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TeacherPageContainer;
