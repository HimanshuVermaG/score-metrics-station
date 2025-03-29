
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import SubjectCard from '@/components/ui/subject-card';
import ProgressCard from '@/components/ui/progress-card';
import OverallProgress from '@/components/dashboard/OverallProgress';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import Tasks from '@/components/dashboard/Tasks';
import QuestionSetsTab from '@/components/dashboard/QuestionSetsTab';
import PracticeTestsTab from '@/components/dashboard/PracticeTestsTab';
import ResultsTab from '@/components/dashboard/ResultsTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('Question Sets');
  
  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
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
          <div className="bg-white rounded-lg shadow p-4 mb-6">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-medium text-lg mb-3">Personalized Recommendations</h2>
              <SubjectCard
                subject="English"
                score={55}
                status="Needs improvement"
                icon={<FileText className="h-5 w-5 text-blue-500" />}
                bgColor="bg-white"
                viewDetailsLink="/subjects/english"
                recommendedPractice={[
                  { title: 'Grammar Practice Set', link: '/practice/english/grammar' },
                  { title: 'Vocabulary Builder', link: '/practice/english/vocabulary' },
                ]}
              />
            </div>
            
            <div>
              <h2 className="font-medium text-lg mb-3">Improvement Plan for Mathematics</h2>
              <ProgressCard
                title="Algebraic Equations"
                progress={66}
                difficultyLevel="Medium"
                inProgress={true}
                actionText="Practice"
                actionLink="/practice/math/algebra"
                bgColor="bg-white"
              />
              <ProgressCard
                title="Geometry Basics"
                progress={40}
                difficultyLevel="Hard"
                actionText="Practice"
                actionLink="/practice/math/geometry"
                bgColor="bg-white"
              />
            </div>
          </div>
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
            ]}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubjectCard
          subject="Hindi"
          score={65}
          status="Average"
          icon={<Book className="h-5 w-5 text-yellow-500" />}
          bgColor="bg-white"
          viewDetailsLink="/subjects/hindi"
          recommendedPractice={[
            { title: 'Comprehension Practice', link: '/practice/hindi/comprehension' },
          ]}
        />
        
        <SubjectCard
          subject="Math"
          score={85}
          status="Good progress"
          icon={<Calculator className="h-5 w-5 text-green-500" />}
          bgColor="bg-white"
          viewDetailsLink="/subjects/math"
          recommendedPractice={[]}
        />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
