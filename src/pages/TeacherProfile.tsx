
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, Mail, Phone, MapPin, Calendar, Book, FileText, 
  Award, Briefcase, School, Edit, Lock, Bell, Settings,
  Upload, Save, Download, Pencil
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const TeacherProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);

  const teacherInfo = {
    name: 'Ananya Sharma',
    role: 'Senior Mathematics Teacher',
    joinDate: 'January 15, 2018',
    email: 'ananya.sharma@edulearn.com',
    phone: '+91 98765 43210',
    address: '123 Teachers Colony, Education District, Delhi, India',
    department: 'Mathematics',
    employeeId: 'T-2018-042',
    status: 'active',
    bio: 'Experienced mathematics teacher with over 10 years of teaching experience. Specializes in making complex mathematical concepts accessible to middle school students through innovative teaching methods.',
    education: [
      {
        degree: 'Master of Education (M.Ed)',
        institution: 'Delhi University',
        year: '2010-2012'
      },
      {
        degree: 'Bachelor of Science in Mathematics',
        institution: 'Mumbai University',
        year: '2006-2010'
      }
    ],
    certifications: [
      {
        title: 'Advanced Teaching Methodologies',
        organization: 'National Board of Education',
        year: '2019'
      },
      {
        title: 'Digital Learning Techniques',
        organization: 'EdTech Institute',
        year: '2021'
      },
      {
        title: 'Child Psychology and Learning',
        organization: 'Child Development Center',
        year: '2017'
      }
    ],
    expertise: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Mathematical Modeling'],
    achievements: [
      'Teacher of the Year Award (2021)',
      'Published Mathematics Workbook for Middle School (2019)',
      'Led Mathematics Olympiad Team to National Finals (2020)'
    ],
    classes: [
      { id: 1, name: 'Class 6 - Section A', students: 30, subject: 'Mathematics' },
      { id: 2, name: 'Class 7 - Section B', students: 28, subject: 'Mathematics' },
      { id: 3, name: 'Class 8 - Section A', students: 32, subject: 'Mathematics' }
    ],
    statistics: {
      totalStudents: 90,
      classesPerWeek: 15,
      averageAttendance: 94,
      averagePerformance: 82,
      contentCreated: 45,
      quizzesGraded: 210
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      appNotifications: true,
      reminderNotifications: true
    },
    security: {
      twoFactorAuth: true,
      lastPasswordChange: '2023-09-15',
      loginDevices: 2
    }
  };

  return (
    <TeacherPageContainer>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Teacher Profile</h1>
          <p className="text-gray-500">View and manage your personal information</p>
        </div>
        <div className="flex items-center gap-3">
          {activeTab === 'profile' && !editMode && (
            <Button 
              onClick={() => setEditMode(true)}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
          {activeTab === 'profile' && editMode && (
            <Button 
              onClick={() => setEditMode(false)}
              className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          )}
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-700 mb-4">
                  {teacherInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold">{teacherInfo.name}</h2>
              <p className="text-gray-500">{teacherInfo.role}</p>
              <div className="mt-2">
                <Badge className="bg-green-500">{teacherInfo.status === 'active' ? 'Active' : 'Inactive'}</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Mail className="h-4 w-4 text-indigo-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{teacherInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Phone className="h-4 w-4 text-indigo-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{teacherInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <MapPin className="h-4 w-4 text-indigo-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{teacherInfo.address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Calendar className="h-4 w-4 text-indigo-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{teacherInfo.joinDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Book className="h-4 w-4 text-indigo-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{teacherInfo.department}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <FileText className="h-4 w-4 text-indigo-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium">{teacherInfo.employeeId}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              {/* Bio Section */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Professional Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <Textarea
                      defaultValue={teacherInfo.bio}
                      rows={4}
                      className="resize-none"
                    />
                  ) : (
                    <p className="text-gray-700">{teacherInfo.bio}</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Experience & Education */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Education */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <School className="h-5 w-5 mr-2 text-indigo-600" />
                        Education
                      </CardTitle>
                      {editMode && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teacherInfo.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-indigo-200 pl-4 py-1">
                          <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                          <p className="text-sm text-gray-700">{edu.institution}</p>
                          <p className="text-xs text-gray-500">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Certifications */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-indigo-600" />
                        Certifications
                      </CardTitle>
                      {editMode && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teacherInfo.certifications.map((cert, index) => (
                        <div key={index} className="border-l-2 border-green-200 pl-4 py-1">
                          <h4 className="font-medium text-gray-900">{cert.title}</h4>
                          <p className="text-sm text-gray-700">{cert.organization}</p>
                          <p className="text-xs text-gray-500">{cert.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Areas of Expertise and Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Expertise */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Book className="h-5 w-5 mr-2 text-indigo-600" />
                        Areas of Expertise
                      </CardTitle>
                      {editMode && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {teacherInfo.expertise.map((skill, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 border border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Achievements */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-indigo-600" />
                        Achievements
                      </CardTitle>
                      {editMode && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      {teacherInfo.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-700">{achievement}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Classes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
                    Classes Teaching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium text-gray-500">Class</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-500">Subject</th>
                          <th className="px-4 py-3 text-center font-medium text-gray-500">Students</th>
                          <th className="px-4 py-3 text-right font-medium text-gray-500">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {teacherInfo.classes.map((cls) => (
                          <tr key={cls.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{cls.name}</td>
                            <td className="px-4 py-3 text-gray-700">{cls.subject}</td>
                            <td className="px-4 py-3 text-center">{cls.students}</td>
                            <td className="px-4 py-3 text-right">
                              <Button size="sm" variant="outline">View Class</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Statistics Tab */}
            <TabsContent value="statistics">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500">Total Students</span>
                      <span className="text-2xl font-bold text-indigo-700">{teacherInfo.statistics.totalStudents}</span>
                    </div>
                    <p className="text-sm text-gray-500">Across all classes</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500">Weekly Classes</span>
                      <span className="text-2xl font-bold text-blue-600">{teacherInfo.statistics.classesPerWeek}</span>
                    </div>
                    <p className="text-sm text-gray-500">Hours of teaching per week</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500">Content Created</span>
                      <span className="text-2xl font-bold text-green-600">{teacherInfo.statistics.contentCreated}</span>
                    </div>
                    <p className="text-sm text-gray-500">Quizzes, tests, and assignments</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Average Student Attendance</CardTitle>
                    <CardDescription>Past 30 days across all classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold text-indigo-700">{teacherInfo.statistics.averageAttendance}%</span>
                      <Badge className="bg-green-100 text-green-800">Above Target</Badge>
                    </div>
                    <Progress value={teacherInfo.statistics.averageAttendance} className="h-2 mb-2" />
                    <p className="text-sm text-gray-500">Target: 90% attendance</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Average Student Performance</CardTitle>
                    <CardDescription>Based on latest assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold text-amber-600">{teacherInfo.statistics.averagePerformance}%</span>
                      <Badge className="bg-amber-100 text-amber-800">Meets Target</Badge>
                    </div>
                    <Progress value={teacherInfo.statistics.averagePerformance} className="h-2 mb-2" />
                    <p className="text-sm text-gray-500">Target: 80% performance</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Activity</CardTitle>
                  <CardDescription>Summary of your teaching activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4">Content Creation</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Quizzes Created</span>
                            <span className="text-indigo-600">18</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Tests Created</span>
                            <span className="text-indigo-600">12</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Assignments Created</span>
                            <span className="text-indigo-600">15</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4">Assessment Activities</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Submissions Graded</span>
                            <span className="text-green-600">{teacherInfo.statistics.quizzesGraded}</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Feedback Provided</span>
                            <span className="text-green-600">185</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Parent Communications</span>
                            <span className="text-green-600">45</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Detailed Analytics</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-indigo-600" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch 
                          id="email-notifications" 
                          checked={teacherInfo.notifications.emailNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                        </div>
                        <Switch 
                          id="sms-notifications" 
                          checked={teacherInfo.notifications.smsNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="app-notifications" className="font-medium">App Notifications</Label>
                          <p className="text-sm text-gray-500">Receive in-app notifications</p>
                        </div>
                        <Switch 
                          id="app-notifications" 
                          checked={teacherInfo.notifications.appNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="reminder-notifications" className="font-medium">Reminder Notifications</Label>
                          <p className="text-sm text-gray-500">Receive deadline reminders</p>
                        </div>
                        <Switch 
                          id="reminder-notifications" 
                          checked={teacherInfo.notifications.reminderNotifications}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">
                      Save Notification Settings
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Security Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-indigo-600" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-factor-auth" className="font-medium">Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <Switch 
                          id="two-factor-auth" 
                          checked={teacherInfo.security.twoFactorAuth}
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Password</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">Last changed {teacherInfo.security.lastPasswordChange}</p>
                          <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Login Devices</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">{teacherInfo.security.loginDevices} devices currently logged in</p>
                          <Button variant="outline" size="sm">Manage Devices</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Account Activity</h4>
                        <Button variant="link" className="p-0 h-auto text-indigo-600">View recent login activity</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">
                      Save Security Settings
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Account Settings */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-indigo-600" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="language" className="font-medium">Display Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="theme" className="font-medium">Theme Preference</Label>
                        <Select defaultValue="light">
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="timezone" className="font-medium">Time Zone</Label>
                        <Select defaultValue="ist">
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                            <SelectItem value="utc">Universal Time (UTC)</SelectItem>
                            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="accessibility" className="font-medium">Accessibility</Label>
                        <Select defaultValue="default">
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select accessibility options" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="high-contrast">High Contrast</SelectItem>
                            <SelectItem value="large-text">Large Text</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-digest" className="font-medium">Weekly Email Digest</Label>
                          <p className="text-sm text-gray-500">Receive weekly summary of activities</p>
                        </div>
                        <Switch id="email-digest" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-logout" className="font-medium">Auto Logout</Label>
                          <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
                        </div>
                        <Switch id="auto-logout" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      Save Account Settings
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TeacherPageContainer>
  );
};

export default TeacherProfile;
