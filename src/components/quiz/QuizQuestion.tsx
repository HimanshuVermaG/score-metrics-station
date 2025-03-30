
import React, { useState } from 'react';
import { Question } from '@/data/questionTypes';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  showExplanation?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onAnswer,
  showExplanation = false 
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === question.correctAnswer;
    setIsSubmitted(true);
    setShowFeedback(true);
    onAnswer(isCorrect);
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'Easy': return 'bg-easy text-green-800';
      case 'Medium': return 'bg-medium text-orange-800';
      case 'Hard': return 'bg-hard text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full transition-all shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor()}`}>
              {question.difficulty}
            </span>
            {question.topic && (
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {question.topic}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{question.subject}</span>
        </div>
        <CardTitle className="text-lg mt-2">{question.text}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(value) => setSelectedOption(parseInt(value))}
          className="space-y-3"
          disabled={isSubmitted}
        >
          {question.options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center p-3 rounded-lg border ${
                isSubmitted && index === question.correctAnswer 
                  ? 'border-green-300 bg-green-50' 
                  : isSubmitted && index === selectedOption 
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-200 hover:border-brand-purple'
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mr-3" />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
              {isSubmitted && index === question.correctAnswer && (
                <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
              )}
              {isSubmitted && index === selectedOption && index !== question.correctAnswer && (
                <XCircle className="h-5 w-5 text-red-500 ml-2" />
              )}
            </div>
          ))}
        </RadioGroup>
        
        {showFeedback && showExplanation && question.explanation && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Explanation</h4>
                <p className="text-blue-700 text-sm">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end pt-2">
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedOption === null}
            className="bg-brand-purple hover:bg-purple-700"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="text-sm">
            {selectedOption === question.correctAnswer ? (
              <span className="text-green-600">Correct! 👍</span>
            ) : (
              <span className="text-red-600">Incorrect. The correct answer is: {question.options[question.correctAnswer]}</span>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
