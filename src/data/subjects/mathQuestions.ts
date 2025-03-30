
import { Question } from '../questionTypes';

// Math questions
export const mathQuestions: Question[] = [
  {
    id: 1,
    text: "If x + 3 = 8, what is the value of x?",
    options: ["3", "5", "8", "11"],
    correctAnswer: 1,
    explanation: "To find x, subtract 3 from both sides: x + 3 - 3 = 8 - 3, therefore x = 5",
    difficulty: "Easy",
    subject: "Math",
    topic: "Algebraic Equations"
  },
  {
    id: 2,
    text: "What is the area of a circle with radius 4 cm?",
    options: ["16π cm²", "8π cm²", "4π cm²", "12π cm²"],
    correctAnswer: 0,
    explanation: "The area of a circle is πr². So, area = π × 4² = 16π cm²",
    difficulty: "Medium",
    subject: "Math",
    topic: "Geometry Basics"
  },
  {
    id: 3,
    text: "If a triangle has sides of lengths 3, 4, and 5, what type of triangle is it?",
    options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"],
    correctAnswer: 3,
    explanation: "This is a right-angled triangle because 3² + 4² = 5² (9 + 16 = 25)",
    difficulty: "Medium",
    subject: "Math",
    topic: "Geometry Basics"
  },
  {
    id: 4,
    text: "Simplify: 2(x + 3) - 4(x - 1)",
    options: ["6x + 10", "-2x + 10", "6x - 10", "-2x - 10"],
    correctAnswer: 1,
    explanation: "2(x + 3) - 4(x - 1) = 2x + 6 - 4x + 4 = -2x + 10",
    difficulty: "Hard",
    subject: "Math",
    topic: "Algebraic Equations"
  },
  {
    id: 5,
    text: "What is the prime factorization of 36?",
    options: ["2² × 3²", "2 × 18", "4 × 9", "6 × 6"],
    correctAnswer: 0,
    explanation: "36 = 2² × 3² = 4 × 9 = 6 × 6",
    difficulty: "Medium",
    subject: "Math",
    topic: "Number Theory"
  },
  // Additional math questions
  {
    id: 6,
    text: "What is the value of log₁₀(100)?",
    options: ["1", "2", "10", "100"],
    correctAnswer: 1,
    explanation: "log₁₀(100) = log₁₀(10²) = 2",
    difficulty: "Medium",
    subject: "Math",
    topic: "Logarithms"
  },
  {
    id: 7,
    text: "If f(x) = x² + 2x + 1, what is f(3)?",
    options: ["10", "12", "16", "18"],
    correctAnswer: 2,
    explanation: "f(3) = 3² + 2(3) + 1 = 9 + 6 + 1 = 16",
    difficulty: "Easy",
    subject: "Math",
    topic: "Functions"
  },
  {
    id: 8,
    text: "What is the derivative of f(x) = x³ + 2x² - 5x + 1?",
    options: ["3x² + 4x - 5", "x² + 4x - 5", "3x² + 2x - 5", "3x² + 4x"],
    correctAnswer: 0,
    explanation: "The derivative of f(x) = x³ + 2x² - 5x + 1 is f'(x) = 3x² + 4x - 5",
    difficulty: "Hard",
    subject: "Math",
    topic: "Calculus"
  }
];
