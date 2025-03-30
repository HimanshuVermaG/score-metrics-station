
import { Question } from '../questionTypes';

// Hindi questions
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
  },
  // Additional Hindi questions
  {
    id: 6,
    text: "निम्न में से कौन सा शब्द तत्सम है?",
    options: ["आँख", "कान", "नाक", "हस्त"],
    correctAnswer: 3,
    explanation: "'हस्त' तत्सम शब्द है, जो सीधे संस्कृत से लिया गया है",
    difficulty: "Medium",
    subject: "Hindi",
    topic: "Hindi Grammar"
  },
  {
    id: 7,
    text: "निम्न में से कौन सा शब्द स्त्रीलिंग है?",
    options: ["पुस्तक", "घर", "लड़का", "दादा"],
    correctAnswer: 0,
    explanation: "'पुस्तक' स्त्रीलिंग शब्द है",
    difficulty: "Easy",
    subject: "Hindi",
    topic: "Hindi Grammar"
  },
  {
    id: 8,
    text: "कबीरदास किस काल के कवि थे?",
    options: ["आदिकाल", "भक्तिकाल", "रीतिकाल", "आधुनिक काल"],
    correctAnswer: 1,
    explanation: "कबीरदास भक्तिकाल के प्रमुख कवि थे",
    difficulty: "Medium",
    subject: "Hindi",
    topic: "Hindi Literature"
  }
];
