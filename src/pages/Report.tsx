
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SubjectPerformance from '@/components/report/SubjectPerformance';
import WeakAreas from '@/components/report/WeakAreas';
import ClassRanking from '@/components/report/ClassRanking';
import TestHistory from '@/components/report/TestHistory';

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Academic Report</h1>
        <p className="text-gray-500">A comprehensive view of your academic performance</p>
      </div>

      <SubjectPerformance subjects={subjects} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <WeakAreas weakAreas={weakAreas} />
        
        <ClassRanking
          studentName="Student"
          currentRank={5}
          totalStudents={30}
          previousRank={8}
          topSubject="Math"
          topSubjectRank={3}
        />
      </div>
      
      <TestHistory recentTests={recentTests} />
    </PageContainer>
  );
};

export default Report;
