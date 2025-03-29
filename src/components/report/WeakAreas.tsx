
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';

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
    if (accuracy < 50) return 'bg-red-500';
    if (accuracy < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <Card className="border-none shadow-md bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-bold">Areas for Improvement</h2>
        </div>
        <p className="text-sm text-gray-600">Focus on these topics to improve your overall performance</p>
      </div>
      
      <CardContent className="p-5">
        <div className="space-y-6">
          {weakAreas.map((area) => (
            <div key={area.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{area.subject}: {area.topic}</h3>
                  <div className="flex items-center mt-1">
                    <Badge 
                      variant="outline" 
                      className="bg-red-100 text-red-700 border-red-200"
                    >
                      Needs improvement
                    </Badge>
                  </div>
                </div>
                <Link to={`/subjects/${area.subject.toLowerCase()}/improve`}>
                  <Badge className="cursor-pointer bg-brand-purple hover:bg-purple-700">
                    Improve Now
                  </Badge>
                </Link>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Current Accuracy</span>
                  <span className="text-sm">{area.accuracy}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getAccuracyColor(area.accuracy)} rounded-full`}
                    style={{ width: `${area.accuracy}%` }}
                  ></div>
                </div>
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
