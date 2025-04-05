import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { getTestQuestions } from '@/data/questionSets';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { BookOpen, Award, BarChart2, Brain, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ChartContainer } from '@/components/ui/chart';

const SubjectImprovement = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  const subjectDetails = {
    Math: {
      name: 'Mathematics',
      weakAreas: ['Algebra', 'Geometry', 'Fractions', 'Word Problems'],
      strongAreas: ['Calculus', 'Statistics', 'Basic Math'],
      improvementPlan: [
        { id: 1, title: 'Algebra Practice', description: 'Focus on solving equations and inequalities.', difficulty: 'Medium', type: 'practice' },
        { id: 2, title: 'Geometry Basics', description: 'Review basic geometric principles and theorems.', difficulty: 'Hard', type: 'quiz' },
        { id: 3, title: 'Calculus Advanced', description: 'Practice differentiation and integration.', difficulty: 'Easy', type: 'test' },
        { id: 4, title: 'Fractions Mastery', description: 'Learn to add, subtract, multiply and divide fractions.', difficulty: 'Medium', type: 'practice' },
        { id: 5, title: 'Word Problems Challenge', description: 'Practice solving word problems step by step.', difficulty: 'Hard', type: 'quiz' },
      ],
    },
    English: {
      name: 'English',
      weakAreas: ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Writing'],
      strongAreas: ['Reading', 'Writing Essays', 'Spelling'],
      improvementPlan: [
        { id: 1, title: 'Grammar Exercises', description: 'Practice sentence structure and verb tenses.', difficulty: 'Medium', type: 'practice' },
        { id: 2, title: 'Vocabulary Building', description: 'Learn new words and their usage.', difficulty: 'Easy', type: 'quiz' },
        { id: 3, title: 'Reading Comprehension', description: 'Improve understanding of complex texts.', difficulty: 'Hard', type: 'test' },
        { id: 4, title: 'Writing Workshop', description: 'Practice writing short essays and paragraphs.', difficulty: 'Medium', type: 'practice' },
        { id: 5, title: 'Spelling Challenge', description: 'Master common spelling rules and exceptions.', difficulty: 'Easy', type: 'quiz' },
      ],
    },
    Hindi: {
      name: 'Hindi',
      weakAreas: ['Grammar', 'Vocabulary', 'Reading', 'Writing'],
      strongAreas: ['Reading', 'Writing', 'Speaking'],
      improvementPlan: [
        { id: 1, title: 'Hindi Grammar Exercises', description: 'अभ्यास करें वाक्य संरचना और क्रिया काल।', difficulty: 'Medium', type: 'practice' },
        { id: 2, title: 'Hindi Vocabulary Building', description: 'नए शब्द सीखें और उनका उपयोग करें।', difficulty: 'Easy', type: 'quiz' },
        { id: 3, title: 'Hindi Reading Practice', description: 'पाठ्य सामग्री को पढ़ने और समझने का अभ्यास करें।', difficulty: 'Hard', type: 'test' },
        { id: 4, title: 'Hindi Writing Workshop', description: 'छोटे निबंध और अनुच्छेद लिखने का अभ्यास करें।', difficulty: 'Medium', type: 'practice' },
        { id: 5, title: 'Hindi Speaking Challenge', description: 'बोलने के कौशल को सुधारने के लिए अभ्यास करें।', difficulty: 'Easy', type: 'quiz' },
      ],
    },
    GS: {
      name: 'General Studies',
      weakAreas: ['History', 'Geography', 'Science', 'Current Affairs'],
      strongAreas: ['Science', 'Current Affairs', 'Civics'],
      improvementPlan: [
        { id: 1, title: 'History Review', description: 'Study key historical events and figures.', difficulty: 'Hard', type: 'practice' },
        { id: 2, title: 'Geography Basics', description: 'Learn about world geography and climates.', difficulty: 'Medium', type: 'quiz' },
        { id: 3, title: 'Science Fundamentals', description: 'Review basic scientific concepts and principles.', difficulty: 'Easy', type: 'test' },
        { id: 4, title: 'Current Affairs Quiz', description: 'Stay updated on recent national and global events.', difficulty: 'Medium', type: 'quiz' },
        { id: 5, title: 'Civics Study Guide', description: 'Learn about government structures and civic duties.', difficulty: 'Hard', type: 'practice' },
      ],
    },
  };

  const subject = (subjectDetails as any)[subjectId || 'Math'] || subjectDetails.Math;
  const sampleQuestions = getTestQuestions(subjectId || 'Math', 3);

  // Helper functions for rendering
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'test': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <Brain className="h-4 w-4" />;
      case 'practice': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <PageContainer>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Improve Your {subject.name} Skills</h1>
          <p className="text-gray-500">Personalized plan to strengthen your weak areas.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
          <Link to={`/improvement-plan/${subjectId?.toLowerCase() || 'math'}`}>
            View Full Improvement Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="weaknesses" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
          <TabsTrigger value="plan">Improvement Plan</TabsTrigger>
          <TabsTrigger value="practice">Practice Questions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="weaknesses">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Identified Weak Areas</CardTitle>
              <CardDescription>
                Based on your recent performance, we've identified these areas that need improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject.weakAreas.map((area, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h3 className="font-medium mb-2">{area}</h3>
                    <Progress value={(100 - (index * 10) - Math.floor(Math.random() * 20))} className="mb-3 h-2" />
                    <p className="text-sm text-gray-600">
                      {index === 0 ? 'This is your weakest area. Focus on improving this first.' : 
                       index === 1 ? 'Needs significant improvement.' : 
                       'Requires additional practice to master.'}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personalized Improvement Plan</CardTitle>
              <CardDescription>Follow these resources to strengthen your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subject.improvementPlan.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex gap-1">
                        <Badge 
                          variant="outline" 
                          className={getDifficultyColor(item.difficulty)}
                        >
                          {item.difficulty}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="flex items-center gap-1 bg-gray-100"
                        >
                          {getTypeIcon(item.type)}
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex justify-end">
                      <Button asChild variant="outline">
                        <Link to="/practice">
                          Start Practice
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Practice Questions</CardTitle>
              <CardDescription>Try these sample questions to test your knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sampleQuestions.map((question, index) => (
                  <QuizQuestion
                    key={index}
                    question={question}
                    onAnswer={() => { }}
                    showExplanation={true}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                <Link to={`/practice/${subjectId?.toLowerCase() || 'math'}`}>
                  View More Practice Questions
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Analytics</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Weak vs. Strong Areas</h3>
                  <div className="h-60 border rounded-md p-4 flex flex-col items-center justify-center bg-gray-50">
                    <BarChart2 className="h-24 w-24 text-gray-300 mb-2" />
                    <p className="text-gray-500 text-center">Analytics visualization for weak vs. strong areas</p>
                    <p className="text-xs text-gray-400 mt-2">Data includes scores for all subject areas</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Improvement Trends</h3>
                  <div className="h-60 border rounded-md p-4 flex flex-col items-center justify-center bg-gray-50">
                    <BarChart2 className="h-24 w-24 text-gray-300 mb-2" />
                    <p className="text-gray-500 text-center">Improvement trends over the last 6 months</p>
                    <p className="text-xs text-gray-400 mt-2">Shows progress in all subject areas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="pt-4 flex justify-between items-center">
          <Button asChild variant="outline">
            <Link to={`/subjects/${subjectId}`}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Back to {subject.name} Details
            </Link>
          </Button>
          
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link to={`/improvement-plan/${subjectId?.toLowerCase() || 'math'}`}>
              View Complete Improvement Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default SubjectImprovement;
