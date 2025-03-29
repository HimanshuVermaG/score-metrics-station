
import React from 'react';
import TaskItem from '@/components/ui/task-item';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  link: string;
}

interface TasksProps {
  tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  return (
    <div className="rounded-lg shadow bg-white p-5">
      <h2 className="text-lg font-medium mb-4">Tasks</h2>
      
      <div>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            title={task.title}
            completed={task.completed}
            link={task.link}
          />
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <a href="/tasks" className="text-sm text-brand-purple hover:underline">
          View All Tasks
        </a>
      </div>
    </div>
  );
};

export default Tasks;
