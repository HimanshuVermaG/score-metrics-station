
import React from 'react';
import { Link } from 'react-router-dom';
import { allQuestions } from '@/data/questionSets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, ArrowRight, BookOpen, GraduationCap, Brain, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface QuestionSetsTabProps {
  activeTab: string;
}

const QuestionSetsTab: React.FC<QuestionSetsTabProps> = ({ activeTab }) => {
  // Only show this component if the active tab is "Question Sets"
  if (activeTab !== 'Question Sets') return null;

  // Count questions in each subject
  const mathCount = allQuestions.Math.length;
  const englishCount = allQuestions.English.length;
  const hindiCount = allQuestions.Hindi.length;
  const gsCount = allQuestions["G.S."].length;

  // Progress for each subject (sample data)
  const mathProgress = 70;
  const englishProgress = 55;
  const hindiProgress = 45;
  const gsProgress = 65;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/practice/math" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="bg-math-bg p-2 rounded-full">
                    <Book className="h-5 w-5 text-blue-700" />
                  </div>
                  <CardTitle className="text-lg">Math</CardTitle>
                </div>
                <Badge variant="outline" className="bg-blue-50">
                  {mathCount} Questions
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{mathProgress}%</span>
                  </div>
                  <Progress value={mathProgress} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Topics include Algebra, Geometry, Calculus and more</p>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600">Recently updated</span>
                  </div>
                  <span className="text-sm font-medium text-brand-purple flex items-center">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/practice/english" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="bg-english-bg p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-purple-700" />
                  </div>
                  <CardTitle className="text-lg">English</CardTitle>
                </div>
                <Badge variant="outline" className="bg-purple-50">
                  {englishCount} Questions
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{englishProgress}%</span>
                  </div>
                  <Progress value={englishProgress} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Topics include Grammar, Vocabulary, Comprehension and more</p>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-xs text-gray-600">Needs attention</span>
                  </div>
                  <span className="text-sm font-medium text-brand-purple flex items-center">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/practice/hindi" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="bg-hindi-bg p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-amber-700" />
                  </div>
                  <CardTitle className="text-lg">Hindi</CardTitle>
                </div>
                <Badge variant="outline" className="bg-amber-50">
                  {hindiCount} Questions
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{hindiProgress}%</span>
                  </div>
                  <Progress value={hindiProgress} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Topics include Literature, Grammar, Comprehension and more</p>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-600">Requires improvement</span>
                  </div>
                  <span className="text-sm font-medium text-brand-purple flex items-center">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/practice/gs" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="bg-gs-bg p-2 rounded-full">
                    <Globe className="h-5 w-5 text-green-700" />
                  </div>
                  <CardTitle className="text-lg">G.S.</CardTitle>
                </div>
                <Badge variant="outline" className="bg-green-50">
                  {gsCount} Questions
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{gsProgress}%</span>
                  </div>
                  <Progress value={gsProgress} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Topics include History, Geography, Science and more</p>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600">On track</span>
                  </div>
                  <span className="text-sm font-medium text-brand-purple flex items-center">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default QuestionSetsTab;
