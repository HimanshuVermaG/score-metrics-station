
import React from 'react';
import { Users, Book, ClipboardCheck, BarChart } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  iconBg, 
  changeText,
  changeColor
}: { 
  title: string, 
  value: string, 
  description: string, 
  icon: any, 
  iconBg: string,
  changeText?: string,
  changeColor?: string
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-full ${iconBg}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
    
    <div>
      <h3 className="text-lg text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      {changeText && (
        <p className={`text-sm mt-2 ${changeColor}`}>{changeText}</p>
      )}
    </div>
  </div>
);

const TeacherStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Students"
        value="90"
        description="Across all classes"
        icon={Users}
        iconBg="bg-indigo-100"
      />
      
      <StatCard 
        title="Active Content"
        value="15"
        description="Quizzes, tests, practice sets"
        icon={Book}
        iconBg="bg-blue-100"
      />
      
      <StatCard 
        title="Pending Reviews"
        value="38"
        description="Submissions to grade"
        icon={ClipboardCheck}
        iconBg="bg-amber-100"
        changeText="+12 since yesterday"
        changeColor="text-green-500"
      />
      
      <StatCard 
        title="Avg. Performance"
        value="76%"
        description="Across all classes"
        icon={BarChart}
        iconBg="bg-purple-100"
        changeText="+2.1% this week"
        changeColor="text-green-500"
      />
    </div>
  );
};

export default TeacherStats;
