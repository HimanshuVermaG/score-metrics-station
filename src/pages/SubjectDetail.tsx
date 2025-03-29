
import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Book, BookOpen, FileText, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const SubjectDetail = () => {
  const { subjectId } = useParams();
  
  // Mock data (in a real app, this would come from an API)
  const subjectData = {
    math: {
      name: 'Mathematics',
      score: 85,
      icon: <Book className="h-5 w-5 text-green-500" />,
      weakAreas: [
        { topic: 'Geometry', accuracy: 65, link: '/practice/math/geometry' },
        { topic: 'Fractions', accuracy: 70, link: '/practice/math/fractions' }
      ],
      recommendedTests: [
        { title: 'Algebra Test', difficulty: 'Medium', link: '/tests/math/algebra' },
        { title: 'Geometry Quiz', difficulty: 'Hard', link: '/quizzes/math/geometry' }
      ],
      recentScores: [90, 85, 80, 88, 85]
    },
    english: {
      name: 'English',
      score: 70,
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      weakAreas: [
        { topic: 'Grammar', accuracy: 55, link: '/practice/english/grammar' },
        { topic: 'Vocabulary', accuracy: 60, link: '/practice/english/vocabulary' }
      ],
      recommendedTests: [
        { title: 'Grammar Test', difficulty: 'Medium', link: '/tests/english/grammar' },
        { title: 'Reading Comprehension', difficulty: 'Hard', link: '/tests/english/comprehension' }
      ],
      recentScores: [65, 70, 75, 68, 70]
    },
    hindi: {
      name: 'Hindi',
      score: 65,
      icon: <BookOpen className="h-5 w-5 text-yellow-500" />,
      weakAreas: [
        { topic: 'Vocabulary', accuracy: 60, link: '/practice/hindi/vocabulary' },
        { topic: 'Grammar', accuracy: 55, link: '/practice/hindi/grammar' }
      ],
      recommendedTests: [
        { title: 'Hindi Grammar Test', difficulty: 'Medium', link: '/tests/hindi/grammar' },
        { title: 'Hindi Vocabulary Quiz', difficulty: 'Easy', link: '/quizzes/hindi/vocabulary' }
      ],
      recentScores: [60, 65, 70, 65, 65]
    },
    gs: {
      name: 'General Science',
      score: 80,
      icon: <Book className="h-5 w-5 text-purple-500" />,
      weakAreas: [
        { topic: 'Biology', accuracy: 75, link: '/practice/gs/biology' },
        { topic: 'Physics', accuracy: 70, link: '/practice/gs/physics' }
      ],
      recommendedTests: [
        { title: 'Science Quiz', difficulty: 'Medium', link: '/quizzes/gs/science' },
        { title: 'Biology Test', difficulty: 'Hard', link: '/tests/gs/biology' }
      ],
      recentScores: [75, 80, 85, 78, 80]
    }
  };
  
  const subject = subjectData[subjectId as keyof typeof subjectData];
  
  if (!subject) {
    return (
      <PageContainer>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-2">Subject Not Found</h1>
          <p className="mb-4">The subject you're looking for doesn't exist.</p>
          <Link to="/" className="text-brand-purple hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </PageContainer>
    );
  }
  
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-easy text-green-800';
      case 'Medium':
        return 'bg-medium text-orange-800';
      case 'Hard':
        return 'bg-hard text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="mr-2">{subject.icon}</span>
          {subject.name}
        </h1>
        <p className="text-gray-500">Current Performance: {subject.score}%</p>
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weakAreas">Weak Areas</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Tests</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-medium mb-4">Performance Summary</h2>
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <div className="text-3xl font-bold">{subject.score}%</div>
                <div className="text-sm text-gray-500">Overall Score</div>
              </div>
              <div className="flex-1">
                <Progress value={subject.score} className="h-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-lg font-medium">{subject.weakAreas.length}</div>
                <div className="text-sm text-gray-500">Weak Areas</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-lg font-medium">{subject.recommendedTests.length}</div>
                <div className="text-sm text-gray-500">Recommended Tests</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-lg font-medium">
                  {subject.recentScores[subject.recentScores.length - 1] > subject.recentScores[0] ? (
                    <span className="text-green-500">↑</span>
                  ) : (
                    <span className="text-red-500">↓</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">Trend</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-lg font-medium mb-4">Recent Performance</h2>
              <div className="flex justify-between items-end h-40">
                {subject.recentScores.map((score, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-brand-purple rounded-t-sm"
                      style={{ height: `${score}%` }}
                    ></div>
                    <div className="text-xs mt-2">Test {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link 
                  to={`/practice/${subjectId}`} 
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span>Practice Questions</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
                <Link 
                  to={`/tests/subject/${subjectId}`} 
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span>Take a Test</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
                <Link 
                  to={`/report/subject/${subjectId}`} 
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span>Detailed Report</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="weakAreas">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Weak Areas</h2>
              <p className="text-sm text-gray-500">Topics that need improvement</p>
            </div>
            
            <div className="divide-y">
              {subject.weakAreas.map((area, index) => (
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{area.topic}</h3>
                      <p className="text-sm text-gray-500">Accuracy: {area.accuracy}%</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      area.accuracy >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {area.accuracy >= 70 ? 'Needs Practice' : 'Needs Work'}
                    </span>
                  </div>
                  <Link 
                    to={area.link} 
                    className="text-sm text-brand-purple hover:underline flex items-center"
                  >
                    Practice Now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subject.recommendedTests.map((test, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyClass(test.difficulty)}`}>
                    {test.difficulty}
                  </span>
                </div>
                <h3 className="font-medium mb-4">{test.title}</h3>
                <Link 
                  to={test.link} 
                  className="text-sm text-brand-purple hover:underline flex items-center"
                >
                  Start Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="progress">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-medium mb-4">Progress Over Time</h2>
            <div className="h-64 flex items-end">
              {/* Simple progress visualization */}
              <div className="w-full h-full flex items-end justify-between">
                {subject.recentScores.map((score, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-16 bg-brand-purple rounded-t-sm"
                      style={{ height: `${score}%` }}
                    ></div>
                    <div className="text-sm mt-2">Test {index + 1}</div>
                    <div className="text-xs text-gray-500">{score}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-2">Performance Analysis</h3>
              <p className="text-sm text-gray-600">
                {subject.recentScores[subject.recentScores.length - 1] > subject.recentScores[0]
                  ? `Your performance in ${subject.name} is improving. Continue your current study methods.`
                  : `You need to focus more on ${subject.name}. Try different study techniques.`
                }
              </p>
              
              <div className="mt-4">
                <Link 
                  to={`/report/subject/${subjectId}`} 
                  className="text-brand-purple hover:underline flex items-center text-sm"
                >
                  View Detailed Analytics
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SubjectDetail;
