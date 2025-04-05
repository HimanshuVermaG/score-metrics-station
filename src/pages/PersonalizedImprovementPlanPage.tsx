
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ChevronRight, Target, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import PlanMilestone from '@/components/improvement/PlanMilestone';
import { ImprovementPlan } from '@/types/improvement-plan';

// Sample data for improvement plans
const improvementPlans = {
  math: {
    id: "math",
    title: "Mathematics Improvement Plan",
    subject: "Math",
    startDate: "May 15, 2023",
    endDate: "July 15, 2023",
    progress: 35,
    weakAreas: ["Algebra", "Geometry", "Fractions"],
    overview: "This personalized plan focuses on improving your mathematical skills, with emphasis on algebraic expressions, geometric principles, and fraction operations.",
    milestones: [
      {
        id: "1",
        title: "Master Algebra Fundamentals",
        description: "Build a strong foundation in algebraic concepts and expressions",
        status: "in-progress",
        dueDate: "June 1, 2023",
        resources: [
          {
            id: "r1",
            title: "Algebraic Expressions and Equations",
            type: "video",
            duration: "25 min",
            difficulty: "Medium",
            completed: true,
            link: "/improvement-plan/math/resource/r1"
          },
          {
            id: "r2",
            title: "Practice with Linear Equations",
            type: "interactive",
            duration: "45 min",
            difficulty: "Medium",
            completed: false,
            link: "/improvement-plan/math/resource/r2"
          },
          {
            id: "r3",
            title: "Algebraic Expressions Quiz",
            type: "quiz",
            duration: "20 min",
            difficulty: "Hard",
            completed: false,
            link: "/improvement-plan/math/resource/r3"
          }
        ]
      },
      {
        id: "2",
        title: "Advanced Geometry Concepts",
        description: "Learn about geometric shapes, theorems, and spatial reasoning",
        status: "upcoming",
        dueDate: "June 15, 2023",
        resources: [
          {
            id: "r4",
            title: "Introduction to Geometric Principles",
            type: "video",
            duration: "30 min",
            difficulty: "Medium",
            completed: false,
            link: "/improvement-plan/math/resource/r4"
          },
          {
            id: "r5",
            title: "Triangles and Quadrilaterals",
            type: "document",
            duration: "20 min",
            difficulty: "Easy",
            completed: false,
            link: "/improvement-plan/math/resource/r5"
          },
          {
            id: "r6",
            title: "Geometry Practice Problems",
            type: "interactive",
            duration: "40 min",
            difficulty: "Hard",
            completed: false,
            link: "/improvement-plan/math/resource/r6"
          }
        ]
      },
      {
        id: "3",
        title: "Calculus Introduction",
        description: "Introduce basic calculus concepts and applications",
        status: "upcoming",
        dueDate: "July 1, 2023",
        resources: [
          {
            id: "r7",
            title: "Limits and Continuity",
            type: "video",
            duration: "35 min",
            difficulty: "Hard",
            completed: false,
            link: "/improvement-plan/math/resource/r7"
          },
          {
            id: "r8",
            title: "Derivatives Explained",
            type: "document",
            duration: "25 min",
            difficulty: "Hard",
            completed: false,
            link: "/improvement-plan/math/resource/r8"
          },
          {
            id: "r9",
            title: "Calculus Assessment",
            type: "quiz",
            duration: "30 min",
            difficulty: "Hard",
            completed: false,
            link: "/improvement-plan/math/resource/r9"
          }
        ]
      }
    ]
  },
  english: {
    id: "english",
    title: "English Language Improvement Plan",
    subject: "English",
    startDate: "May 10, 2023",
    endDate: "July 10, 2023",
    progress: 45,
    weakAreas: ["Grammar", "Vocabulary", "Reading Comprehension"],
    overview: "This plan is designed to enhance your English language skills, focusing on grammar rules, vocabulary expansion, and reading comprehension strategies.",
    milestones: [
      {
        id: "1",
        title: "Grammar Essentials",
        description: "Master essential grammar rules and sentence structures",
        status: "completed",
        dueDate: "May 25, 2023",
        resources: [
          {
            id: "r1",
            title: "Parts of Speech",
            type: "video",
            duration: "20 min",
            difficulty: "Easy",
            completed: true,
            link: "/improvement-plan/english/resource/r1"
          },
          {
            id: "r2",
            title: "Sentence Structure Practice",
            type: "interactive",
            duration: "30 min",
            difficulty: "Medium",
            completed: true,
            link: "/improvement-plan/english/resource/r2"
          }
        ]
      },
      {
        id: "2",
        title: "Vocabulary Expansion",
        description: "Build your vocabulary with word families and context clues",
        status: "in-progress",
        dueDate: "June 15, 2023",
        resources: [
          {
            id: "r3",
            title: "Word Roots and Affixes",
            type: "document",
            duration: "25 min",
            difficulty: "Medium",
            completed: true,
            link: "/improvement-plan/english/resource/r3"
          },
          {
            id: "r4",
            title: "Vocabulary in Context",
            type: "interactive",
            duration: "35 min",
            difficulty: "Medium",
            completed: false,
            link: "/improvement-plan/english/resource/r4"
          }
        ]
      }
    ]
  },
  hindi: {
    id: "hindi",
    title: "Hindi Language Improvement Plan",
    subject: "Hindi",
    startDate: "May 5, 2023",
    endDate: "July 5, 2023",
    progress: 25,
    weakAreas: ["Grammar", "Writing Skills", "Vocabulary"],
    overview: "This plan focuses on enhancing your Hindi language proficiency by strengthening grammar, expanding vocabulary, and improving writing skills.",
    milestones: [
      {
        id: "1",
        title: "हिंदी व्याकरण (Hindi Grammar)",
        description: "Master fundamental Hindi grammar rules and sentence construction",
        status: "in-progress",
        dueDate: "May 30, 2023",
        resources: [
          {
            id: "r1",
            title: "संज्ञा और सर्वनाम (Nouns and Pronouns)",
            type: "video",
            duration: "30 min",
            difficulty: "Medium",
            completed: true,
            link: "/improvement-plan/hindi/resource/r1"
          },
          {
            id: "r2",
            title: "क्रिया और विशेषण (Verbs and Adjectives)",
            type: "interactive",
            duration: "35 min",
            difficulty: "Medium",
            completed: false,
            link: "/improvement-plan/hindi/resource/r2"
          }
        ]
      },
      {
        id: "2",
        title: "शब्दावली विकास (Vocabulary Development)",
        description: "Expand your Hindi vocabulary through various exercises",
        status: "upcoming",
        dueDate: "June 20, 2023",
        resources: [
          {
            id: "r3",
            title: "दैनिक शब्द (Daily Words)",
            type: "document",
            duration: "20 min",
            difficulty: "Easy",
            completed: false,
            link: "/improvement-plan/hindi/resource/r3"
          },
          {
            id: "r4",
            title: "मुहावरे और लोकोक्तियां (Idioms and Proverbs)",
            type: "quiz",
            duration: "25 min",
            difficulty: "Hard",
            completed: false,
            link: "/improvement-plan/hindi/resource/r4"
          }
        ]
      }
    ]
  },
  gs: {
    id: "gs",
    title: "General Studies Improvement Plan",
    subject: "G.S.",
    startDate: "May 12, 2023",
    endDate: "July 12, 2023",
    progress: 15,
    weakAreas: ["History", "Geography", "Current Affairs"],
    overview: "This comprehensive plan is designed to strengthen your knowledge in general studies, covering history, geography, and current affairs.",
    milestones: [
      {
        id: "1",
        title: "Historical Events and Figures",
        description: "Learn about key historical events and important figures",
        status: "in-progress",
        dueDate: "June 5, 2023",
        resources: [
          {
            id: "r1",
            title: "Ancient Civilizations",
            type: "video",
            duration: "40 min",
            difficulty: "Medium",
            completed: true,
            link: "/improvement-plan/gs/resource/r1"
          },
          {
            id: "r2",
            title: "Modern History Timeline",
            type: "interactive",
            duration: "30 min",
            difficulty: "Medium",
            completed: false,
            link: "/improvement-plan/gs/resource/r2"
          }
        ]
      },
      {
        id: "2",
        title: "World Geography",
        description: "Explore physical and political geography of the world",
        status: "upcoming",
        dueDate: "June 25, 2023",
        resources: [
          {
            id: "r3",
            title: "Continents and Oceans",
            type: "document",
            duration: "25 min",
            difficulty: "Easy",
            completed: false,
            link: "/improvement-plan/gs/resource/r3"
          },
          {
            id: "r4",
            title: "Climate Patterns",
            type: "quiz",
            duration: "20 min",
            difficulty: "Medium",
            completed: false,
            link: "/improvement-plan/gs/resource/r4"
          }
        ]
      }
    ]
  }
};

const PersonalizedImprovementPlanPage = () => {
  const { planId } = useParams<{ planId: string }>();
  const [plan, setPlan] = useState<ImprovementPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call to fetch the plan data
    setTimeout(() => {
      const selectedPlan = improvementPlans[planId as keyof typeof improvementPlans] || improvementPlans.math;
      setPlan(selectedPlan);
      setLoading(false);
    }, 500);
  }, [planId]);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <p>Loading improvement plan...</p>
        </div>
      </PageContainer>
    );
  }

  if (!plan) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg mb-4">Plan not found</p>
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  const totalResources = plan.milestones.reduce(
    (total, milestone) => total + milestone.resources.length, 
    0
  );
  
  const completedResources = plan.milestones.reduce(
    (total, milestone) => total + milestone.resources.filter(r => r.completed).length, 
    0
  );

  return (
    <PageContainer>
      <div className="mb-6">
        <Link 
          to={`/subjects/${plan.subject.toLowerCase()}`}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to {plan.subject}
        </Link>
        
        <h1 className="text-2xl font-bold">{plan.title}</h1>
        <p className="text-gray-500">{plan.overview}</p>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="resources">All Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Plan Progress</CardTitle>
              <CardDescription>Track your improvement journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Resources Completed</span>
                    <span className="text-sm font-medium">{completedResources}/{totalResources}</span>
                  </div>
                  <Progress 
                    value={totalResources > 0 ? (completedResources / totalResources) * 100 : 0} 
                    className="h-2" 
                  />
                </div>
                
                <div className="pt-2 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Start: {plan.startDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">End: {plan.endDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Estimated time: {plan.milestones.reduce((total, milestone) => {
                        return total + milestone.resources.reduce((acc, r) => {
                          const minutes = parseInt(r.duration.split(' ')[0]);
                          return acc + minutes;
                        }, 0);
                      }, 0)} minutes
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 text-brand-purple mr-2" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Focus areas identified for this plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.weakAreas.map((area, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{area}</h3>
                    <Progress 
                      value={100 - (index * 10) - Math.floor(Math.random() * 20)} 
                      className="h-2 mb-2" 
                    />
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 text-brand-purple mr-2" />
                Next Steps
              </CardTitle>
              <CardDescription>Recommended actions to continue your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.milestones.filter(m => m.status === 'in-progress').map(milestone => (
                  <li key={milestone.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">{milestone.title}</h3>
                      <p className="text-sm text-gray-600">Due: {milestone.dueDate}</p>
                    </div>
                    <Button asChild>
                      <Link to={`/improvement-plan/${plan.id}/milestone/${milestone.id}`}>
                        Continue
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </li>
                ))}
                
                {plan.milestones.filter(m => m.status === 'in-progress').length === 0 && (
                  <li className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">Start your first milestone</h3>
                      <p className="text-sm text-gray-600">Begin your improvement journey</p>
                    </div>
                    <Button asChild>
                      <Link to={`/improvement-plan/${plan.id}/milestone/1`}>
                        Start
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="milestones">
          <div className="space-y-6">
            {plan.milestones.map((milestone) => (
              <Link 
                key={milestone.id} 
                to={`/improvement-plan/${plan.id}/milestone/${milestone.id}`}
                className="block hover:shadow-md transition-shadow"
              >
                <PlanMilestone {...milestone} />
              </Link>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>All Learning Resources</CardTitle>
              <CardDescription>Complete these resources to improve your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {plan.milestones.map((milestone) => (
                  <div key={milestone.id} className="space-y-3">
                    <h3 className="font-medium border-b pb-2">
                      {milestone.title} 
                      <Badge className={`ml-2 ${
                        milestone.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {milestone.status === 'in-progress' ? 'In Progress' : 
                         milestone.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </Badge>
                    </h3>
                    
                    <div className="space-y-3">
                      {milestone.resources.map((resource) => (
                        <Link 
                          key={resource.id} 
                          to={`/improvement-plan/${plan.id}/resource/${resource.id}`}
                          className="block hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-full ${
                                resource.type === 'video' ? 'bg-blue-100' : 
                                resource.type === 'quiz' ? 'bg-purple-100' : 
                                resource.type === 'interactive' ? 'bg-amber-100' : 'bg-green-100'
                              } mr-3`}>
                                {resource.type === 'video' ? <PlayCircle className="h-4 w-4" /> :
                                 resource.type === 'quiz' ? <Brain className="h-4 w-4" /> :
                                 resource.type === 'interactive' ? <Award className="h-4 w-4" /> :
                                 <FileText className="h-4 w-4" />}
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
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mb-6">
        <Button asChild variant="outline">
          <Link to={`/subjects/${plan.subject.toLowerCase()}/improve`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Improvement Options
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
};

export default PersonalizedImprovementPlanPage;
