
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tests from "./pages/Tests";
import Quizzes from "./pages/Quizzes";
import Practice from "./pages/Practice";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import SubjectDetail from "./pages/SubjectDetail";
import SubjectImprovement from "./pages/SubjectImprovement";
import SubjectProgress from "./pages/SubjectProgress";
import SubjectProgressDetail from "./pages/SubjectProgressDetail";
import TestResult from "./pages/TestResult";
import TasksPage from "./pages/TasksPage";
import TaskPage from "./pages/TaskPage";
import TestPage from "./pages/TestPage";
import QuizPage from "./pages/QuizPage";
import PracticePage from "./pages/PracticePage";
import Grades from "./pages/Grades";
import Assignments from "./pages/Assignments";
import AssignmentDetail from "./pages/AssignmentDetail";
import SubjectQuestionsPage from "./pages/SubjectQuestionsPage";

// Properly wrap the application with providers
const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Index />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/tests/start/:testId" element={<TestPage />} />
                <Route path="/tests/review/:testId" element={<TestResult />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/quizzes/start/:quizId" element={<QuizPage />} />
                <Route path="/quizzes/review/:testId" element={<TestResult />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/practice/:subject" element={<SubjectQuestionsPage />} />
                <Route path="/practice/:subject/:topicId" element={<PracticePage />} />
                <Route path="/report" element={<Report />} />
                <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
                <Route path="/subjects/:subjectId/improve" element={<SubjectImprovement />} />
                <Route path="/subject-progress/:subjectId" element={<SubjectProgress />} />
                <Route path="/subject-progress/:subjectId/detail" element={<SubjectProgressDetail />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/:taskId" element={<TaskPage />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/assignments/:assignmentId" element={<AssignmentDetail />} />
              </Route>
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
