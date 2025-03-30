
import { QuestionSet, SubjectTopics } from './questionTypes';
import { mathQuestions } from './subjects/mathQuestions';
import { englishQuestions } from './subjects/englishQuestions';
import { hindiQuestions } from './subjects/hindiQuestions';
import { gsQuestions } from './subjects/gsQuestions';

// Combine all questions by subject
export const allQuestions = {
  Math: mathQuestions,
  English: englishQuestions,
  Hindi: hindiQuestions,
  "G.S.": gsQuestions
};

// Define subject topics for practice
export const subjectTopics: SubjectTopics = {
  'math': {
    '1': { title: 'Number Theory', description: 'Practice number theory concepts including factors, multiples, and prime numbers.', subject: 'Math' },
    '2': { title: 'Algebraic Equations', description: 'Practice solving linear and quadratic equations.', subject: 'Math' },
    '3': { title: 'Geometry Basics', description: 'Practice fundamental geometry concepts.', subject: 'Math' },
    '4': { title: 'Calculus', description: 'Practice differentiation and integration.', subject: 'Math' },
    '5': { title: 'Logarithms', description: 'Practice logarithmic operations and equations.', subject: 'Math' }
  },
  'english': {
    '1': { title: 'Grammar Rules', description: 'Practice essential grammar rules and sentence structure.', subject: 'English' },
    '2': { title: 'Vocabulary Building', description: 'Expand your vocabulary with these practice exercises.', subject: 'English' },
    '3': { title: 'Reading Comprehension', description: 'Improve your reading comprehension skills.', subject: 'English' },
    '4': { title: 'Writing Skills', description: 'Practice essay writing and composition.', subject: 'English' }
  },
  'hindi': {
    '1': { title: 'Hindi Grammar', description: 'Practice Hindi grammar rules and sentence structure.', subject: 'Hindi' },
    '2': { title: 'Comprehension Practice', description: 'Improve your Hindi reading comprehension skills.', subject: 'Hindi' },
    '3': { title: 'Hindi Literature', description: 'Learn about famous Hindi literary works and authors.', subject: 'Hindi' }
  },
  'gs': {
    '1': { title: 'Indian History', description: 'Practice questions related to Indian history.', subject: 'G.S.' },
    '2': { title: 'World Geography', description: 'Test your knowledge of world geography.', subject: 'G.S.' },
    '3': { title: 'Current Affairs', description: 'Stay updated with current affairs practice questions.', subject: 'G.S.' },
    '4': { title: 'Indian Polity', description: 'Learn about Indian constitution and political system.', subject: 'G.S.' },
    '5': { title: 'Science', description: 'Practice general science questions.', subject: 'G.S.' }
  }
};

// Define question sets for quizzes
export const quizSets: QuestionSet[] = [
  {
    id: '1',
    title: 'Mental Math Challenge',
    subject: 'Math',
    description: 'Test your mental math skills with this quick quiz.',
    questions: mathQuestions.filter(q => q.difficulty === 'Easy').slice(0, 10),
    difficulty: 'Easy',
    estimatedTime: '10 min',
    totalQuestions: 10
  },
  {
    id: '2',
    title: 'Vocabulary Quiz',
    subject: 'English',
    description: 'Expand your English vocabulary with this quiz.',
    questions: englishQuestions.filter(q => q.topic === 'Vocabulary Building').slice(0, 15),
    difficulty: 'Medium',
    estimatedTime: '15 min',
    totalQuestions: 15
  },
  {
    id: '3',
    title: 'Hindi Grammar Quiz',
    subject: 'Hindi',
    description: 'Test your knowledge of Hindi grammar rules.',
    questions: hindiQuestions.filter(q => q.topic === 'Hindi Grammar').slice(0, 12),
    difficulty: 'Medium',
    estimatedTime: '12 min',
    totalQuestions: 12
  },
  {
    id: '4',
    title: 'World Geography Quiz',
    subject: 'G.S.',
    description: 'Test your knowledge of world geography.',
    questions: gsQuestions.filter(q => q.topic === 'World Geography').slice(0, 15),
    difficulty: 'Medium',
    estimatedTime: '15 min',
    totalQuestions: 15
  }
];

// Define question sets for tests
export const testSets: QuestionSet[] = [
  {
    id: '1',
    title: 'Mathematics Unit Test',
    subject: 'Math',
    description: 'This test covers algebraic equations, geometry, and number theory.',
    questions: mathQuestions.slice(0, 15),
    difficulty: 'Medium',
    estimatedTime: '45 min',
    totalQuestions: 15
  },
  {
    id: '2',
    title: 'English Proficiency Test',
    subject: 'English',
    description: 'Comprehensive test covering grammar, vocabulary, and reading comprehension.',
    questions: englishQuestions.slice(0, 20),
    difficulty: 'Medium',
    estimatedTime: '60 min',
    totalQuestions: 20
  },
  {
    id: '3',
    title: 'Hindi Language Assessment',
    subject: 'Hindi',
    description: 'Evaluate your Hindi language skills with this comprehensive test.',
    questions: hindiQuestions.slice(0, 15),
    difficulty: 'Medium',
    estimatedTime: '45 min',
    totalQuestions: 15
  },
  {
    id: '4',
    title: 'General Studies Test',
    subject: 'G.S.',
    description: 'Test your knowledge across various general studies topics.',
    questions: gsQuestions.slice(0, 20),
    difficulty: 'Hard',
    estimatedTime: '60 min',
    totalQuestions: 20
  }
];

// Helper functions
export const getQuestionsBySubject = (subject: string) => {
  const subjectKey = subject as keyof typeof allQuestions;
  return allQuestions[subjectKey] || [];
};

export const getTestQuestions = (subject: string, count: number = 10) => {
  const questions = getQuestionsBySubject(subject);
  
  // Shuffle and return requested number of questions
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

export const getQuizById = (quizId: string) => {
  return quizSets.find(quiz => quiz.id === quizId) || quizSets[0];
};

export const getTestById = (testId: string) => {
  return testSets.find(test => test.id === testId) || testSets[0];
};
