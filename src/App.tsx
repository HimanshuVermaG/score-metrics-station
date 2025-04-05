
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import LandingPage from "./pages/LandingPage";
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

// Teacher Pages
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherReports from "./pages/TeacherReports";
import TeacherClass6 from "./pages/TeacherClass6";
import TeacherClass7 from "./pages/TeacherClass7";
import TeacherClass8 from "./pages/TeacherClass8";
import TeacherActiveContent from "./pages/TeacherActiveContent";
import TeacherContentDetail from "./pages/TeacherContentDetail";
import TeacherCreateContent from "./pages/TeacherCreateContent";
import TeacherStudents from "./pages/TeacherStudents";
import TeacherReviews from "./pages/TeacherReviews";
import TeacherActivityLog from "./pages/TeacherActivityLog";
import TeacherCalendar from "./pages/TeacherCalendar";
import TeacherProfile from "./pages/TeacherProfile";

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
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                {/* Student routes */}
                <Route path="/dashboard" element={<Index />} />
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
                
                {/* Teacher routes */}
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/teacher/reports" element={<TeacherReports />} />
                <Route path="/teacher/create" element={<TeacherCreateContent />} />
                <Route path="/teacher/active-content" element={<TeacherActiveContent />} />
                <Route path="/teacher/content/:contentId" element={<TeacherContentDetail />} />
                <Route path="/teacher/students" element={<TeacherStudents />} />
                <Route path="/teacher/class/6" element={<TeacherClass6 />} />
                <Route path="/teacher/class/7" element={<TeacherClass7 />} />
                <Route path="/teacher/class/8" element={<TeacherClass8 />} />
                <Route path="/teacher/reviews" element={<TeacherReviews />} />
                <Route path="/teacher/activity-log" element={<TeacherActivityLog />} />
                <Route path="/teacher/calendar" element={<TeacherCalendar />} />
                <Route path="/teacher/profile" element={<TeacherProfile />} />
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
