
import React from 'react';
import { Calendar } from 'lucide-react';

interface Event {
  title: string;
  date: string;
  time: string;
  type: 'quiz' | 'test' | 'meeting';
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'quiz':
        return <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-500">Q</div>;
      case 'test':
        return <div className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center text-yellow-500">T</div>;
      case 'meeting':
        return <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-500">M</div>;
    }
  };

  return (
    <div className="rounded-lg shadow bg-white p-5">
      <h2 className="text-lg font-medium mb-4">Upcoming Events</h2>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start">
            {getEventIcon(event.type)}
            <div className="ml-3">
              <h3 className="text-sm font-medium">{event.title}</h3>
              <p className="text-xs text-gray-500">{event.date}, {event.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <a href="/calendar" className="text-sm text-brand-purple hover:underline flex items-center justify-center">
          View All Events
        </a>
      </div>
    </div>
  );
};

export default UpcomingEvents;
