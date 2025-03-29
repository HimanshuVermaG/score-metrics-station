
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import OverallProgress from '@/components/dashboard/OverallProgress';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import Tasks from '@/components/dashboard/Tasks';
import QuestionSetsTab from '@/components/dashboard/QuestionSetsTab';
import PracticeTestsTab from '@/components/dashboard/PracticeTestsTab';
import ResultsTab from '@/components/dashboard/ResultsTab';
import ImprovementRecommendations from '@/components/dashboard/ImprovementRecommendations';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('Question Sets');
  
  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Sample data for weak areas
  const weakAreas = [
    { subject: "English", topic: "Grammar", score: 55 },
    { subject: "Math", topic: "Geometry", score: 45 },
    { subject: "Hindi", topic: "Vocabulary", score: 60 }
  ];

  // Sample data for recommendations
  const recommendations = [
    { 
      id: "1", 
      title: "Grammar Practice Set", 
      subject: "English", 
      type: "practice" as const, 
      difficulty: "Medium" as const,
      description: "Interactive exercises focusing on grammar rules and sentence structure",
      link: "/practice/english/grammar",
      urgent: true
    },
    { 
      id: "2", 
      title: "Geometry Basics", 
      subject: "Math", 
      type: "quiz" as const, 
      difficulty: "Hard" as const,
      description: "Quick assessment of fundamental geometric concepts and formulas",
      link: "/quizzes/start/1"
    },
    { 
      id: "3", 
      title: "Algebraic Equations", 
      subject: "Math", 
      type: "practice" as const, 
      difficulty: "Medium" as const,
      description: "Step-by-step practice for solving different types of algebraic equations",
      link: "/practice/math/algebra"
    },
    { 
      id: "4", 
      title: "Vocabulary Builder", 
      subject: "Hindi", 
      type: "test" as const, 
      difficulty: "Easy" as const,
      description: "Comprehensive test to evaluate and improve your Hindi vocabulary",
      link: "/tests/start/1" 
    }
  ];
  
  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{getTimeOfDay()}, Student!</h1>
          <p className="text-gray-500">Class 6 - Section A</p>
        </div>
        <Link to="/report">
          <Button className="bg-brand-purple hover:bg-purple-700 mt-4 md:mt-0">
            My Report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <OverallProgress
        totalProgress={75}
        target={90}
        subjectProgress={[
          { subject: 'Math', progress: 85, bgColor: 'bg-math-bg' },
          { subject: 'English', progress: 70, bgColor: 'bg-english-bg' },
          { subject: 'Hindi', progress: 65, bgColor: 'bg-hindi-bg' },
          { subject: 'G.S.', progress: 80, bgColor: 'bg-gs-bg' },
        ]}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'Question Sets'
                    ? 'text-brand-purple border-b-2 border-brand-purple'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('Question Sets')}
              >
                Question Sets
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'Practice Tests'
                    ? 'text-brand-purple border-b-2 border-brand-purple'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('Practice Tests')}
              >
                Practice Tests
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'Results'
                    ? 'text-brand-purple border-b-2 border-brand-purple'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('Results')}
              >
                Results
              </button>
            </div>
            
            <QuestionSetsTab activeTab={activeTab} />
            <PracticeTestsTab activeTab={activeTab} />
            <ResultsTab activeTab={activeTab} />
          </div>
          
          <ImprovementRecommendations 
            weakAreas={weakAreas}
            recommendations={recommendations}
          />
        </div>
        
        <div className="space-y-6">
          <UpcomingEvents
            events={[
              { title: 'Math Quiz', date: 'Tomorrow', time: '9:00 AM', type: 'quiz' },
              { title: 'English Practice Test', date: 'Friday', time: '3:00 PM', type: 'test' },
              { title: 'Parent-Teacher Meeting', date: 'Next Monday', time: '5:00 PM', type: 'meeting' },
            ]}
          />
          
          <Tasks
            tasks={[
              { id: 1, title: 'Complete Hindi homework', completed: true, link: '/tasks/1' },
              { id: 2, title: 'Prepare for Math quiz', completed: false, link: '/tasks/2' },
              { id: 3, title: 'Finish English practice', completed: false, link: '/tasks/3' },
              { id: 4, title: 'Read G.S. chapter', completed: true, link: '/tasks/4' },
              { id: 5, title: 'Submit science project', completed: false, link: '/tasks/5' },
              { id: 6, title: 'Review history notes', completed: false, link: '/tasks/6' },
            ]}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
