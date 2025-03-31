
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Mathematics', score: 78 },
  { subject: 'Science', score: 82 },
  { subject: 'English', score: 74 },
  { subject: 'History', score: 85 },
  { subject: 'Geography', score: 80 },
];

const TeacherPerformanceChart = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Subject Performance</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md">
            Average Score
          </button>
          <button className="px-4 py-1.5 bg-white text-gray-600 text-sm border rounded-md">
            Passing Rate
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" barSize={40} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeacherPerformanceChart;
