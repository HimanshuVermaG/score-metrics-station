
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

// Sample math questions
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
  }
];

// Sample English questions
export const englishQuestions: Question[] = [
  {
    id: 1,
    text: "Choose the correct form of the verb: She ___ to the store yesterday.",
    options: ["go", "goes", "went", "going"],
    correctAnswer: 2,
    explanation: "The past tense of 'go' is 'went'",
    difficulty: "Easy",
    subject: "English",
    topic: "Grammar Rules"
  },
  {
    id: 2,
    text: "Identify the noun in this sentence: The quick brown fox jumps over the lazy dog.",
    options: ["quick", "fox", "jumps", "lazy"],
    correctAnswer: 1,
    explanation: "'Fox' is a noun, as it's a person, place, or thing",
    difficulty: "Easy",
    subject: "English",
    topic: "Grammar Rules"
  },
  {
    id: 3,
    text: "Which word is an antonym of 'benevolent'?",
    options: ["kind", "malevolent", "generous", "charitable"],
    correctAnswer: 1,
    explanation: "'Malevolent' means wishing evil or harm to others, which is the opposite of 'benevolent'",
    difficulty: "Hard",
    subject: "English",
    topic: "Vocabulary Building"
  },
  {
    id: 4,
    text: "Which sentence contains a metaphor?",
    options: ["He runs as fast as a cheetah.", "Time is a thief.", "The room was very quiet.", "They arrived at noon."],
    correctAnswer: 1,
    explanation: "'Time is a thief' is a metaphor because it's making a direct comparison without using 'like' or 'as'",
    difficulty: "Medium",
    subject: "English",
    topic: "Reading Comprehension"
  },
  {
    id: 5,
    text: "Which word is spelled correctly?",
    options: ["accomodate", "acommodate", "accommodate", "acomodate"],
    correctAnswer: 2,
    explanation: "'Accommodate' is the correct spelling with two 'c's and two 'm's",
    difficulty: "Medium",
    subject: "English",
    topic: "Grammar Rules"
  }
];

// Sample Hindi questions
export const hindiQuestions: Question[] = [
  {
    id: 1,
    text: "निम्न में से कौन सा शब्द बहुवचन रूप में है?",
    options: ["लड़का", "किताब", "लड़कियां", "घर"],
    correctAnswer: 2,
    explanation: "'लड़कियां' बहुवचन रूप है, जबकि अन्य एकवचन हैं",
    difficulty: "Easy",
    subject: "Hindi",
    topic: "Hindi Grammar"
  },
  {
    id: 2,
    text: "निम्न में से 'तितली' का पर्यायवाची शब्द कौन सा है?",
    options: ["परवाना", "पक्षी", "आकाश", "सूरज"],
    correctAnswer: 0,
    explanation: "'परवाना' 'तितली' का पर्यायवाची शब्द है",
    difficulty: "Medium",
    subject: "Hindi",
    topic: "Hindi Grammar"
  },
  {
    id: 3,
    text: "निम्न में से कौन सा वाक्य शुद्ध है?",
    options: ["राम ने खाना खाया।", "राम खाना खाया।", "राम खाना खाएगा।", "राम ने खाना खाएगा।"],
    correctAnswer: 0,
    explanation: "'राम ने खाना खाया।' वाक्य शुद्ध है",
    difficulty: "Medium",
    subject: "Hindi",
    topic: "Hindi Grammar"
  },
  {
    id: 4,
    text: "निम्नलिखित वाक्य में विशेषण शब्द कौन सा है? 'उसने लाल फूल तोड़ा।'",
    options: ["उसने", "लाल", "फूल", "तोड़ा"],
    correctAnswer: 1,
    explanation: "'लाल' विशेषण है क्योंकि यह फूल की विशेषता बताता है",
    difficulty: "Easy",
    subject: "Hindi",
    topic: "Hindi Grammar"
  },
  {
    id: 5,
    text: "इस वाक्य में रिक्त स्थान भरें: 'अनेकता में _____ ही भारत की विशेषता है।'",
    options: ["अनेकता", "एकता", "विविधता", "भाईचारा"],
    correctAnswer: 1,
    explanation: "'अनेकता में एकता ही भारत की विशेषता है' एक प्रसिद्ध भारतीय कहावत है",
    difficulty: "Medium",
    subject: "Hindi",
    topic: "Comprehension Practice"
  }
];

// Sample G.S. questions
export const gsQuestions: Question[] = [
  {
    id: 1,
    text: "Which river is known as the 'Ganga of the South'?",
    options: ["Godavari", "Krishna", "Kaveri", "Narmada"],
    correctAnswer: 2,
    explanation: "Kaveri is known as the 'Ganga of the South'",
    difficulty: "Medium",
    subject: "G.S.",
    topic: "Indian Geography"
  },
  {
    id: 2,
    text: "Who was the first woman Prime Minister of India?",
    options: ["Sarojini Naidu", "Indira Gandhi", "Sonia Gandhi", "Pratibha Patil"],
    correctAnswer: 1,
    explanation: "Indira Gandhi was the first woman Prime Minister of India",
    difficulty: "Easy",
    subject: "G.S.",
    topic: "Indian History"
  },
  {
    id: 3,
    text: "Which article of the Indian Constitution abolishes untouchability?",
    options: ["Article 14", "Article 15", "Article 17", "Article 21"],
    correctAnswer: 2,
    explanation: "Article 17 of the Indian Constitution abolishes untouchability",
    difficulty: "Medium",
    subject: "G.S.",
    topic: "Indian History"
  },
  {
    id: 4,
    text: "The latitude that runs through the middle of India is:",
    options: ["Equator", "Tropic of Cancer", "Tropic of Capricorn", "Arctic Circle"],
    correctAnswer: 1,
    explanation: "The Tropic of Cancer (23.5°N) runs through the middle of India",
    difficulty: "Easy",
    subject: "G.S.",
    topic: "World Geography"
  },
  {
    id: 5,
    text: "Who is known as the 'Iron Man of India'?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "B.R. Ambedkar"],
    correctAnswer: 2,
    explanation: "Sardar Vallabhbhai Patel is known as the 'Iron Man of India'",
    difficulty: "Easy",
    subject: "G.S.",
    topic: "Indian History"
  }
];

// Combine all questions by subject
export const allQuestions = {
  Math: mathQuestions,
  English: englishQuestions,
  Hindi: hindiQuestions,
  "G.S.": gsQuestions
};

// Get questions for tests
export const getTestQuestions = (subject: string, count: number = 10) => {
  const subjectKey = subject as keyof typeof allQuestions;
  const questions = allQuestions[subjectKey] || [];
  
  // Shuffle and return requested number of questions
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};
