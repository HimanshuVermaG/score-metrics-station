
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertCircle, BookOpen, Award, Brain, FileText } from 'lucide-react';

interface RecommendationItem {
  id: string;
  title: string;
  subject: string;
  type: 'test' | 'quiz' | 'practice';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  link: string;
  urgent?: boolean;
}

interface WeakArea {
  subject: string;
  topic: string;
  score: number;
}

interface ImprovementRecommendationsProps {
  weakAreas: WeakArea[];
  recommendations: RecommendationItem[];
}

const ImprovementRecommendations: React.FC<ImprovementRecommendationsProps> = ({ 
  weakAreas, 
  recommendations 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-easy text-green-800';
      case 'Medium': return 'bg-medium text-orange-800';
      case 'Hard': return 'bg-hard text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'test': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <Brain className="h-4 w-4" />;
      case 'practice': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  // Extract the resource ID from the link
  const getResourceId = (link: string) => {
    // Get the last part of the URL after the last '/'
    const parts = link.split('/');
    return parts[parts.length - 1];
  };

  return (
    <Card className="border-none shadow-md mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-brand-purple" />
            Personalized Improvement Plan
          </CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link to="/improvement-plan/math">
              View Full Plan <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {weakAreas.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-gray-600">Areas Needing Attention</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {weakAreas.map((area, i) => (
                <Link key={i} to={`/subjects/${area.subject.toLowerCase()}`}>
                  <Badge 
                    variant="outline" 
                    className="px-3 py-1 border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    {area.subject}: {area.topic} ({area.score}%)
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="border rounded-lg p-4 transition-all hover:shadow-md relative overflow-hidden"
            >
              {rec.urgent && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-red-500 text-white rounded-tl-none rounded-br-none">
                    Priority
                  </Badge>
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{rec.title}</h3>
                <div className="flex gap-1">
                  <Badge 
                    variant="outline" 
                    className={`${getDifficultyColor(rec.difficulty)}`}
                  >
                    {rec.difficulty}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 bg-gray-100"
                  >
                    {getTypeIcon(rec.type)}
                    {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  {rec.subject}
                </Badge>
                <Link 
                  to={rec.type === 'practice' ? `/resources/${getResourceId(rec.link)}` : rec.link}
                  className="text-sm text-brand-purple hover:underline flex items-center"
                >
                  Start now
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovementRecommendations;
