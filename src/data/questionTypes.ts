
// Question type definition
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer
  explanation?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  subject: 'Math' | 'English' | 'Hindi' | 'G.S.';
  topic?: string;
}

export interface QuestionSet {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: Question[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  estimatedTime?: string;
  totalQuestions?: number;
}

export interface SubjectTopics {
  [key: string]: {
    [key: string]: {
      title: string;
      description: string;
      subject: string;
    }
  }
}
