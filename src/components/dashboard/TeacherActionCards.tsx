
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, BarChart2, Users } from 'lucide-react';

const ActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  bgColor, 
  iconColor,
  to
}: { 
  title: string, 
  description: string, 
  icon: any, 
  bgColor: string,
  iconColor: string,
  to: string
}) => (
  <Link to={to} className={`${bgColor} rounded-lg p-6 flex items-center hover:shadow-lg transition-shadow`}>
    <div className={`${iconColor} p-4 rounded-full mr-6`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <div>
      <h3 className="text-xl font-medium text-white">{title}</h3>
      <p className="text-white/80 mt-1">{description}</p>
    </div>
  </Link>
);

const TeacherActionCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <ActionCard 
        title="Create Quiz"
        description="Create a new quiz or test"
        icon={PlusCircle}
        bgColor="bg-indigo-700"
        iconColor="bg-indigo-600"
        to="/teacher/create"
      />
      
      <ActionCard 
        title="Student Reports"
        description="View detailed analytics"
        icon={BarChart2}
        bgColor="bg-teal-600"
        iconColor="bg-teal-500"
        to="/teacher/reports"
      />
      
      <ActionCard 
        title="Manage Students"
        description="Add or update student records"
        icon={Users}
        bgColor="bg-blue-500"
        iconColor="bg-blue-400"
        to="/teacher/students"
      />
    </div>
  );
};

export default TeacherActionCards;
