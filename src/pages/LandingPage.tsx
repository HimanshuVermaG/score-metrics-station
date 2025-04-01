
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Book, Award, Sparkles, Target, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingNavbar from '@/components/layout/LandingNavbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Empowering Education Through Technology
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              EduConnect helps teachers and students track performance, analyze progress, and improve learning outcomes with powerful analytics and personalized feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
              alt="Students learning" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Features Designed for Modern Education
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our platform provides powerful tools for both teachers and students to enhance the learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart3 className="h-10 w-10 text-indigo-600" />}
              title="Performance Analytics"
              description="Track progress with detailed analytics and visualizations to identify strengths and areas for improvement."
            />
            
            <FeatureCard 
              icon={<Book className="h-10 w-10 text-indigo-600" />}
              title="Interactive Learning"
              description="Engage with interactive quizzes, tests, and practice exercises tailored to individual learning needs."
            />
            
            <FeatureCard 
              icon={<Award className="h-10 w-10 text-indigo-600" />}
              title="Achievement Tracking"
              description="Monitor achievements and track improvement over time with detailed progress reports."
            />
            
            <FeatureCard 
              icon={<Target className="h-10 w-10 text-indigo-600" />}
              title="Targeted Practice"
              description="Focus on weak areas with customized practice sessions and targeted exercises."
            />
            
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-indigo-600" />}
              title="Classroom Management"
              description="Teachers can manage multiple classes, assign tasks, and track student performance efficiently."
            />
            
            <FeatureCard 
              icon={<BookOpen className="h-10 w-10 text-indigo-600" />}
              title="Comprehensive Curriculum"
              description="Access a wide range of subjects and topics aligned with educational standards."
            />
          </div>
        </div>
      </section>
      
      {/* For Teachers & Students Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Designed for Both Teachers and Students
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our platform caters to the unique needs of both educators and learners
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-full mr-4">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Teachers</h3>
              </div>
              
              <ul className="space-y-4">
                <FeatureListItem text="Create and assign tests, quizzes, and assignments" />
                <FeatureListItem text="Track student performance with detailed analytics" />
                <FeatureListItem text="Identify areas where students need additional support" />
                <FeatureListItem text="Generate comprehensive performance reports" />
                <FeatureListItem text="Manage multiple classes and subjects efficiently" />
              </ul>
              
              <div className="mt-8">
                <Link to="/login">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">
                    Teacher Login
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-full mr-4">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
              </div>
              
              <ul className="space-y-4">
                <FeatureListItem text="Access personalized learning materials and tests" />
                <FeatureListItem text="Track individual progress and performance" />
                <FeatureListItem text="Practice with interactive quizzes and exercises" />
                <FeatureListItem text="Receive detailed feedback on assignments" />
                <FeatureListItem text="View rankings and compare performance" />
              </ul>
              
              <div className="mt-8">
                <Link to="/login">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">
                    Student Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-indigo-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform the Learning Experience?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of teachers and students already using EduConnect to enhance education
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-indigo-700 w-full sm:w-auto">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center text-2xl font-bold text-white mb-4">
                <svg 
                  className="w-8 h-8 mr-2 text-indigo-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                EduConnect
              </div>
              <p className="text-sm">
                Empowering education through innovative technology solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-sm hover:text-white">Features</Link></li>
                <li><Link to="/about" className="text-sm hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-sm hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-sm hover:text-white">Help Center</Link></li>
                <li><Link to="/faq" className="text-sm hover:text-white">FAQ</Link></li>
                <li><Link to="/blog" className="text-sm hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-sm hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} EduConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="inline-flex p-3 rounded-full bg-indigo-50 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const FeatureListItem = ({ text }: { text: string }) => {
  return (
    <li className="flex items-start">
      <CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </li>
  );
};

export default LandingPage;
