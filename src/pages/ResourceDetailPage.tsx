
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, BookOpen, FileText, Video, Award, Brain, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Define more specific content types for better TypeScript support
type VideoContent = {
  videoUrl: string;
  sections: { title: string; timestamp: string; completed: boolean; }[];
}

type DocumentContent = {
  sections: { title: string; content: string; }[];
}

type InteractiveContent = {
  introduction: string;
  problems: { 
    id: number; 
    problem: string; 
    solution: string; 
    steps: string[]; 
    completed: boolean;
  }[];
}

type QuizItem = {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Define the resource type with discriminated union for content
type Resource = {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'interactive';
  duration: string;
  difficulty: string;
  milestoneId: string;
  milestoneName: string;
  completed: boolean;
  progress: number;
  description: string;
  relatedResources: { id: string; title: string }[];
} & (
  | { type: 'video'; content: VideoContent; quiz?: QuizItem[] }
  | { type: 'document'; content: DocumentContent }
  | { type: 'interactive'; content: InteractiveContent }
  | { type: 'quiz'; content: any } // Add more specific quiz content type if needed
);

// Mock data
const getResourceData = (resourceId: string): Resource => {
  const resources: Record<string, Resource> = {
    'algebra-basics': {
      id: 'resource-1',
      title: 'Algebra Basics Video Course',
      type: 'video',
      duration: '45 min',
      difficulty: 'Medium',
      milestoneId: 'milestone-1',
      milestoneName: 'Algebra Fundamentals',
      completed: true,
      progress: 100,
      description: 'An comprehensive introduction to fundamental algebraic concepts. This video course covers expressions, equations, and basic problem-solving techniques.',
      content: {
        videoUrl: 'https://www.youtube.com/embed/pTnEG_WGd2Q',
        sections: [
          { title: 'Introduction to Algebra', timestamp: '00:00', completed: true },
          { title: 'Variables and Expressions', timestamp: '05:30', completed: true },
          { title: 'Solving Basic Equations', timestamp: '15:45', completed: true },
          { title: 'Word Problems', timestamp: '25:10', completed: false },
          { title: 'Practice Examples', timestamp: '35:30', completed: false }
        ]
      },
      relatedResources: [
        { id: 'resource-2', title: 'Linear Equations Practice Set' },
        { id: 'resource-3', title: 'Graphing Linear Functions' }
      ],
      quiz: [
        {
          question: 'What is the solution to the equation 2x + 5 = 15?',
          options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 5.5'],
          correctAnswer: 'x = 5'
        },
        {
          question: 'Which expression is equivalent to 3(x + 2)?',
          options: ['3x + 2', '3x + 5', '3x + 6', '6x'],
          correctAnswer: '3x + 6'
        }
      ]
    },
    'linear-equations': {
      id: 'resource-2',
      title: 'Linear Equations Practice Set',
      type: 'interactive',
      duration: '30 min',
      difficulty: 'Medium',
      milestoneId: 'milestone-1',
      milestoneName: 'Algebra Fundamentals',
      completed: false,
      progress: 45,
      description: 'Interactive practice problems focused on linear equations. Work through increasingly difficult problems with step-by-step guidance.',
      content: {
        introduction: 'Linear equations are equations where the variable appears with a power of 1. These practice problems will help you master techniques for solving them.',
        problems: [
          { 
            id: 1, 
            problem: 'Solve for x: 3x + 7 = 22', 
            solution: 'x = 5',
            steps: [
              '3x + 7 = 22',
              '3x = 22 - 7',
              '3x = 15',
              'x = 5'
            ],
            completed: true
          },
          { 
            id: 2, 
            problem: 'Solve for y: 5y - 8 = 2y + 13', 
            solution: 'y = 7',
            steps: [
              '5y - 8 = 2y + 13',
              '5y - 2y = 13 + 8',
              '3y = 21',
              'y = 7'
            ],
            completed: false
          },
          { 
            id: 3, 
            problem: 'Solve for z: 4(z - 3) = 3z - 6', 
            solution: 'z = 6',
            steps: [
              '4(z - 3) = 3z - 6',
              '4z - 12 = 3z - 6',
              '4z - 3z = 12 - 6',
              'z = 6'
            ],
            completed: false
          }
        ]
      },
      relatedResources: [
        { id: 'resource-1', title: 'Algebra Basics Video Course' },
        { id: 'resource-4', title: 'Algebra Quiz' }
      ]
    },
    'graphing-functions': {
      id: 'resource-3',
      title: 'Graphing Linear Functions',
      type: 'document',
      duration: '15 min',
      difficulty: 'Easy',
      milestoneId: 'milestone-1',
      milestoneName: 'Algebra Fundamentals',
      completed: true,
      progress: 100,
      description: 'Learn how to graph linear functions using slope-intercept form, point-slope form, and other techniques.',
      content: {
        sections: [
          { 
            title: 'Understanding the Coordinate Plane', 
            content: 'The coordinate plane consists of two perpendicular number lines called axes. The horizontal axis is the x-axis, and the vertical axis is the y-axis. These axes divide the plane into four quadrants.'
          },
          { 
            title: 'Slope-Intercept Form (y = mx + b)', 
            content: 'In the equation y = mx + b, m represents the slope (steepness) of the line, and b represents the y-intercept (where the line crosses the y-axis).'
          },
          { 
            title: 'Graphing using Slope-Intercept Form', 
            content: 'To graph a line using slope-intercept form: 1) Plot the y-intercept (0, b), 2) Use the slope to find another point, 3) Draw a line through these points.'
          },
          { 
            title: 'Point-Slope Form', 
            content: 'The point-slope form of a linear equation is y - y₁ = m(x - x₁), where m is the slope and (x₁, y₁) is a point on the line.'
          }
        ]
      },
      relatedResources: [
        { id: 'resource-1', title: 'Algebra Basics Video Course' },
        { id: 'resource-4', title: 'Algebra Quiz' }
      ]
    }
  };
  
  return resources[resourceId as keyof typeof resources] || resources['algebra-basics'];
};

const ResourceDetailPage = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('content');
  
  const resource = getResourceData(resourceId || 'algebra-basics');
  
  const handleMarkComplete = () => {
    toast({
      title: "Resource completed",
      description: "Great job! This resource has been marked as completed.",
    });
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'quiz': return <Brain className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'interactive': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const renderResourceContent = () => {
    switch (resource.type) {
      case 'video': {
        const videoContent = resource.content as VideoContent;
        return (
          <div className="space-y-6">
            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
              <iframe 
                src={videoContent.videoUrl} 
                className="w-full h-full" 
                title={resource.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Video Chapters</h3>
              <div className="space-y-2">
                {videoContent.sections.map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      {section.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <div className="h-4 w-4 border rounded-full mr-2"></div>
                      )}
                      <span>{section.title}</span>
                    </div>
                    <div className="text-sm text-gray-500">{section.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
        
      case 'interactive': {
        const interactiveContent = resource.content as InteractiveContent;
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{interactiveContent.introduction}</p>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Practice Problems</h3>
              <div className="space-y-4">
                {interactiveContent.problems.map((problem) => (
                  <Card key={problem.id}>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        Problem {problem.id}
                        {problem.completed && (
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" /> Completed
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium mb-4">{problem.problem}</p>
                      
                      <div className="mb-4">
                        <Button
                          onClick={() => toast({
                            title: "Hint",
                            description: "Try isolating the variable by performing the same operation on both sides."
                          })}
                          variant="outline"
                          size="sm"
                          className="mr-2"
                        >
                          Show Hint
                        </Button>
                        
                        <Button
                          onClick={() => toast({
                            title: "Solution",
                            description: `The solution is: ${problem.solution}`
                          })}
                          variant="outline"
                          size="sm"
                        >
                          Show Solution
                        </Button>
                      </div>
                      
                      <div className="mt-4 border-t pt-4">
                        <p className="text-sm font-medium mb-2">Solution Steps:</p>
                        <ol className="space-y-1 text-sm text-gray-600 pl-5 list-decimal">
                          {problem.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      }
        
      case 'document': {
        const documentContent = resource.content as DocumentContent;
        return (
          <div className="space-y-6">
            {documentContent.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-2">{section.title}</h3>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>
        );
      }
        
      default:
        return (
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Content not available</p>
          </div>
        );
    }
  };
  
  // Helper function to check if the resource has a quiz
  const hasQuiz = () => {
    return resource.type === 'video' && 'quiz' in resource;
  };
  
  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Link to={`/milestone/${resource.milestoneId}`} className="text-brand-purple hover:underline flex items-center mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {resource.milestoneName}
          </Link>
          
          <div className="flex items-center ml-auto">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500 mr-3">{resource.duration}</span>
            
            <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
              {resource.difficulty}
            </Badge>
            
            <Badge variant="outline" className="ml-2 bg-gray-100 flex items-center">
              {getTypeIcon(resource.type)}
              <span className="ml-1">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold">{resource.title}</h1>
            <p className="text-gray-600 mt-1">{resource.description}</p>
          </div>
          
          {!resource.completed && (
            <Button 
              onClick={handleMarkComplete} 
              className="bg-brand-purple hover:bg-purple-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{resource.progress}%</span>
          </div>
          <Progress 
            value={resource.progress} 
            className="h-2" 
            indicatorClassName={`${resource.completed ? 'bg-green-500' : 'bg-brand-purple'}`}
          />
        </div>
      </div>
      
      <Tabs defaultValue="content" value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          {hasQuiz() && (
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          )}
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              {renderResourceContent()}
            </CardContent>
          </Card>
        </TabsContent>
        
        {hasQuiz() && (
          <TabsContent value="quiz" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Check Your Understanding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Type assertion for 'quiz' property */}
                  {resource.type === 'video' && 'quiz' in resource && resource.quiz?.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="font-medium mb-3">Question {index + 1}: {item.question}</p>
                      <div className="space-y-2">
                        {item.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center">
                            <input 
                              type="radio" 
                              id={`q${index}-opt${optIndex}`} 
                              name={`question-${index}`} 
                              className="mr-2"
                            />
                            <label htmlFor={`q${index}-opt${optIndex}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={() => toast({
                            title: "Answer",
                            description: `The correct answer is: ${item.correctAnswer}`
                          })}
                          variant="outline"
                          size="sm"
                        >
                          Show Answer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        <TabsContent value="notes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Personal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 border rounded-md p-4">
                <textarea 
                  className="w-full h-full resize-none border-none focus:outline-none" 
                  placeholder="Take notes on this resource here..."
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => toast({
                    title: "Notes saved",
                    description: "Your notes have been saved successfully!"
                  })}
                >
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discussion" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">Ishaan Patel</p>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-700 mb-3">Can someone explain the difference between point-slope form and slope-intercept form?</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <button className="flex items-center mr-4">
                      <ThumbsUp className="h-4 w-4 mr-1" /> 5
                    </button>
                    <button className="flex items-center mr-4">
                      <ThumbsDown className="h-4 w-4 mr-1" /> 0
                    </button>
                    <button className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" /> Reply
                    </button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">Priya Sharma</p>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-gray-700 mb-3">This explanation really helped me understand linear equations better. Thanks!</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <button className="flex items-center mr-4">
                      <ThumbsUp className="h-4 w-4 mr-1" /> 12
                    </button>
                    <button className="flex items-center mr-4">
                      <ThumbsDown className="h-4 w-4 mr-1" /> 1
                    </button>
                    <button className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" /> Reply
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <textarea 
                  className="w-full h-24 resize-none border-none focus:outline-none mb-3" 
                  placeholder="Add to the discussion..."
                ></textarea>
                <div className="flex justify-end">
                  <Button
                    onClick={() => toast({
                      title: "Comment posted",
                      description: "Your comment has been posted to the discussion!"
                    })}
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Related Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resource.relatedResources.map((related, index) => (
              <Link 
                key={index} 
                to={`/resources/${related.id.replace('resource-', '')}`}
                className="border p-4 rounded-lg hover:shadow-md transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-brand-purple mr-3" />
                  <span>{related.title}</span>
                </div>
                <ArrowLeft className="h-4 w-4 transform rotate-180 text-gray-400" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ResourceDetailPage;
