
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Tests from "./pages/Tests";
import Quizzes from "./pages/Quizzes";
import Practice from "./pages/Practice";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import SubjectDetail from "./pages/SubjectDetail";
import SubjectImprovement from "./pages/SubjectImprovement";
import SubjectProgress from "./pages/SubjectProgress";
import TestResult from "./pages/TestResult";
import TasksPage from "./pages/TasksPage";
import TaskPage from "./pages/TaskPage";
import TestPage from "./pages/TestPage";
import QuizPage from "./pages/QuizPage";
import PracticePage from "./pages/PracticePage";
import Grades from "./pages/Grades";
import Assignments from "./pages/Assignments";
import AssignmentDetail from "./pages/AssignmentDetail";

const queryClient = new QueryClient();

// Properly wrap the application with providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <BrowserRouter>
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
          <Route path="/subjects/:subjectId/improve" element={<SubjectImprovement />} />
          <Route path="/subject-progress/:subjectId" element={<SubjectProgress />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:taskId" element={<TaskPage />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/assignments/:assignmentId" element={<AssignmentDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
