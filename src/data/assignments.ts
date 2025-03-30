
interface Resource {
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'ppt' | 'link';
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: 'Math' | 'English' | 'Hindi' | 'G.S.' | 'Science';
  type: 'Homework' | 'Project' | 'Essay' | 'Lab Report' | 'Reading';
  dueDate: string;
  completed: boolean;
  progress?: number;
  resources?: Resource[];
  grade?: number;
  feedback?: string;
  estimatedTime?: string;
  totalPoints?: number;
}

export interface AssignmentData {
  assignments: Assignment[];
}

export const assignmentData: AssignmentData = {
  assignments: [
    {
      id: '1',
      title: 'Algebra Equations Homework',
      description: 'Complete the practice problems from Chapter 5 of the textbook covering quadratic equations and their applications.',
      subject: 'Math',
      type: 'Homework',
      dueDate: 'May 25, 2023',
      completed: false,
      progress: 65,
      resources: [
        {
          name: 'Algebra Textbook Chapter 5',
          url: '/resources/algebra-ch5.pdf',
          type: 'pdf'
        },
        {
          name: 'Practice Worksheet',
          url: '/resources/algebra-worksheet.pdf',
          type: 'pdf'
        }
      ],
      estimatedTime: '45 minutes',
      totalPoints: 50
    },
    {
      id: '2',
      title: 'English Essay - Character Analysis',
      description: 'Write a 500-word essay analyzing the main character in the novel "To Kill a Mockingbird" focusing on character development throughout the story.',
      subject: 'English',
      type: 'Essay',
      dueDate: 'May 28, 2023',
      completed: false,
      progress: 20,
      resources: [
        {
          name: 'Essay Guidelines',
          url: '/resources/essay-guidelines.pdf',
          type: 'pdf'
        },
        {
          name: 'Character Analysis Examples',
          url: '/resources/character-analysis.ppt',
          type: 'ppt'
        }
      ],
      estimatedTime: '2 hours',
      totalPoints: 100
    },
    {
      id: '3',
      title: 'Hindi Grammar Exercises',
      description: 'Complete the grammar exercises focused on verb conjugation and sentence structure from the workbook.',
      subject: 'Hindi',
      type: 'Homework',
      dueDate: 'May 23, 2023',
      completed: true,
      grade: 92,
      feedback: 'Excellent work on the verb conjugations. Your understanding of sentence structure is very good. Continue practicing complex sentence formations.',
      totalPoints: 30
    },
    {
      id: '4',
      title: 'Science Lab Report - Photosynthesis',
      description: 'Write a complete lab report on the photosynthesis experiment we conducted in class, including hypothesis, methodology, results, and conclusion.',
      subject: 'Science',
      type: 'Lab Report',
      dueDate: 'June 2, 2023',
      completed: false,
      progress: 10,
      resources: [
        {
          name: 'Lab Report Template',
          url: '/resources/lab-report.doc',
          type: 'doc'
        },
        {
          name: 'Photosynthesis Experiment Data',
          url: '/resources/photosynthesis-data.pdf',
          type: 'pdf'
        }
      ],
      estimatedTime: '3 hours',
      totalPoints: 100
    },
    {
      id: '5',
      title: 'Current Affairs Research Project',
      description: 'Research and prepare a presentation on a current global issue of your choice. Include causes, effects, and possible solutions.',
      subject: 'G.S.',
      type: 'Project',
      dueDate: 'June 10, 2023',
      completed: false,
      progress: 35,
      resources: [
        {
          name: 'Project Guidelines',
          url: '/resources/project-guidelines.pdf',
          type: 'pdf'
        },
        {
          name: 'Presentation Template',
          url: '/resources/presentation-template.ppt',
          type: 'ppt'
        }
      ],
      estimatedTime: '5 hours',
      totalPoints: 150
    },
    {
      id: '6',
      title: 'Geometry Proofs Assignment',
      description: 'Complete the geometric proofs worksheet focusing on triangle congruence and similarity.',
      subject: 'Math',
      type: 'Homework',
      dueDate: 'May 18, 2023',
      completed: true,
      grade: 78,
      feedback: 'Good work on the triangle congruence proofs. Some of your similarity proofs need more detailed explanation of the steps. Review the properties of similar triangles.',
      totalPoints: 40
    },
    {
      id: '7',
      title: 'Reading Assignment - Short Stories',
      description: 'Read the assigned short stories and answer the comprehension questions for each story.',
      subject: 'English',
      type: 'Reading',
      dueDate: 'May 20, 2023',
      completed: true,
      grade: 95,
      feedback: 'Excellent comprehension and analysis of the themes in these stories. Your responses show deep understanding of the author\'s intent and literary devices used.',
      totalPoints: 30
    }
  ]
};

// Helper function to get assignment by ID
export const getAssignmentById = (id: string): Assignment | undefined => {
  return assignmentData.assignments.find(assignment => assignment.id === id);
};
