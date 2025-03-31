
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type Student = {
  id: string;
  name: string;
  fatherName: string;
  schoolName: string;
  mobile: number;
  standard: number;
  srNumber: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  student: Student | null;
  login: (mobile: number, password: string) => Promise<boolean>;
  signup: (studentData: Omit<Student, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedStudent = localStorage.getItem('student');
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (mobile: number, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:8000/api/v1/student/login', {
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

      // Set authenticated state
      setStudent(data.student);
      setIsAuthenticated(true);
      localStorage.setItem('student', JSON.stringify(data.student));
      
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

  const signup = async (studentData: Omit<Student, 'id'> & { password: string }): Promise<boolean> => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:8000/api/v1/student/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
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
    setStudent(null);
    localStorage.removeItem('student');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        student,
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
