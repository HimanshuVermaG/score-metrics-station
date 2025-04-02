
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, BookOpen, Brain, Award, FileText } from 'lucide-react';
import { PlanResource } from '@/types/improvement-plan';

interface ResourceItemProps {
  resource: PlanResource;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ resource }) => {
  // Get the resource icon based on its type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <Brain className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'interactive': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${
          resource.type === 'video' ? 'bg-blue-100' : 
          resource.type === 'quiz' ? 'bg-purple-100' : 
          resource.type === 'interactive' ? 'bg-amber-100' : 'bg-green-100'
        } mr-3`}>
          {getResourceIcon(resource.type)}
        </div>
        <div>
          <p className="font-medium text-sm">{resource.title}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="mr-3">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
            <span className="mr-3">{resource.duration}</span>
            <Badge variant="outline" className={`
              ${resource.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                resource.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                'bg-red-50 text-red-700 border-red-200'}
            `}>
              {resource.difficulty}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {resource.completed ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mr-3">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        ) : null}
        <Button size="sm" variant="outline" asChild>
          <Link to={resource.link}>
            Start
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ResourceItem;
