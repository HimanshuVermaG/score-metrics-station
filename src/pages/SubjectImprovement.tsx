import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { getTestQuestions } from '@/data/questionSets';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { BookOpen, Award, BarChart2, CheckCircle } from 'lucide-react';

const SubjectImprovement = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  const subjectDetails = {
    Math: {
      name: 'Mathematics',
      weakAreas: ['Algebra', 'Geometry'],
      strongAreas: ['Calculus', 'Statistics'],
      improvementPlan: [
        { id: 1, title: 'Algebra Practice', description: 'Focus on solving equations and inequalities.' },
        { id: 2, title: 'Geometry Basics', description: 'Review basic geometric principles and theorems.' },
        { id: 3, title: 'Calculus Advanced', description: 'Practice differentiation and integration.' },
      ],
    },
    English: {
      name: 'English',
      weakAreas: ['Grammar', 'Vocabulary'],
      strongAreas: ['Reading', 'Writing'],
      improvementPlan: [
        { id: 1, title: 'Grammar Exercises', description: 'Practice sentence structure and verb tenses.' },
        { id: 2, title: 'Vocabulary Building', description: 'Learn new words and their usage.' },
        { id: 3, title: 'Reading Comprehension', description: 'Improve understanding of complex texts.' },
      ],
    },
    Hindi: {
      name: 'Hindi',
      weakAreas: ['Grammar', 'Vocabulary'],
      strongAreas: ['Reading', 'Writing'],
      improvementPlan: [
        { id: 1, title: 'Hindi Grammar Exercises', description: 'अभ्यास करें वाक्य संरचना और क्रिया काल।' },
        { id: 2, title: 'Hindi Vocabulary Building', description: 'नए शब्द सीखें और उनका उपयोग करें।' },
      ],
    },
    GS: {
      name: 'General Studies',
      weakAreas: ['History', 'Geography'],
      strongAreas: ['Science', 'Current Affairs'],
      improvementPlan: [
        { id: 1, title: 'History Review', description: 'Study key historical events and figures.' },
        { id: 2, title: 'Geography Basics', description: 'Learn about world geography and climates.' },
      ],
    },
  };

  const subject = (subjectDetails as any)[subjectId || 'Math'] || subjectDetails.Math;
  const sampleQuestions = getTestQuestions(subjectId || 'Math', 2);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Improve Your {subject.name} Skills</h1>
        <p className="text-gray-500">Personalized plan to strengthen your weak areas.</p>
      </div>

      <Tabs defaultValue="weaknesses" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
          <TabsTrigger value="plan">Improvement Plan</TabsTrigger>
          <TabsTrigger value="practice">Practice Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="weaknesses">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Identified Weak Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {subject.weakAreas.map((area, index) => (
                  <li key={index} className="text-gray-700">{area}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personalized Improvement Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subject.improvementPlan.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <Button asChild variant="outline" className="mt-2">
                      <Link to="/practice">Start Practice</Link>
                    </Button>
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
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent>
          <Button asChild>
            <Link to={`/subjects/${subjectId}`}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Back to {subject.name} Details
            </Link>
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default SubjectImprovement;
