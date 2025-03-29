
import React from 'react';

interface WeakArea {
  id: number;
  subject: string;
  topic: string;
  accuracy: number;
  recommendedResources: {
    title: string;
    link: string;
  }[];
}

interface WeakAreasProps {
  weakAreas: WeakArea[];
}

const WeakAreas: React.FC<WeakAreasProps> = ({ weakAreas }) => {
  return (
    <div className="rounded-lg shadow bg-white p-5 mb-6">
      <h2 className="text-xl font-bold mb-4">Areas for Improvement</h2>
      
      <div className="space-y-4">
        {weakAreas.map((area) => (
          <div key={area.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{area.subject}: {area.topic}</h3>
                <p className="text-sm text-gray-500">Accuracy: {area.accuracy}%</p>
              </div>
              <span className="px-2 py-1 bg-hard rounded-full text-xs font-medium">
                Needs work
              </span>
            </div>
            
            {area.recommendedResources.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-1">Recommended Resources:</h4>
                <ul className="space-y-1">
                  {area.recommendedResources.map((resource, index) => (
                    <li key={index} className="text-sm">
                      <a 
                        href={resource.link} 
                        className="text-brand-purple hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeakAreas;
