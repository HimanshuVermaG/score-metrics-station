
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tests from "./pages/Tests";
import Quizzes from "./pages/Quizzes";
import Practice from "./pages/Practice";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import SubjectDetail from "./pages/SubjectDetail";
import TestResult from "./pages/TestResult";
import TasksPage from "./pages/TasksPage";
import TestPage from "./pages/TestPage";
import QuizPage from "./pages/QuizPage";
import PracticePage from "./pages/PracticePage";

const queryClient = new QueryClient();

// Properly wrap the application with providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/tests/start/:testId" element={<TestPage />} />
        <Route path="/tests/review/:testId" element={<TestResult />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/start/:quizId" element={<QuizPage />} />
        <Route path="/quizzes/review/:testId" element={<TestResult />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/:subject/:topicId" element={<PracticePage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
