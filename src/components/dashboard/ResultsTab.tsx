
import React from 'react';
import { Link } from 'react-router-dom';

interface TestResult {
  id: number;
  subject: string;
  title: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
}

interface ResultsTabProps {
  activeTab: string;
}

const ResultsTab: React.FC<ResultsTabProps> = ({ activeTab }) => {
  // Only show this component if the active tab is "Results"
  if (activeTab !== 'Results') return null;
  
  const testResults: TestResult[] = [
    {
      id: 1,
      subject: 'Math',
      title: 'Number Theory Quiz',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      date: '15 May 2023'
    },
    {
      id: 2,
      subject: 'English',
      title: 'Grammar Test',
      score: 70,
      totalQuestions: 30,
      correctAnswers: 21,
      date: '10 May 2023'
    },
    {
      id: 3,
      subject: 'Hindi',
      title: 'Vocabulary Quiz',
      score: 65,
      totalQuestions: 20,
      correctAnswers: 13,
      date: '5 May 2023'
    }
  ];

  return (
    <div className="mt-4">
      <div className="rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject/Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Questions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testResults.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{result.subject}</div>
                  <div className="text-sm text-gray-500">{result.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{result.score}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{result.correctAnswers}/{result.totalQuestions}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link to={`/tests/review/${result.id}`} className="text-brand-purple hover:underline">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTab;
