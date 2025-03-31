
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  PlusCircle, Save, Clock, Book, FileText, 
  BarChart, BrainCircuit, CheckCircle, HelpCircle, 
  Trash, ImagePlus, Layers, ChevronDown, ChevronUp, Copy
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const TeacherCreateContent = () => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizSubject, setQuizSubject] = useState('');
  const [quizClass, setQuizClass] = useState('');
  const [quizTimeLimit, setQuizTimeLimit] = useState('');
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      text: '', 
      type: 'mcq', 
      options: ['', '', '', ''], 
      correctAnswer: 0,
      points: 1
    }
  ]);

  // Function to add a new question
  const addQuestion = () => {
    const newQuestion = { 
      id: questions.length + 1, 
      text: '', 
      type: 'mcq', 
      options: ['', '', '', ''], 
      correctAnswer: 0,
      points: 1
    };
    setQuestions([...questions, newQuestion]);
  };

  // Function to update question text
  const updateQuestionText = (id: number, text: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, text } : q
    ));
  };

  // Function to update question type
  const updateQuestionType = (id: number, type: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { 
        ...q, 
        type,
        // Reset options if changing to true/false
        options: type === 'true_false' ? ['True', 'False'] : q.options,
        // Reset correct answer if changing question type
        correctAnswer: 0
      } : q
    ));
  };

  // Function to update option text
  const updateOptionText = (questionId: number, optionIndex: number, text: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { 
        ...q, 
        options: q.options.map((opt, idx) => 
          idx === optionIndex ? text : opt
        ) 
      } : q
    ));
  };

  // Function to set correct answer
  const setCorrectAnswer = (questionId: number, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
    ));
  };

  // Function to update points for a question
  const updatePoints = (questionId: number, points: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, points } : q
    ));
  };

  // Function to remove a question
  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    } else {
      toast.error("Cannot remove the only question. Quiz must have at least one question.");
    }
  };

  // Function to duplicate a question
  const duplicateQuestion = (id: number) => {
    const questionToDuplicate = questions.find(q => q.id === id);
    if (questionToDuplicate) {
      const newQuestion = { 
        ...questionToDuplicate, 
        id: Math.max(...questions.map(q => q.id)) + 1 
      };
      setQuestions([...questions, newQuestion]);
    }
  };

  // Function to move question up
  const moveQuestionUp = (id: number) => {
    const index = questions.findIndex(q => q.id === id);
    if (index > 0) {
      const newQuestions = [...questions];
      [newQuestions[index - 1], newQuestions[index]] = [newQuestions[index], newQuestions[index - 1]];
      setQuestions(newQuestions);
    }
  };

  // Function to move question down
  const moveQuestionDown = (id: number) => {
    const index = questions.findIndex(q => q.id === id);
    if (index < questions.length - 1) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
      setQuestions(newQuestions);
    }
  };

  // Function to save the quiz
  const saveQuiz = () => {
    // Check if all required fields are filled
    if (!quizTitle.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }
    
    if (!quizSubject || !quizClass) {
      toast.error("Please select both subject and class");
      return;
    }

    // Check if all questions have text
    const emptyQuestions = questions.some(q => !q.text.trim());
    if (emptyQuestions) {
      toast.error("All questions must have text");
      return;
    }

    // Check if all options for MCQ questions have text
    const invalidOptions = questions.some(q => 
      q.type === 'mcq' && q.options.some(opt => !opt.trim())
    );
    if (invalidOptions) {
      toast.error("All options for multiple choice questions must have text");
      return;
    }

    // Save the quiz (this would connect to your backend in a real application)
    toast.success("Quiz saved successfully!");
    console.log({
      title: quizTitle,
      subject: quizSubject,
      class: quizClass,
      timeLimit: quizTimeLimit,
      questions
    });
  };

  return (
    <TeacherPageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Content</h1>
        <p className="text-gray-600">Create quizzes, assignments, and study materials for your students</p>
      </div>
      
      <Tabs defaultValue="quiz" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" />
            <span>Quiz</span>
          </TabsTrigger>
          <TabsTrigger value="assignment" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Assignment</span>
          </TabsTrigger>
          <TabsTrigger value="material" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Study Material</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="quiz" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-title">Quiz Title</Label>
                  <Input 
                    id="quiz-title" 
                    placeholder="Enter quiz title" 
                    value={quizTitle} 
                    onChange={(e) => setQuizTitle(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                  <Input 
                    id="time-limit" 
                    type="number" 
                    placeholder="Enter time limit" 
                    value={quizTimeLimit} 
                    onChange={(e) => setQuizTimeLimit(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={quizSubject} onValueChange={setQuizSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="social">Social Studies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select value={quizClass} onValueChange={setQuizClass}>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class6">Class 6</SelectItem>
                      <SelectItem value="class7">Class 7</SelectItem>
                      <SelectItem value="class8">Class 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="shuffle" />
                  <Label htmlFor="shuffle">Shuffle questions</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="show-results" />
                  <Label htmlFor="show-results">Show results immediately after submission</Label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Questions</h2>
              <Button 
                onClick={addQuestion}
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Add Question
              </Button>
            </div>
            
            {questions.map((question, qIndex) => (
              <Card key={question.id} className="relative">
                <div className="absolute -left-3 top-6 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white font-medium text-sm">
                  {qIndex + 1}
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Enter your question here" 
                        value={question.text}
                        onChange={(e) => updateQuestionText(question.id, e.target.value)}
                        className="text-lg font-medium resize-none"
                      />
                    </div>
                    <div className="flex items-center space-x-1 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => duplicateQuestion(question.id)}
                        title="Duplicate question"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => moveQuestionUp(question.id)}
                        disabled={qIndex === 0}
                        title="Move up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => moveQuestionDown(question.id)}
                        disabled={qIndex === questions.length - 1}
                        title="Move down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        title="Delete question"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="space-y-1">
                      <Label htmlFor={`question-type-${question.id}`}>Question Type</Label>
                      <Select 
                        value={question.type} 
                        onValueChange={(value) => updateQuestionType(question.id, value)}
                      >
                        <SelectTrigger id={`question-type-${question.id}`} className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mcq">Multiple Choice</SelectItem>
                          <SelectItem value="true_false">True/False</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor={`points-${question.id}`}>Points</Label>
                      <Select 
                        value={question.points.toString()} 
                        onValueChange={(value) => updatePoints(question.id, parseInt(value))}
                      >
                        <SelectTrigger id={`points-${question.id}`} className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map(p => (
                            <SelectItem key={p} value={p.toString()}>{p} {p === 1 ? 'point' : 'points'}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Add Media (Optional)</Label>
                      <Button variant="outline" className="flex items-center gap-2">
                        <ImagePlus className="h-4 w-4" />
                        Add Image
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <Label className="mb-3 block">
                        {question.type === 'mcq' ? 'Answer Options' : 'True/False'}
                      </Label>
                      
                      <RadioGroup 
                        value={question.correctAnswer.toString()}
                        onValueChange={(value) => setCorrectAnswer(question.id, parseInt(value))}
                        className="space-y-3"
                      >
                        {question.options.map((option, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <RadioGroupItem value={index.toString()} id={`q${question.id}-option-${index}`} />
                            {question.type === 'mcq' ? (
                              <div className="flex-1">
                                <Input 
                                  value={option}
                                  onChange={(e) => updateOptionText(question.id, index, e.target.value)}
                                  placeholder={`Option ${index + 1}`}
                                />
                              </div>
                            ) : (
                              <Label htmlFor={`q${question.id}-option-${index}`} className="font-normal">
                                {option}
                              </Label>
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-dashed bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-8" onClick={addQuestion}>
                <PlusCircle className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500">Add another question</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline">Save as Draft</Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
              onClick={saveQuiz}
            >
              <Save className="h-4 w-4" />
              Create Quiz
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="assignment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment-title">Assignment Title</Label>
                  <Input id="assignment-title" placeholder="Enter assignment title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignment-subject">Subject</Label>
                  <Select>
                    <SelectTrigger id="assignment-subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="social">Social Studies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignment-class">Class</Label>
                  <Select>
                    <SelectTrigger id="assignment-class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class6">Class 6</SelectItem>
                      <SelectItem value="class7">Class 7</SelectItem>
                      <SelectItem value="class8">Class 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assignment-description">Assignment Description</Label>
                <Textarea id="assignment-description" placeholder="Enter assignment details and instructions" className="min-h-32" />
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <ImagePlus className="h-4 w-4" />
                  Attach Files
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Create Assignment</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="material" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Material Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material-title">Material Title</Label>
                  <Input id="material-title" placeholder="Enter material title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="material-type">Material Type</Label>
                  <Select>
                    <SelectTrigger id="material-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notes">Notes</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="worksheet">Worksheet</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="material-subject">Subject</Label>
                  <Select>
                    <SelectTrigger id="material-subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="social">Social Studies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="material-class">Class</Label>
                  <Select>
                    <SelectTrigger id="material-class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class6">Class 6</SelectItem>
                      <SelectItem value="class7">Class 7</SelectItem>
                      <SelectItem value="class8">Class 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="material-description">Description</Label>
                <Textarea id="material-description" placeholder="Enter description of the study material" className="min-h-20" />
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <ImagePlus className="h-4 w-4" />
                  Upload Material
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Publish Material</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </TeacherPageContainer>
  );
};

export default TeacherCreateContent;
