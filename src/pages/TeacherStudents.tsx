
import React, { useState } from 'react';
import TeacherPageContainer from '@/components/layout/TeacherPageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Download, Mail, UserPlus, MoreHorizontal, Eye, Edit, Trash, ArrowUpDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock data for students
const studentsData = [
  { id: 1, name: "Aakash Singh", class: "Class 6", rollNo: "C6-001", email: "aakash.s@example.com", parentName: "Rajesh Singh", phone: "9876543210", joinDate: "15 Apr 2023", status: "active", performance: "excellent" },
  { id: 2, name: "Nisha Sharma", class: "Class 6", rollNo: "C6-002", email: "nisha.s@example.com", parentName: "Vijay Sharma", phone: "9876543211", joinDate: "18 Apr 2023", status: "active", performance: "good" },
  { id: 3, name: "Rahul Patel", class: "Class 6", rollNo: "C6-003", email: "rahul.p@example.com", parentName: "Sunil Patel", phone: "9876543212", joinDate: "20 Apr 2023", status: "inactive", performance: "average" },
  { id: 4, name: "Priya Gupta", class: "Class 7", rollNo: "C7-001", email: "priya.g@example.com", parentName: "Amit Gupta", phone: "9876543213", joinDate: "10 Mar 2023", status: "active", performance: "good" },
  { id: 5, name: "Vikram Yadav", class: "Class 7", rollNo: "C7-002", email: "vikram.y@example.com", parentName: "Rakesh Yadav", phone: "9876543214", joinDate: "12 Mar 2023", status: "active", performance: "average" },
  { id: 6, name: "Shreya Verma", class: "Class 7", rollNo: "C7-003", email: "shreya.v@example.com", parentName: "Deepak Verma", phone: "9876543215", joinDate: "15 Mar 2023", status: "active", performance: "excellent" },
  { id: 7, name: "Arjun Malhotra", class: "Class 8", rollNo: "C8-001", email: "arjun.m@example.com", parentName: "Vikrant Malhotra", phone: "9876543216", joinDate: "5 Feb 2023", status: "active", performance: "good" },
  { id: 8, name: "Divya Kapoor", class: "Class 8", rollNo: "C8-002", email: "divya.k@example.com", parentName: "Rajiv Kapoor", phone: "9876543217", joinDate: "8 Feb 2023", status: "inactive", performance: "needs_improvement" },
  { id: 9, name: "Kunal Joshi", class: "Class 8", rollNo: "C8-003", email: "kunal.j@example.com", parentName: "Sanjeev Joshi", phone: "9876543218", joinDate: "10 Feb 2023", status: "active", performance: "average" },
];

const TeacherStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  
  // Form state for new student
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    rollNo: "",
    email: "",
    parentName: "",
    phone: "",
  });
  
  // Function to handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  
  // Filter and sort students based on search, class, status, and sort column
  const filteredStudents = studentsData
    .filter(student => 
      (selectedClass === "all" || student.class === selectedClass) &&
      (selectedStatus === "all" || student.status === selectedStatus) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;
      
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  
  // Function to handle adding a new student
  const handleAddStudent = () => {
    // Validate form
    if (!newStudent.name.trim() || !newStudent.class || !newStudent.rollNo.trim() || 
        !newStudent.email.trim() || !newStudent.parentName.trim() || !newStudent.phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Add student logic would go here (connect to backend)
    toast.success("Student added successfully!");
    setShowAddStudentDialog(false);
    
    // Reset form
    setNewStudent({
      name: "",
      class: "",
      rollNo: "",
      email: "",
      parentName: "",
      phone: "",
    });
  };
  
  // Function to handle input change for new student form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };
  
  // Function to handle select change for new student form
  const handleSelectChange = (name: string, value: string) => {
    setNewStudent({ ...newStudent, [name]: value });
  };
  
  // Function to get performance badge color
  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case 'average':
        return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
      case 'needs_improvement':
        return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <TeacherPageContainer>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Students</h1>
          <p className="text-gray-600">View, add, and manage all student information</p>
        </div>
        <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter student details to add them to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={newStudent.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={newStudent.class}
                    onValueChange={(value) => handleSelectChange("class", value)}
                  >
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Class 6">Class 6</SelectItem>
                      <SelectItem value="Class 7">Class 7</SelectItem>
                      <SelectItem value="Class 8">Class 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input
                    id="rollNo"
                    name="rollNo"
                    placeholder="e.g. C6-001"
                    value={newStudent.rollNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="student@example.com"
                    value={newStudent.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent Name</Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    placeholder="Enter parent name"
                    value={newStudent.parentName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="e.g. 9876543210"
                    value={newStudent.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>Cancel</Button>
              <Button onClick={handleAddStudent} className="bg-indigo-600 hover:bg-indigo-700">Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Student Directory</CardTitle>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Selected
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <CardDescription>
            Manage all students across different classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-1 items-center gap-2 relative">
              <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-8" 
                placeholder="Search by name, roll number, or email" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Class 6">Class 6</SelectItem>
                  <SelectItem value="Class 7">Class 7</SelectItem>
                  <SelectItem value="Class 8">Class 8</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Student Name
                      {sortColumn === "name" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("class")}>
                    <div className="flex items-center">
                      Class
                      {sortColumn === "class" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("rollNo")}>
                    <div className="flex items-center">
                      Roll No
                      {sortColumn === "rollNo" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Parent Contact</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("joinDate")}>
                    <div className="flex items-center">
                      Join Date
                      {sortColumn === "joinDate" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No students found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-medium text-sm">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex flex-col">
                            <span>{student.name}</span>
                            <span className="text-xs text-gray-500">{student.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{student.parentName}</span>
                          <span className="text-xs text-gray-500">{student.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.joinDate}</TableCell>
                      <TableCell>
                        {student.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {getPerformanceBadge(student.performance)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </TeacherPageContainer>
  );
};

export default TeacherStudents;
