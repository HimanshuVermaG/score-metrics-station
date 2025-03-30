
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { getTestQuestions } from '@/data/questionSets';
import { ArrowLeft, Lightbulb, BookOpen } from 'lucide-react';
import { subjectTopics } from '@/data/questionSets';

const PracticePage = () => {
  const { subject, topicId } = useParams<{ subject: string; topicId: string }>();
  
  // Find the topic data
  const topicData = subject && topicId ? (subjectTopics as any)[subject]?.[topicId] : null;
  
  if (!topicData) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Practice Topic Not Found</h1>
          <p className="text-gray-500 mb-6">The practice topic you're looking for doesn't exist.</p>
          <Button asChild className="bg-brand-purple hover:bg-purple-700">
            <Link to="/practice">Back to Practice</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  // Get practice questions
  const questions = getTestQuestions(topicData.subject, 5);

  return (
    <PageContainer>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{topicData.title} Practice</h1>
          <p className="text-gray-500">{topicData.description}</p>
        </div>
        <Button 
          variant="outline" 
          asChild
          className="flex items-center"
        >
          <Link to="/practice">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practice
          </Link>
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-brand-purple" />
            Practice Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">• Take your time with each question. Practice is about learning, not speed.</p>
            <p className="text-sm">• Read the explanations carefully to understand the concepts better.</p>
            <p className="text-sm">• If you get a question wrong, try to understand why before moving to the next one.</p>
            <p className="text-sm">• Revisit these questions regularly to reinforce your learning.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-brand-purple" />
            Practice Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {questions.map((question, index) => (
              <QuizQuestion 
                key={index}
                question={question}
                onAnswer={() => {}}
                showExplanation={true}
              />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            <Button 
              variant="outline"
              asChild
            >
              <Link to="/practice">
                Back to Practice Topics
              </Link>
            </Button>
            <Button 
              className="bg-brand-purple hover:bg-purple-700"
              asChild
            >
              <Link to={`/subjects/${subject}`}>
                View Subject Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default PracticePage;
