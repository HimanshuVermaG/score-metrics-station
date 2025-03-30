
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarClock, ArrowLeft, CheckCircle, Clock, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { toast } = useToast();

  // Mock task data based on taskId
  const tasks = {
    '1': {
      id: 1,
      title: 'Complete Hindi homework',
      description: 'Complete the assigned Hindi grammar exercises from textbook pages 45-47.',
      dueDate: 'Tomorrow, 3:00 PM',
      subject: 'Hindi',
      completed: true,
      progress: 100,
      attachments: [
        { name: 'Hindi_Homework.pdf', type: 'PDF', size: '1.2 MB' }
      ],
      notes: 'Focus on verb conjugations and sentence structure.',
      relatedLinks: [
        { title: 'Hindi Grammar Guide', url: '/resources/hindi-grammar' },
        { title: 'Practice Hindi Verbs', url: '/practice/hindi/verbs' }
      ]
    },
    '2': {
      id: 2,
      title: 'Prepare for Math quiz',
      description: 'Review algebra and geometry concepts for the upcoming quiz on Friday.',
      dueDate: 'Friday, 9:00 AM',
      subject: 'Math',
      completed: false,
      progress: 65,
      attachments: [
        { name: 'Math_Study_Guide.pdf', type: 'PDF', size: '2.4 MB' },
        { name: 'Geometry_Formulas.xlsx', type: 'Excel', size: '845 KB' }
      ],
      notes: 'Pay extra attention to trigonometric functions and geometric proofs.',
      relatedLinks: [
        { title: 'Math Practice Quiz', url: '/quizzes/start/2' },
        { title: 'Geometry Concepts', url: '/practice/math/geometry' }
      ]
    },
    '3': {
      id: 3,
      title: 'Finish English practice',
      description: 'Complete the assigned reading comprehension exercises and grammar worksheets.',
      dueDate: 'Thursday, 5:00 PM',
      subject: 'English',
      completed: false,
      progress: 30,
      attachments: [
        { name: 'Reading_Worksheet.pdf', type: 'PDF', size: '1.8 MB' }
      ],
      notes: 'Pay attention to context clues and inference questions.',
      relatedLinks: [
        { title: 'Grammar Practice', url: '/practice/english/grammar' },
        { title: 'Reading Comprehension Tips', url: '/resources/reading-tips' }
      ]
    },
    '4': {
      id: 4,
      title: 'Read G.S. chapter',
      description: 'Read and take notes on the Indian History chapter covering the Maurya Empire.',
      dueDate: 'Yesterday, 6:00 PM',
      subject: 'G.S.',
      completed: true,
      progress: 100,
      attachments: [
        { name: 'Indian_History_Notes.docx', type: 'Word', size: '756 KB' }
      ],
      notes: 'Create a timeline of key events and notable rulers.',
      relatedLinks: [
        { title: 'Indian History Quiz', url: '/quizzes/start/4' },
        { title: 'Historical Maps', url: '/resources/history-maps' }
      ]
    },
    '5': {
      id: 5,
      title: 'Submit science project',
      description: 'Complete and submit the ecosystem diorama project with documentation.',
      dueDate: 'Monday, 10:00 AM',
      subject: 'Science',
      completed: false,
      progress: 80,
      attachments: [
        { name: 'Project_Guidelines.pdf', type: 'PDF', size: '1.5 MB' },
        { name: 'Research_Notes.docx', type: 'Word', size: '920 KB' }
      ],
      notes: 'Include at least 5 different species and their interactions in the ecosystem.',
      relatedLinks: [
        { title: 'Ecosystem Reference', url: '/resources/ecosystems' },
        { title: 'Project Examples', url: '/resources/project-examples' }
      ]
    },
    '6': {
      id: 6,
      title: 'Review history notes',
      description: 'Review notes on medieval Indian history in preparation for next week\'s test.',
      dueDate: 'Next Tuesday, 9:00 AM',
      subject: 'G.S.',
      completed: false,
      progress: 15,
      attachments: [
        { name: 'History_Notes.pdf', type: 'PDF', size: '3.2 MB' }
      ],
      notes: 'Focus on major dynasties, cultural developments, and important battles.',
      relatedLinks: [
        { title: 'History Timeline', url: '/resources/history-timeline' },
        { title: 'Practice Questions', url: '/practice/gs/history' }
      ]
    }
  };

  const task = (tasks as any)[taskId] || tasks['1'];

  const markAsComplete = () => {
    toast({
      title: "Task marked as complete",
      description: `"${task.title}" has been marked as complete.`,
    });
  };

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <p className="text-gray-500">{task.subject} Task</p>
        </div>
        <Button 
          variant="outline" 
          asChild
          className="flex items-center"
        >
          <Link to="/tasks">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className={`h-5 w-5 ${task.completed ? 'text-green-600' : 'text-gray-400'}`} />
                Task Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-800">{task.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
                    <div className="flex items-center">
                      <CalendarClock className="h-4 w-4 text-brand-purple mr-1" />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                  <Badge 
                    className={task.completed ? 'bg-green-500' : 'bg-amber-500'}
                  >
                    {task.completed ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
                
                {!task.completed && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                )}
                
                {task.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                    <p className="text-gray-800">{task.notes}</p>
                  </div>
                )}
                
                {!task.completed && (
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-brand-purple hover:bg-purple-700"
                      onClick={markAsComplete}
                    >
                      Mark as Complete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {task.attachments && task.attachments.length > 0 && (
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {task.attachments.map((attachment: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded mr-3">
                          <span className="text-xs font-medium">{attachment.type}</span>
                        </div>
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-xs text-gray-500">{attachment.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {task.relatedLinks && task.relatedLinks.length > 0 ? (
                <div className="space-y-3">
                  {task.relatedLinks.map((link: any, index: number) => (
                    <Link 
                      key={index} 
                      to={link.url}
                      className="block p-3 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center">
                        <div className="mr-3 text-brand-purple">
                          {/* Use the correct Lucide icons that are available */}
                          {link.url.includes('quiz') ? 
                            <CalendarClock className="h-4 w-4" /> : 
                           link.url.includes('practice') ? 
                            <CheckCircle className="h-4 w-4" /> : 
                            <FileText className="h-4 w-4" />}
                        </div>
                        <span className="text-brand-purple">{link.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No related resources</p>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-purple" />
                Estimated Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-brand-purple">
                  {task.id === 1 ? '45' : 
                   task.id === 2 ? '90' : 
                   task.id === 3 ? '60' : 
                   task.id === 4 ? '30' : 
                   task.id === 5 ? '120' : '45'} min
                </p>
                <p className="text-sm text-gray-500 mt-1">Recommended time to complete</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default TaskPage;
