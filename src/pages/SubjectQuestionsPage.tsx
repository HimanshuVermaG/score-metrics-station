
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { getQuestionsBySubject, subjectTopics } from '@/data/questionSets';

const SubjectQuestionsPage = () => {
  const { subject } = useParams<{ subject: string }>();
  const formattedSubject = subject === 'gs' ? 'G.S.' : subject?.[0]?.toUpperCase() + subject?.slice(1);
  
  // Get questions for the subject
  const questions = getQuestionsBySubject(formattedSubject || '');
  
  // Get topics for the subject
  const topics = subjectTopics[subject || ''] || {};
  
  // Subject colors mapping
  const subjectColors = {
    math: 'bg-math-bg text-blue-800',
    english: 'bg-english-bg text-purple-800',
    hindi: 'bg-hindi-bg text-amber-800',
    gs: 'bg-gs-bg text-green-800'
  };
  
  // Get color for current subject
  const subjectColor = subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-100 text-gray-800';
  
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageContainer>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{formattedSubject} Question Sets</h1>
          <p className="text-gray-500">Practice questions and topic-wise sets</p>
        </div>
        <Link to="/practice">
          <Button variant="outline">Back to All Subjects</Button>
        </Link>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(topics).map(([id, topic]) => (
            <Link 
              key={id}
              to={`/practice/${subject}/${id}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <Badge className={subjectColor}>
                    {formattedSubject}
                  </Badge>
                  <h3 className="font-medium text-lg mt-2">{topic.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{topic.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {questions.filter(q => q.topic === topic.title).length} questions
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-brand-purple hover:text-purple-700 p-0"
                    >
                      Practice <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-medium mb-4">Question Sets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((setNumber) => {
            // Create different question sets based on difficulty
            const difficulty = setNumber === 1 ? 'Easy' : setNumber === 2 ? 'Medium' : 'Hard';
            const topicsList = Object.values(topics).slice(0, 3).map(t => t.title);
            const questionCount = 15 + (setNumber * 5);
            
            return (
              <Card key={setNumber} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-2 ${
                  subject === 'math' ? 'bg-blue-500' :
                  subject === 'english' ? 'bg-green-500' :
                  subject === 'hindi' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`} />
                <CardContent className="pt-5">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={subjectColor}>
                      {formattedSubject}
                    </Badge>
                    <Badge className={getDifficultyClass(difficulty)}>
                      {difficulty}
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1">
                    {formattedSubject} {difficulty} Set {setNumber}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {questionCount} questions • {setNumber * 15} min
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {topicsList.map((topic, idx) => (
                        <Badge variant="outline" key={idx} className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {setNumber * 15} min
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-brand-purple hover:bg-purple-700"
                      asChild
                    >
                      <Link to={`/practice/${subject}/set${setNumber}`}>
                        Start Practice
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
};

export default SubjectQuestionsPage;
