
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Award, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { getTestQuestions } from '@/data/questions';
import QuizQuestion from '@/components/quiz/QuizQuestion';

const SubjectImprovement = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  
  // Get sample questions for this subject
  const sampleQuestions = getTestQuestions(subjectId || 'Math', 2);
  
  // Mock data for the subject improvement page
  const subjectData = {
    Math: {
      name: 'Mathematics',
      weakAreas: [
        { topic: 'Geometry', score: 45, description: 'Difficulty with spatial reasoning and formulas' },
        { topic: 'Trigonometry', score: 52, description: 'Struggles with trigonometric identities' },
      ],
      recommendedResources: [
        { id: 1, title: 'Geometry Interactive Practice', type: 'practice', difficulty: 'Medium', estimatedTime: '20 mins' },
        { id: 2, title: 'Trigonometric Functions Quiz', type: 'quiz', difficulty: 'Hard', estimatedTime: '15 mins' },
        { id: 3, title: 'Fundamental Geometry Test', type: 'test', difficulty: 'Medium', estimatedTime: '40 mins' },
      ],
      completedItems: [
        { id: 1, title: 'Basic Algebra Quiz', type: 'quiz', score: 75, date: '2 days ago' },
        { id: 2, title: 'Number Theory Practice', type: 'practice', score: 82, date: '5 days ago' },
      ]
    },
    English: {
      name: 'English',
      weakAreas: [
        { topic: 'Grammar', score: 58, description: 'Issues with advanced grammar rules' },
        { topic: 'Vocabulary', score: 62, description: 'Limited vocabulary range in writing' },
      ],
      recommendedResources: [
        { id: 1, title: 'Grammar Essentials', type: 'practice', difficulty: 'Medium', estimatedTime: '25 mins' },
        { id: 2, title: 'Vocabulary Builder Quiz', type: 'quiz', difficulty: 'Medium', estimatedTime: '15 mins' },
        { id: 3, title: 'Comprehensive Grammar Test', type: 'test', difficulty: 'Hard', estimatedTime: '45 mins' },
      ],
      completedItems: [
        { id: 1, title: 'Reading Comprehension', type: 'practice', score: 70, date: '3 days ago' },
        { id: 2, title: 'Writing Skills Assessment', type: 'test', score: 65, date: '1 week ago' },
      ]
    },
    Hindi: {
      name: 'Hindi',
      weakAreas: [
        { topic: 'Grammar', score: 60, description: 'Challenges with complex sentence structures' },
        { topic: 'Literature', score: 55, description: 'Limited understanding of literary devices' },
      ],
      recommendedResources: [
        { id: 1, title: 'Hindi Grammar Practice', type: 'practice', difficulty: 'Easy', estimatedTime: '20 mins' },
        { id: 2, title: 'Hindi Literature Quiz', type: 'quiz', difficulty: 'Medium', estimatedTime: '15 mins' },
        { id: 3, title: 'Comprehensive Hindi Test', type: 'test', difficulty: 'Medium', estimatedTime: '30 mins' },
      ],
      completedItems: [
        { id: 1, title: 'Vocabulary Practice', type: 'practice', score: 75, date: '4 days ago' },
        { id: 2, title: 'Reading Assessment', type: 'quiz', score: 68, date: '1 week ago' },
      ]
    },
    GS: {
      name: 'General Studies',
      weakAreas: [
        { topic: 'Current Affairs', score: 58, description: 'Gaps in knowledge of recent events' },
        { topic: 'Science', score: 62, description: 'Weak understanding of scientific concepts' },
      ],
      recommendedResources: [
        { id: 1, title: 'Current Affairs Quiz', type: 'quiz', difficulty: 'Medium', estimatedTime: '15 mins' },
        { id: 2, title: 'Science Fundamentals', type: 'practice', difficulty: 'Medium', estimatedTime: '25 mins' },
        { id: 3, title: 'Comprehensive GS Test', type: 'test', difficulty: 'Hard', estimatedTime: '40 mins' },
      ],
      completedItems: [
        { id: 1, title: 'History Timeline Practice', type: 'practice', score: 72, date: '2 days ago' },
        { id: 2, title: 'Geography Quiz', type: 'quiz', score: 80, date: '6 days ago' },
      ]
    }
  };

  // Find the correct subject, fall back to Math if not found
  const subject = (subjectData as any)[subjectId || 'Math'] || subjectData.Math;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'test': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <Play className="h-4 w-4" />;
      case 'practice': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{subject.name} Improvement Plan</h1>
          <p className="text-gray-500">Focused resources to boost your performance</p>
        </div>
        <Button 
          variant="outline" 
          asChild
          className="flex items-center"
        >
          <Link to={`/subjects/${subjectId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Subject
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {subject.weakAreas.map((area: any, index: number) => (
          <Card key={index} className="border-none shadow-md bg-gradient-to-br from-red-50 to-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                {area.topic}
              </CardTitle>
              <div className="mt-1">
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  {area.score}% Score
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">{area.description}</p>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">Current Level</span>
                  <span className="text-xs text-gray-500">Target: 80%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${area.score}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="border-none shadow-md mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-purple" />
            Recommended Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subject.recommendedResources.map((resource: any) => (
              <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{resource.title}</h3>
                  <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Clock className="h-3 w-3" />
                  <span>{resource.estimatedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-100">
                    {getTypeIcon(resource.type)}
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-brand-purple hover:bg-purple-700"
                    asChild
                  >
                    <Link to={`/${resource.type}s/start/1`}>
                      Start
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Recently Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subject.completedItems.map((item: any) => (
                <div key={item.id} className="border rounded-lg p-3 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="outline" className="flex items-center gap-1 bg-gray-100">
                          {getTypeIcon(item.type)}
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500">
                      {item.score}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-brand-purple" />
              Practice Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleQuestions.map((question, index) => (
                <QuizQuestion 
                  key={index}
                  question={question}
                  onAnswer={() => {}}
                  showExplanation={true}
                />
              ))}
              
              <div className="flex justify-center mt-4">
                <Button 
                  className="bg-brand-purple hover:bg-purple-700"
                  asChild
                >
                  <Link to={`/practice/${subjectId?.toLowerCase()}/1`}>
                    See More Practice Questions
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SubjectImprovement;
