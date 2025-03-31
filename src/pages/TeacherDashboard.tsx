
import React from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import TeacherStats from '@/components/dashboard/TeacherStats';
import TeacherActionCards from '@/components/dashboard/TeacherActionCards';
import TeacherPerformanceChart from '@/components/dashboard/TeacherPerformanceChart';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Plus } from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const teacherName = user?.name || 'Teacher';

  return (
    <TeacherPageContainer>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome back, {teacherName}</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Manage Students
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>

      <TeacherStats />
      
      <TeacherActionCards />
      
      <TeacherPerformanceChart />
    </TeacherPageContainer>
  );
};

export default TeacherDashboard;
