
import React from 'react';

interface Test {
  id: number;
  subject: string;
  title: string;
  date: string;
  score: number;
  highestScore: number;
  averageScore: number;
}

interface TestHistoryProps {
  recentTests: Test[];
}

const TestHistory: React.FC<TestHistoryProps> = ({ recentTests }) => {
  return (
    <div className="rounded-lg shadow bg-white p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Test History</h2>
        <a href="/tests" className="text-sm text-brand-purple hover:underline">
          View All Tests
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Your Score
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class Highest
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class Average
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentTests.map((test) => (
              <tr key={test.id}>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium">{test.subject}</div>
                    <div className="text-xs text-gray-500">{test.title}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{test.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    test.score >= 80 ? 'bg-green-100 text-green-800' : 
                    test.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {test.score}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{test.highestScore}%</td>
                <td className="px-4 py-3 text-sm">{test.averageScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestHistory;
