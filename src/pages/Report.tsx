
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceOverview from '@/components/report/PerformanceOverview';
import SubjectPerformance from '@/components/report/SubjectPerformance';
import WeakAreas from '@/components/report/WeakAreas';
import ClassRanking from '@/components/report/ClassRanking';
import TestHistory from '@/components/report/TestHistory';
import { DownloadIcon, PrinterIcon, Share2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Report = () => {
  const subjects = [
    {
      name: 'Math',
      score: 85,
      tests: 12,
      bgColor: 'bg-math-bg',
      improvement: 'improving' as const,
    },
    {
      name: 'English',
      score: 70,
      tests: 10,
      bgColor: 'bg-english-bg',
      improvement: 'stable' as const,
    },
    {
      name: 'Hindi',
      score: 65,
      tests: 8,
      bgColor: 'bg-hindi-bg',
      improvement: 'improving' as const,
    },
    {
      name: 'G.S.',
      score: 80,
      tests: 9,
      bgColor: 'bg-gs-bg',
      improvement: 'stable' as const,
    },
  ];

  const weakAreas = [
    {
      id: 1,
      subject: 'Math',
      topic: 'Geometry Basics',
      accuracy: 40,
      recommendedResources: [
        { title: 'Geometry Practice Set', link: '/practice/math/geometry' },
        { title: 'Visual Geometry Tutorial', link: '/resources/math/geometry-tutorial' },
      ],
    },
    {
      id: 2,
      subject: 'English',
      topic: 'Grammar Rules',
      accuracy: 55,
      recommendedResources: [
        { title: 'Grammar Practice Set', link: '/practice/english/grammar' },
        { title: 'Interactive Grammar Lessons', link: '/resources/english/grammar-lessons' },
      ],
    },
    {
      id: 3,
      subject: 'Hindi',
      topic: 'Vocabulary',
      accuracy: 60,
      recommendedResources: [
        { title: 'Hindi Vocabulary Builder', link: '/practice/hindi/vocabulary' },
        { title: 'Word Association Exercise', link: '/resources/hindi/word-association' },
      ],
    },
  ];

  const recentTests = [
    {
      id: 1,
      subject: 'Math',
      title: 'Number Theory Quiz',
      date: 'May 15, 2023',
      score: 85,
      highestScore: 95,
      averageScore: 72,
    },
    {
      id: 2,
      subject: 'English',
      title: 'Grammar Test',
      date: 'May 10, 2023',
      score: 70,
      highestScore: 90,
      averageScore: 68,
    },
    {
      id: 3,
      subject: 'Hindi',
      title: 'Vocabulary Quiz',
      date: 'May 5, 2023',
      score: 65,
      highestScore: 85,
      averageScore: 60,
    },
    {
      id: 4,
      subject: 'G.S.',
      title: 'Indian History',
      date: 'April 30, 2023',
      score: 80,
      highestScore: 90,
      averageScore: 75,
    },
    {
      id: 5,
      subject: 'Math',
      title: 'Algebra Test',
      date: 'April 25, 2023',
      score: 78,
      highestScore: 92,
      averageScore: 70,
    },
  ];

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Academic Report Dashboard</h1>
          <p className="text-gray-500">A comprehensive analysis of your academic performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <PrinterIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2Icon className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="tests">Test History</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <PerformanceOverview subjects={subjects} />
            <ClassRanking
              studentName="Student"
              currentRank={5}
              totalStudents={30}
              previousRank={8}
              topSubject="Math"
              topSubjectRank={3}
            />
          </div>
          <SubjectPerformance subjects={subjects} />
        </TabsContent>
        
        <TabsContent value="subjects">
          <Card>
            <CardContent className="pt-6">
              <SubjectPerformance subjects={subjects} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tests">
          <TestHistory recentTests={recentTests} />
        </TabsContent>
        
        <TabsContent value="improvements">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeakAreas weakAreas={weakAreas} />
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Recommended Study Plan</h2>
                <div className="space-y-4">
                  {weakAreas.map((area) => (
                    <div key={area.id} className="p-4 rounded-lg border">
                      <h3 className="font-medium">{area.subject}: {area.topic}</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-2">Focus on improving your understanding of core concepts</p>
                      <ul className="space-y-2">
                        {area.recommendedResources.map((resource, idx) => (
                          <li key={idx} className="text-sm">
                            • <a href={resource.link} className="text-brand-purple hover:underline">{resource.title}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Report;
