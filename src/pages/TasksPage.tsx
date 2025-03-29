
import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  subject?: string;
  link?: string;
}

const TasksPage = () => {
  // Mock data (in a real app, this would come from an API)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete Hindi homework',
      description: 'Complete the assigned exercises from chapter 5 of the Hindi textbook.',
      completed: true,
      dueDate: 'May 20, 2023',
      priority: 'Medium',
      subject: 'Hindi',
      link: '/subjects/hindi'
    },
    {
      id: 2,
      title: 'Prepare for Math quiz',
      description: 'Review chapter 7 on Algebra and practice the sample problems.',
      completed: false,
      dueDate: 'May 22, 2023',
      priority: 'High',
      subject: 'Math',
      link: '/subjects/math'
    },
    {
      id: 3,
      title: 'Finish English practice',
      description: 'Complete the grammar exercises and prepare for the upcoming test.',
      completed: false,
      dueDate: 'May 23, 2023',
      priority: 'Medium',
      subject: 'English',
      link: '/subjects/english'
    },
    {
      id: 4,
      title: 'Read G.S. chapter',
      description: 'Read and take notes on Chapter 8: Indian History.',
      completed: true,
      dueDate: 'May 18, 2023',
      priority: 'Low',
      subject: 'G.S.',
      link: '/subjects/gs'
    },
    {
      id: 5,
      title: 'Submit science project',
      description: 'Finalize and submit the science project on renewable energy sources.',
      completed: false,
      dueDate: 'May 25, 2023',
      priority: 'High',
      subject: 'Science',
      link: '/subjects/science'
    },
    {
      id: 6,
      title: 'Practice for sports day',
      description: 'Attend the practice session for the upcoming sports day events.',
      completed: false,
      dueDate: 'May 24, 2023',
      priority: 'Medium'
    }
  ]);
  
  const toggleTaskStatus = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  const isOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && !dueDate.includes('Today');
  };
  
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-gray-500">Manage your academic tasks and assignments</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="font-medium">{pendingTasks.length}</span> pending, <span className="font-medium">{completedTasks.length}</span> completed
        </div>
        <Button className="bg-brand-purple hover:bg-purple-700">
          + Add New Task
        </Button>
      </div>
      
      <Tabs defaultValue="pending" className="mb-6">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {pendingTasks.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No pending tasks</p>
              </div>
            ) : (
              <div className="divide-y">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className="mr-3 mt-1"
                      >
                        <Circle className="h-5 w-5 text-gray-400" />
                      </button>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{task.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            Due: <span className={isOverdue(task.dueDate) ? 'text-red-600 font-medium' : ''}>
                              {task.dueDate}
                            </span>
                            {task.subject && (
                              <span className="ml-2 text-gray-500">• {task.subject}</span>
                            )}
                          </div>
                          {task.link && (
                            <a 
                              href={task.link} 
                              className="text-sm text-brand-purple hover:underline flex items-center"
                            >
                              View Subject
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {completedTasks.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No completed tasks</p>
              </div>
            ) : (
              <div className="divide-y">
                {completedTasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className="mr-3 mt-1"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </button>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium line-through text-gray-500">{task.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600`}>
                            Completed
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2 line-through">{task.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">
                            Due: {task.dueDate}
                            {task.subject && (
                              <span className="ml-2">• {task.subject}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {tasks.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No tasks found</p>
              </div>
            ) : (
              <div className="divide-y">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className="mr-3 mt-1"
                      >
                        {task.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.completed 
                              ? 'bg-gray-100 text-gray-600' 
                              : getPriorityClass(task.priority)
                          }`}>
                            {task.completed ? 'Completed' : task.priority}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${
                          task.completed ? 'text-gray-400 line-through' : 'text-gray-600'
                        }`}>
                          {task.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className={`text-sm ${task.completed ? 'text-gray-400' : ''}`}>
                            Due: <span className={
                              !task.completed && isOverdue(task.dueDate) ? 'text-red-600 font-medium' : ''
                            }>
                              {task.dueDate}
                            </span>
                            {task.subject && (
                              <span className="ml-2 text-gray-500">• {task.subject}</span>
                            )}
                          </div>
                          {!task.completed && task.link && (
                            <a 
                              href={task.link} 
                              className="text-sm text-brand-purple hover:underline flex items-center"
                            >
                              View Subject
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default TasksPage;
