
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/toast';

type Student = {
  id: string;
  name: string;
  fatherName: string;
  schoolName: string;
  mobile: number;
  standard: number;
  srNumber: string;
  email?: string;
  type: 'student';
};

type Teacher = {
  id: string;
  name: string;
  ehrmsCode: string;
  schoolName: string;
  mobile: number;
  email?: string;
  type: 'teacher';
};

type User = Student | Teacher;

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  userType: 'student' | 'teacher' | null;
  login: (mobile: number, password: string, type: 'student' | 'teacher') => Promise<boolean>;
  signup: (userData: any, type: 'student' | 'teacher') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'student' | 'teacher' | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // We'll fix the toast import
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');
    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType as 'student' | 'teacher');
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (mobile: number, password: string, type: 'student' | 'teacher'): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (type === 'student' && mobile === 1234567890 && password === 'demo123') {
        const demoStudent: Student = {
          id: 'demo-student-id',
          name: 'Demo Student',
          fatherName: 'Demo Father',
          schoolName: 'Demo School',
          mobile: 1234567890,
          standard: 10,
          srNumber: 'SR12345',
          email: 'student@example.com',
          type: 'student'
        };
        setUser(demoStudent);
        setUserType('student');
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(demoStudent));
        localStorage.setItem('userType', 'student');
        
        toast({
          title: "Demo login successful",
          description: "Welcome to EduConnect demo account!",
        });
        return true;
      }
      
      if (type === 'teacher' && mobile === 9876543210 && password === 'demo123') {
        const demoTeacher: Teacher = {
          id: 'demo-teacher-id',
          name: 'Demo Teacher',
          ehrmsCode: 'EHRMS12345',
          schoolName: 'Demo School',
          mobile: 9876543210,
          email: 'teacher@example.com',
          type: 'teacher'
        };
        setUser(demoTeacher);
        setUserType('teacher');
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(demoTeacher));
        localStorage.setItem('userType', 'teacher');
        
        toast({
          title: "Demo login successful",
          description: "Welcome to EduConnect teacher demo account!",
        });
        return true;
      }
      
      const endpoint = type === 'student' 
        ? 'http://localhost:8000/api/v1/student/login'
        : 'http://localhost:8000/api/v1/teacher/login';
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const userData = type === 'student' ? 
        { ...data.student, type: 'student' } : 
        { ...data.teacher, type: 'teacher' };
        
      setUser(userData);
      setUserType(type);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userType', type);
      
      toast({
        title: "Login successful",
        description: "Welcome back to EduConnect!",
      });
      
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to login';
      toast({
        variant: "destructive",
        title: "Login failed",
        description: message,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: any, type: 'student' | 'teacher'): Promise<boolean> => {
    try {
      setLoading(true);
      
      const endpoint = type === 'student' 
        ? 'http://localhost:8000/api/v1/student/create'
        : 'http://localhost:8000/api/v1/teacher/create';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
      
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to register';
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: message,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        userType,
        login,
        signup,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
