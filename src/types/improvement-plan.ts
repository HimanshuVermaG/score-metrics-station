
export interface PlanResource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'interactive';
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed?: boolean;
  link: string;
}

export interface MilestoneType {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dueDate: string;
  resources: PlanResource[];
}

export interface ImprovementPlan {
  id: string;
  title: string;
  subject: string;
  startDate: string;
  endDate: string;
  progress: number;
  weakAreas: string[];
  overview: string;
  milestones: MilestoneType[];
}
