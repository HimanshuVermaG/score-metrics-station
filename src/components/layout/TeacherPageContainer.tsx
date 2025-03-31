
import React from 'react';
import TeacherNavbar from './TeacherNavbar';
import TeacherSidebar from './TeacherSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

interface TeacherPageContainerProps {
  children: React.ReactNode;
}

const TeacherPageContainer: React.FC<TeacherPageContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TeacherNavbar />
      <div className="flex flex-1 overflow-hidden">
        <TeacherSidebar />
        <TooltipProvider>
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TeacherPageContainer;
