
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import LandingNavbar from '@/components/layout/LandingNavbar';

// Student signup schema
const studentSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  schoolName: z.string().min(2, "School name is required"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  standard: z.string().min(1, "Class is required"),
  srNumber: z.string().min(1, "SR Number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Teacher signup schema
const teacherSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  ehrmsCode: z.string().min(2, "EHRMS Code is required"),
  schoolName: z.string().min(2, "School name is required"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type StudentSignupFormValues = z.infer<typeof studentSignupSchema>;
type TeacherSignupFormValues = z.infer<typeof teacherSignupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  // Student form
  const studentForm = useForm<StudentSignupFormValues>({
    resolver: zodResolver(studentSignupSchema),
    defaultValues: {
      name: "",
      fatherName: "",
      schoolName: "",
      mobile: "",
      standard: "",
      srNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Teacher form
  const teacherForm = useForm<TeacherSignupFormValues>({
    resolver: zodResolver(teacherSignupSchema),
    defaultValues: {
      name: "",
      ehrmsCode: "",
      schoolName: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onStudentSubmit = async (values: StudentSignupFormValues) => {
    const studentData = {
      name: values.name,
      fatherName: values.fatherName,
      schoolName: values.schoolName,
      mobile: Number(values.mobile),
      standard: Number(values.standard),
      srNumber: values.srNumber,
      password: values.password,
    };

    const success = await signup(studentData, 'student');
    if (success) {
      navigate('/login');
    }
  };

  const onTeacherSubmit = async (values: TeacherSignupFormValues) => {
    const teacherData = {
      name: values.name,
      ehrmsCode: values.ehrmsCode,
      schoolName: values.schoolName,
      mobile: Number(values.mobile),
      password: values.password,
    };

    const success = await signup(teacherData, 'teacher');
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <LandingNavbar />

      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Card className="border-t-4 border-t-indigo-600">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription>Enter your details to get started</CardDescription>
              
              <div className="flex rounded-md mt-4 overflow-hidden border">
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    userType === 'student' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => setUserType('student')}
                >
                  Student
                </button>
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    userType === 'teacher' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => setUserType('teacher')}
                >
                  Teacher
                </button>
              </div>
            </CardHeader>
            
            <CardContent>
              {userType === 'student' ? (
                <Form {...studentForm}>
                  <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={studentForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter student name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={studentForm.control}
                        name="fatherName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Father's Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter father's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={studentForm.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select School" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="School 1">School 1</SelectItem>
                              <SelectItem value="School 2">School 2</SelectItem>
                              <SelectItem value="School 3">School 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={studentForm.control}
                        name="standard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Class</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                                  <SelectItem key={grade} value={String(grade)}>
                                    Class {grade}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={studentForm.control}
                        name="srNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>S/R Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter S/R number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={studentForm.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mobile number" type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={studentForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Create password" 
                                type={showPassword ? "text" : "password"} 
                                {...field} 
                              />
                            </FormControl>
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={studentForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Confirm password" 
                                type={showConfirmPassword ? "text" : "password"} 
                                {...field} 
                              />
                            </FormControl>
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      disabled={loading}
                    >
                      Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...teacherForm}>
                  <form onSubmit={teacherForm.handleSubmit(onTeacherSubmit)} className="space-y-4">
                    <FormField
                      control={teacherForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teacher Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter teacher name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teacherForm.control}
                      name="ehrmsCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>EHRMS Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter EHRMS code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={teacherForm.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select School" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="School 1">School 1</SelectItem>
                              <SelectItem value="School 2">School 2</SelectItem>
                              <SelectItem value="School 3">School 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teacherForm.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mobile number" type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teacherForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Create password" 
                                type={showPassword ? "text" : "password"} 
                                {...field} 
                              />
                            </FormControl>
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teacherForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Confirm password" 
                                type={showConfirmPassword ? "text" : "password"} 
                                {...field} 
                              />
                            </FormControl>
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      disabled={loading}
                    >
                      Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            
            <CardFooter className="justify-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
