
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, CalendarClock, Award, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data
const terms = [
  { id: 'term1', name: 'Term 1' },
  { id: 'term2', name: 'Term 2' },
  { id: 'term3', name: 'Term 3' },
  { id: 'term4', name: 'Term 4' }
];

const subjects = [
  { id: 'math', name: 'Math', color: 'bg-blue-100 text-blue-800' },
  { id: 'english', name: 'English', color: 'bg-purple-100 text-purple-800' },
  { id: 'hindi', name: 'Hindi', color: 'bg-amber-100 text-amber-800' },
  { id: 'science', name: 'Science', color: 'bg-green-100 text-green-800' },
  { id: 'social', name: 'Social Studies', color: 'bg-red-100 text-red-800' }
];

const gradesData = {
  term1: {
    math: { grade: 'A', percentage: 92, rank: 3, previousGrade: 'A-', trend: 'up' },
    english: { grade: 'B+', percentage: 87, rank: 5, previousGrade: 'B', trend: 'up' },
    hindi: { grade: 'B', percentage: 83, rank: 7, previousGrade: 'B', trend: 'stable' },
    science: { grade: 'A-', percentage: 89, rank: 4, previousGrade: 'B+', trend: 'up' },
    social: { grade: 'B+', percentage: 86, rank: 6, previousGrade: 'B+', trend: 'stable' }
  },
  term2: {
    math: { grade: 'A', percentage: 94, rank: 2, previousGrade: 'A', trend: 'up' },
    english: { grade: 'A-', percentage: 90, rank: 4, previousGrade: 'B+', trend: 'up' },
    hindi: { grade: 'B+', percentage: 85, rank: 6, previousGrade: 'B', trend: 'up' },
    science: { grade: 'A', percentage: 91, rank: 3, previousGrade: 'A-', trend: 'up' },
    social: { grade: 'A-', percentage: 89, rank: 5, previousGrade: 'B+', trend: 'up' }
  },
  term3: {
    math: { grade: 'A+', percentage: 96, rank: 1, previousGrade: 'A', trend: 'up' },
    english: { grade: 'A', percentage: 92, rank: 3, previousGrade: 'A-', trend: 'up' },
    hindi: { grade: 'B+', percentage: 87, rank: 5, previousGrade: 'B+', trend: 'stable' },
    science: { grade: 'A', percentage: 93, rank: 2, previousGrade: 'A', trend: 'stable' },
    social: { grade: 'A-', percentage: 90, rank: 4, previousGrade: 'A-', trend: 'stable' }
  },
  term4: {
    math: { grade: 'A+', percentage: 97, rank: 1, previousGrade: 'A+', trend: 'stable' },
    english: { grade: 'A', percentage: 94, rank: 2, previousGrade: 'A', trend: 'stable' },
    hindi: { grade: 'A-', percentage: 90, rank: 4, previousGrade: 'B+', trend: 'up' },
    science: { grade: 'A+', percentage: 95, rank: 1, previousGrade: 'A', trend: 'up' },
    social: { grade: 'A', percentage: 92, rank: 3, previousGrade: 'A-', trend: 'up' }
  }
};

// Upcoming assessments
const upcomingAssessments = [
  { subject: 'Math', title: 'Final Exam', date: 'June 15, 2023', weightage: 'High' },
  { subject: 'English', title: 'Literature Test', date: 'June 10, 2023', weightage: 'Medium' },
  { subject: 'Science', title: 'Lab Practical', date: 'June 8, 2023', weightage: 'Medium' },
  { subject: 'Hindi', title: 'Grammar Quiz', date: 'June 5, 2023', weightage: 'Low' }
];

// Recent assessments
const recentAssessments = [
  { subject: 'Math', title: 'Algebra Test', date: 'May 20, 2023', score: 45, outOf: 50 },
  { subject: 'English', title: 'Essay Writing', date: 'May 18, 2023', score: 18, outOf: 20 },
  { subject: 'Science', title: 'Physics Quiz', date: 'May 15, 2023', score: 28, outOf: 30 },
  { subject: 'Social Studies', title: 'History Test', date: 'May 12, 2023', score: 38, outOf: 40 }
];

const GradesPage = () => {
  const [selectedTerm, setSelectedTerm] = useState('term4');
  
  const calculateAverage = (term: string) => {
    const termGrades = gradesData[term as keyof typeof gradesData];
    const total = Object.values(termGrades).reduce((sum, subject) => sum + subject.percentage, 0);
    return (total / Object.values(termGrades).length).toFixed(1);
  };
  
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
    return <div className="h-4 w-4 rounded-full bg-gray-400"></div>;
  };
  
  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Academic Grades</h1>
          <p className="text-gray-500">View your academic performance and progress</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map(term => (
                <SelectItem key={term.id} value={term.id}>{term.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="mr-2 h-5 w-5 text-brand-purple" />
              Overall Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-2">
                {gradesData[selectedTerm as keyof typeof gradesData].math.grade[0]}
              </div>
              <p className="text-gray-500 mb-4">Class Average: B+</p>
              <Progress 
                value={parseFloat(calculateAverage(selectedTerm))} 
                className="h-2 mb-2" 
              />
              <p className="text-sm">{calculateAverage(selectedTerm)}% Average</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-brand-purple" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Rank:</span>
                <span className="text-sm font-bold">4 / 30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Previous Rank:</span>
                <span className="text-sm">6 / 30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Top Subject:</span>
                <span className="text-sm">Mathematics</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Most Improved:</span>
                <span className="text-sm">Hindi</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarClock className="mr-2 h-5 w-5 text-brand-purple" />
              Upcoming Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAssessments.slice(0, 3).map((assessment, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">{assessment.subject}: {assessment.title}</p>
                    <p className="text-gray-500 text-xs">{assessment.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    assessment.weightage === 'High' ? 'bg-red-100 text-red-800' :
                    assessment.weightage === 'Medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {assessment.weightage}
                  </span>
                </div>
              ))}
              <Button variant="link" className="text-brand-purple p-0 h-auto">
                View All Assessments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="subject-grades" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="subject-grades">Subject Grades</TabsTrigger>
          <TabsTrigger value="assessments">Recent Assessments</TabsTrigger>
          <TabsTrigger value="feedback">Teacher Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subject-grades">
          <Card>
            <CardHeader>
              <CardTitle>Subject Breakdown - {terms.find(t => t.id === selectedTerm)?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-medium">Subject</th>
                      <th className="text-center py-3 font-medium">Grade</th>
                      <th className="text-center py-3 font-medium">Percentage</th>
                      <th className="text-center py-3 font-medium">Class Rank</th>
                      <th className="text-center py-3 font-medium">Previous</th>
                      <th className="text-center py-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => {
                      const gradeInfo = gradesData[selectedTerm as keyof typeof gradesData][subject.id as keyof typeof gradesData.term1];
                      return (
                        <tr key={subject.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full ${subject.color} mr-2`}></span>
                            {subject.name}
                          </td>
                          <td className="text-center py-3 font-bold">{gradeInfo.grade}</td>
                          <td className="text-center py-3">
                            <div className="flex items-center">
                              <span className="mr-2">{gradeInfo.percentage}%</span>
                              <div className="w-16">
                                <Progress value={gradeInfo.percentage} className="h-1" />
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-3">{gradeInfo.rank}/30</td>
                          <td className="text-center py-3">{gradeInfo.previousGrade}</td>
                          <td className="text-center py-3">
                            {getTrendIcon(gradeInfo.trend)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssessments.map((assessment, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{assessment.subject}: {assessment.title}</h3>
                        <p className="text-gray-500 text-sm">{assessment.date}</p>
                      </div>
                      <span className="text-lg font-bold">{assessment.score}/{assessment.outOf}</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Score</span>
                        <span>{Math.round((assessment.score / assessment.outOf) * 100)}%</span>
                      </div>
                      <Progress 
                        value={Math.round((assessment.score / assessment.outOf) * 100)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))}
                <div className="text-center mt-4">
                  <Button variant="outline">Load More Assessments</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Mathematics</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Term 4</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Excellent progress in mathematics this term. Your problem-solving skills have improved significantly, 
                    and you show strong analytical thinking. Continue practicing complex problems to further enhance your abilities.
                  </p>
                  <div className="text-sm text-gray-500">- Mr. Johnson, Mathematics Teacher</div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">English</h3>
                    <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Term 4</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Good improvement in writing and comprehension skills. Your essays show better structure and vocabulary usage. 
                    Focus on developing more nuanced analysis in literature discussions.
                  </p>
                  <div className="text-sm text-gray-500">- Ms. Williams, English Teacher</div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Science</h3>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Term 4</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Outstanding performance in science this term. Your lab reports are exceptionally detailed and your understanding 
                    of concepts is excellent. You've shown particular strength in physics and chemistry.
                  </p>
                  <div className="text-sm text-gray-500">- Dr. Martinez, Science Teacher</div>
                </div>
                
                <div className="text-center mt-4">
                  <Button variant="outline">View Previous Terms' Feedback</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default GradesPage;
