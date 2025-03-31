
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const success = await login(Number(values.mobile), values.password, userType);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  // Demo account login handlers
  const loginWithDemoAccount = async (type: 'student' | 'teacher') => {
    let mobile, password;
    
    if (type === 'student') {
      mobile = 1234567890;
      password = 'demo123';
    } else {
      mobile = 9876543210;
      password = 'demo123';
    }
    
    form.setValue('mobile', String(mobile));
    form.setValue('password', password);
    
    const success = await login(mobile, password, type);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="flex items-center justify-center mb-6">
            <div className="flex items-center text-2xl font-bold text-indigo-600">
              <svg 
                className="w-8 h-8 mr-2 text-indigo-600" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              EduConnect
            </div>
          </Link>
        </div>

        <Card className="border-t-4 border-t-indigo-600">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Login to Your Account</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
            
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
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-indigo-100">
                <Key className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your mobile number" 
                          type="tel" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="Enter your password" 
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
                
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                    Forgot Password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={loading}
                >
                  Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                {/* Demo account buttons */}
                <div className="pt-2">
                  <p className="text-sm text-center mb-2 text-gray-600">Quick access with demo accounts:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="text-xs"
                      onClick={() => loginWithDemoAccount('student')}
                    >
                      Demo Student
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="text-xs"
                      onClick={() => loginWithDemoAccount('teacher')}
                    >
                      Demo Teacher
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
