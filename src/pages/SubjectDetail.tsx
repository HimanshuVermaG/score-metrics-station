import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getTestQuestions } from '@/data/questions';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { ArrowRight, Book, Clock, Award, TrendingUp, BarChart2 } from 'lucide-react';

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  
  const sampleQuestions = getTestQuestions(subjectId || 'Math', 3);
  
  const subjectDetails = {
    Math: {
      name: 'Mathematics',
      icon: <Book className="h-6 w-6 text-blue-600" />,
      color: 'blue',
      bgColor: 'bg-math-bg',
      progress: 72,
      weakAreas: ['Geometry', 'Trigonometry'],
      strongAreas: ['Algebra', 'Number Theory'],
      recentPerformance: [65, 70, 72, 69, 76],
      recommendations: [
        { id: 1, title: 'Geometry Practice Set', type: 'Practice', difficulty: 'Medium' },
        { id: 2, title: 'Trigonometry Quiz', type: 'Quiz', difficulty: 'Hard' },
        { id: 3, title: 'Algebraic Equations Test', type: 'Test', difficulty: 'Easy' }
      ]
    },
    English: {
      name: 'English',
      icon: <Book className="h-6 w-6 text-blue-600" />,
      color: 'blue',
      bgColor: 'bg-english-bg',
      progress: 85,
      weakAreas: ['Grammar', 'Vocabulary'],
      strongAreas: ['Reading Comprehension', 'Writing'],
      recentPerformance: [80, 82, 85, 79, 88],
      recommendations: [
        { id: 1, title: 'Grammar Practice Set', type: 'Practice', difficulty: 'Medium' },
        { id: 2, title: 'Vocabulary Builder Quiz', type: 'Quiz', difficulty: 'Medium' },
        { id: 3, title: 'Reading Comprehension Test', type: 'Test', difficulty: 'Easy' }
      ]
    },
    Hindi: {
      name: 'Hindi',
      icon: <Book className="h-6 w-6 text-amber-600" />,
      color: 'amber',
      bgColor: 'bg-hindi-bg',
      progress: 68,
      weakAreas: ['Grammar', 'Literature'],
      strongAreas: ['Vocabulary', 'Comprehension'],
      recentPerformance: [62, 65, 67, 70, 68],
      recommendations: [
        { id: 1, title: 'Hindi Grammar Practice Set', type: 'Practice', difficulty: 'Easy' },
        { id: 2, title: 'Hindi Literature Quiz', type: 'Quiz', difficulty: 'Medium' },
        { id: 3, title: 'Hindi Comprehension Test', type: 'Test', difficulty: 'Easy' }
      ]
    },
    GS: {
      name: 'General Studies',
      icon: <Book className="h-6 w-6 text-green-600" />,
      color: 'green',
      bgColor: 'bg-gs-bg',
      progress: 76,
      weakAreas: ['Current Affairs', 'Science'],
      strongAreas: ['History', 'Geography'],
      recentPerformance: [72, 74, 73, 78, 76],
      recommendations: [
        { id: 1, title: 'Current Affairs Practice Set', type: 'Practice', difficulty: 'Hard' },
        { id: 2, title: 'Science Quiz', type: 'Quiz', difficulty: 'Medium' },
        { id: 3, title: 'Indian History Test', type: 'Test', difficulty: 'Easy' }
      ]
    }
  };

  const subject = (subjectDetails as any)[subjectId || 'Math'] || subjectDetails.Math;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-easy text-green-800';
      case 'Medium': return 'bg-medium text-orange-800';
      case 'Hard': return 'bg-hard text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${subject.bgColor} mr-3`}>
            {subject.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{subject.name}</h1>
            <p className="text-gray-500">Your overall progress: {subject.progress}%</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-brand-purple" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Recent Performance</h4>
                  <div className="flex h-[60px] items-end gap-1">
                    {subject.recentPerformance.map((score, i) => (
                      <div
                        key={i}
                        className="bg-brand-purple/80 rounded-t w-full"
                        style={{ height: `${score}%` }}
                      >
                        <div className="text-xs text-white text-center mt-1">{score}%</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5 tests ago</span>
                    <span>Latest</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-brand-purple" />
                  Strengths & Weaknesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-red-600 mb-2">Areas for Improvement</h4>
                  <div className="space-y-2">
                    {subject.weakAreas.map((area, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">Strong Areas</h4>
                  <div className="space-y-2">
                    {subject.strongAreas.map((area, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    asChild
                    className="w-full bg-brand-purple hover:bg-purple-700"
                  >
                    <Link to={`/subjects/${subjectId}/improve`}>
                      View Detailed Improvement Plan
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="mr-2 h-5 w-5 text-brand-purple" />
                Recommended Improvement Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subject.recommendations.map((rec, i) => (
                  <div key={i} className={`border rounded-lg p-4 hover:shadow-md transition`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{rec.type}</span>
                    </div>
                    <h3 className="font-medium mb-3">{rec.title}</h3>
                    <div className="flex justify-end">
                      <Link 
                        to={`/${rec.type.toLowerCase()}s`} 
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Start {rec.type}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button 
                  asChild
                  className="bg-brand-purple hover:bg-purple-700"
                >
                  <Link to={`/subjects/${subjectId}/improve`}>
                    See Full Improvement Plan
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice">
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-brand-purple" />
                  Practice Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sampleQuestions.map((question, index) => (
                    <QuizQuestion 
                      key={index}
                      question={question}
                      onAnswer={() => {}}
                      showExplanation={true}
                    />
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button 
                    asChild
                    className="bg-brand-purple hover:bg-purple-700"
                  >
                    <Link to="/practice">See More Practice Questions</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{subject.name} Chapter Test</h3>
                      <span className="text-xs px-2 py-1 bg-easy text-green-800 rounded-full">Easy</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">20 questions covering fundamentals of {subject.name.toLowerCase()}</p>
                    <div className="flex justify-end">
                      <Link 
                        to="/tests" 
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Start Test
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Advanced {subject.name} Test</h3>
                      <span className="text-xs px-2 py-1 bg-hard text-red-800 rounded-full">Hard</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">15 challenging questions to test your advanced knowledge</p>
                    <div className="flex justify-end">
                      <Link 
                        to="/tests" 
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Start Test
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Quick {subject.name} Revision</h3>
                      <span className="text-xs px-2 py-1 bg-medium text-orange-800 rounded-full">Medium</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">10-minute quiz to test your core concepts</p>
                    <div className="flex justify-end">
                      <Link 
                        to="/quizzes" 
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Start Quiz
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{subject.weakAreas[0]} Focus Quiz</h3>
                      <span className="text-xs px-2 py-1 bg-medium text-orange-800 rounded-full">Medium</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">5-minute quiz focusing on your weak area: {subject.weakAreas[0]}</p>
                    <div className="flex justify-end">
                      <Link 
                        to="/quizzes" 
                        className="text-sm text-brand-purple hover:underline flex items-center"
                      >
                        Start Quiz
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h3 className="text-lg font-medium text-gray-700">Questions Attempted</h3>
                  <p className="text-3xl font-bold text-brand-purple">287</p>
                  <p className="text-sm text-gray-500">Total questions in {subject.name}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h3 className="text-lg font-medium text-gray-700">Accuracy</h3>
                  <p className="text-3xl font-bold text-green-600">{subject.progress}%</p>
                  <p className="text-sm text-gray-500">In correct answers</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h3 className="text-lg font-medium text-gray-700">Average Time</h3>
                  <p className="text-3xl font-bold text-orange-600">45s</p>
                  <p className="text-sm text-gray-500">Per question</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Topic-wise Performance</h3>
                <div className="space-y-4">
                  {[...subject.strongAreas, ...subject.weakAreas].map((topic, i) => {
                    const score = subject.strongAreas.includes(topic) ? 
                      Math.floor(Math.random() * 20) + 75 : 
                      Math.floor(Math.random() * 20) + 40;
                    
                    return (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{topic}</span>
                          <span className="text-sm font-medium">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SubjectDetail;
