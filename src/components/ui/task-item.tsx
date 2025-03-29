
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TaskItemProps {
  title: string;
  completed: boolean;
  link?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, completed, link = '#' }) => {
  return (
    <Link 
      to={link} 
      className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center">
        <span className={`flex h-5 w-5 rounded-full border ${completed ? 'bg-green-500 border-green-500' : 'border-gray-300'} items-center justify-center mr-3`}>
          {completed && <Check className="h-3 w-3 text-white" />}
        </span>
        <span className={completed ? 'line-through text-gray-500' : ''}>{title}</span>
      </div>
      
      <span className="flex items-center text-gray-400 hover:text-brand-purple">
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
};

export default TaskItem;
