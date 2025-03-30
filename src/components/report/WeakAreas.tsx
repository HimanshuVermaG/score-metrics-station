
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowRight, BookOpen, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeakArea {
  id: number;
  subject: string;
  topic: string;
  accuracy: number;
  recommendedResources: {
    title: string;
    link: string;
  }[];
}

interface WeakAreasProps {
  weakAreas: WeakArea[];
}

const WeakAreas: React.FC<WeakAreasProps> = ({ weakAreas }) => {
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy < 50) return 'bg-red-100 text-red-700';
    if (accuracy < 70) return 'bg-amber-100 text-amber-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Target className="h-5 w-5 text-brand-purple" />
          Areas for Improvement
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {weakAreas.map((area) => (
            <div key={area.id} className="border rounded-lg p-4 transition-all hover:shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{area.subject}: {area.topic}</h3>
                  <div className="flex items-center mt-1">
                    <Badge 
                      variant="outline" 
                      className={getAccuracyColor(area.accuracy)}
                    >
                      Accuracy: {area.accuracy}%
                    </Badge>
                  </div>
                </div>
                <Link to={`/subjects/${area.subject.toLowerCase()}/improve`}>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-brand-purple border-brand-purple hover:bg-brand-purple/10"
                  >
                    Improve
                  </Button>
                </Link>
              </div>
              
              {area.recommendedResources.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-brand-purple" />
                    Recommended Resources
                  </h4>
                  <div className="space-y-2">
                    {area.recommendedResources.map((resource, index) => (
                      <Link 
                        key={index} 
                        to={resource.link} 
                        className="flex justify-between items-center p-2 rounded-md border hover:bg-gray-50 transition-all"
                      >
                        <span className="text-sm text-brand-purple">{resource.title}</span>
                        <ArrowRight className="h-4 w-4 text-brand-purple" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeakAreas;
