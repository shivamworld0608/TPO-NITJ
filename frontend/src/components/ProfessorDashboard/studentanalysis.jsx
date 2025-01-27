import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const StudentAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    department: '',
    course: '',
    batch: '',
    cgpa: '',
    placementstatus: ''
  });
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/student-analysis/get`,
          { withCredentials: true }
        );
        setData(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch students.");
      }
    };

    fetchStudents();
  }, []);

  // Filter options
  const departmentOptions = [
    { value: 'All', label: 'All' },
    { value: 'CSE', label: 'CSE' },
    { value: 'ECE', label: 'ECE' },
    { value: 'EE', label: 'EE' },
    { value: 'ME', label: 'ME' },
    { value: 'CE', label: 'CE' },
    { value: 'IT', label: 'IT' },
    { value: 'CH', label: 'CH' },
    { value: 'ICE', label: 'ICE' },
    { value: 'BT', label: 'BT' },
    { value: 'TT', label: 'TT' },
    { value: 'IPE', label: 'IPE' }
  ];

  const courseOptions = [
    { value: 'All', label: 'All' },
    { value: 'B.Tech', label: 'B.Tech' },
    { value: 'M.Tech', label: 'M.Tech' },
    { value: 'MBA', label: 'MBA' },
    { value: 'M.Sc', label: 'M.Sc' },
    { value: 'PHD', label: 'PHD' }
  ];

  const cgpaOptions = [
    { value: 'All', label: 'All' },
    { value: '> 9.0', label: '> 9.0' },
    { value: '> 8.5', label: '> 8.5' },
    { value: '> 8.0', label: '> 8.0' },
    { value: '> 7.5', label: '> 7.5' },
    { value: '> 7.0', label: '> 7.0' }
  ];

  const placementStatusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Not Placed', label: 'Not Placed' },
    { value: 'Below Dream', label: 'Below Dream' },
    { value: 'Dream', label: 'Dream' },
    { value: 'Super Dream', label: 'Super Dream' }
  ];

  // Filter students based on criteria
  const filteredStudents = data.filter(student => {
    return (
      (filters.department === '' || filters.department === 'All' || student.department === filters.department) &&
      (filters.course === '' || filters.course === 'All' || student.course === filters.course) &&
      (filters.batch === '' || student.batch === filters.batch) &&
      (filters.cgpa === '' || filters.cgpa === 'All' || 
        parseFloat(student.cgpa) > parseFloat(filters.cgpa.replace('> ', ''))) &&
      (filters.placementstatus === '' || filters.placementstatus === 'All' || 
        student.placementstatus === filters.placementstatus)
    );
  });

  // Generate assessment data for charts
  const getAssessmentData = (student) => {
    if (!student) return [];
    
    return Object.entries(student.assessments).map(([type, data]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      total: data.total,
      shortlisted: data.shortlisted,
      rejected: data.rejected,
      absent: data.absent
    }));
  };

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Select
            options={departmentOptions}
            value={filters.department}
            onValueChange={(value) => setFilters({ ...filters, department: value })}
            placeholder="Select Department"
          />

          <Select
            options={courseOptions}
            value={filters.course}
            onValueChange={(value) => setFilters({ ...filters, course: value })}
            placeholder="Select Course"
          />

          <Input
            placeholder="Batch (e.g., 2024)"
            value={filters.batch}
            onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
          />

          <Select
            options={cgpaOptions}
            value={filters.cgpa}
            onValueChange={(value) => setFilters({ ...filters, cgpa: value })}
            placeholder="Select CGPA Criteria"
          />

          <Select
            options={placementStatusOptions}
            value={filters.placementstatus}
            onValueChange={(value) => setFilters({ ...filters, placementstatus: value })}
            placeholder="Select Placement Status"
          />
        </div>
      </Card>

      {/* Students List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map(student => (
          <Dialog key={student._id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{student.name}</h3>
                  <p className="text-sm text-gray-600">Batch: {student.batch}</p>
                  <p className="text-sm text-gray-600">{student.department} - {student.course}</p>
                  <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm ${
                    student.placementstatus === 'Super Dream' ? 'bg-green-100 text-green-800' :
                    student.placementstatus === 'Dream' ? 'bg-blue-100 text-blue-800' :
                    student.placementstatus === 'Below Dream' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {student.placementstatus}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Student Analysis - {student.name}</DialogTitle>
              </DialogHeader>
              
              {/* Student Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Personal Details</h4>
                  <p>Roll No: {student.rollno}</p>
                  <p>Email: {student.email}</p>
                  <p>Department: {student.department}</p>
                  <p>Course: {student.course}</p>
                  <p>CGPA: {student.cgpa}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Application Summary</h4>
                  <p>Total Applications: {student.applications.total}</p>
                  <p>Placement Status: {student.placementstatus}</p>
                </div>
              </div>

              {/* Assessment Performance Chart */}
              <div className="h-64 mb-6">
                <h4 className="font-semibold mb-2">Assessment Performance</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getAssessmentData(student)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" name="Total" />
                    <Bar dataKey="shortlisted" fill="#82ca9d" name="Shortlisted" />
                    <Bar dataKey="rejected" fill="#ff8042" name="Rejected" />
                    <Bar dataKey="absent" fill="#ffc658" name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Applications Breakdown */}
              <div>
                <h4 className="font-semibold mb-2">Applied Jobs</h4>
                <div className="grid grid-cols-1 gap-2">
                  {student.applications.jobProfiles.map((job, index) => (
                    <Card key={index} className="p-3">
                      <p className="font-medium">{job.company_name}</p>
                      <p className="text-sm text-gray-600">{job.job_role}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {job.job_type}
                        </span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {job.job_class}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default StudentAnalyticsDashboard;