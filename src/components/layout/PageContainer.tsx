
import React from 'react';
import Navbar from './Navbar';
import { TooltipProvider } from '@/components/ui/tooltip';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default PageContainer;
