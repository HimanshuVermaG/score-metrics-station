
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';
import { PlanResource } from '@/types/improvement-plan';
import ResourceItem from './ResourceItem';
import { Button } from '@/components/ui/button';

interface MilestoneProps {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dueDate: string;
  resources: PlanResource[];
}

const PlanMilestone: React.FC<MilestoneProps> = ({
  id,
  title,
  description,
  status,
  dueDate,
  resources
}) => {
  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'upcoming': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className={`border-l-4 ${
      status === 'completed' ? 'border-l-green-500' : 
      status === 'in-progress' ? 'border-l-blue-500' : 'border-l-gray-300'
    }`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge className={getMilestoneStatusColor(status)}>
            {status === 'in-progress' ? 'In Progress' : 
             status === 'completed' ? 'Completed' : 'Upcoming'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <Clock className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">Due: {dueDate}</span>
        </div>
        
        <p className="text-sm font-medium mb-2">Resources:</p>
        <div className="space-y-3">
          {resources.map((resource) => (
            <ResourceItem key={resource.id} resource={resource} />
          ))}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" asChild>
            <Link to={`/milestone/${id}`}>
              View Milestone Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanMilestone;
