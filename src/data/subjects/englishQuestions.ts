
import { Question } from '../questionTypes';

// English questions
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
  },
  // Additional English questions
  {
    id: 6,
    text: "What is the plural form of 'child'?",
    options: ["childs", "childes", "children", "childies"],
    correctAnswer: 2,
    explanation: "The plural form of 'child' is 'children'",
    difficulty: "Easy",
    subject: "English",
    topic: "Grammar Rules"
  },
  {
    id: 7,
    text: "Which of the following is a synonym for 'elated'?",
    options: ["depressed", "overjoyed", "angry", "tired"],
    correctAnswer: 1,
    explanation: "'Overjoyed' is a synonym for 'elated', meaning extremely happy",
    difficulty: "Medium",
    subject: "English",
    topic: "Vocabulary Building"
  },
  {
    id: 8,
    text: "Identify the adverb in the sentence: 'She spoke very softly during the meeting.'",
    options: ["she", "spoke", "very", "softly"],
    correctAnswer: 3,
    explanation: "'Softly' is an adverb as it describes how she spoke",
    difficulty: "Medium",
    subject: "English",
    topic: "Grammar Rules"
  }
];
