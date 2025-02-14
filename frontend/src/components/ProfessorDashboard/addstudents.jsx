import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddStudentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    rollno: '',
    cgpa: '',
    password: '',
    gender: '',
    course: '',
    department: '',
    batch: '',
    disability: false,
    activeBacklogs: false,
    backlogsHistory: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudentData({
      ...studentData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);
    set
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/add-student`,studentData, {withCredentials: true});
          setStudentData({
              name: '',
              email: '',
              rollno: '',
              cgpa: '',
              password: '',
              gender: '',
              course: '',
              department: '',
              batch: '',
              disability: false,
              activeBacklogs: false,
              backlogsHistory: false,
            });
        toast.success("Student added successfully");
    } catch (error) {
      toast.error("Email already registered");
      console.error('Error:', error);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Student</h2>
      <form  className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Roll No</label>
          <input
            type="text"
            name="rollno"
            value={studentData.rollno}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CGPA</label>
          <input
            type="text"
            name="cgpa"
            value={studentData.cgpa}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="text"
            name="password"
            value={studentData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <input
            type="text"
            name="course"
            value={studentData.course}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            name="department"
            value={studentData.department}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Batch</label>
          <input
            type="text"
            name="batch"
            value={studentData.batch}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Disability</label>
          <input
            type="checkbox"
            name="disability"
            checked={studentData.disability}
            onChange={handleChange}
            className="mt-1 block"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Active Backlogs</label>
          <input
            type="checkbox"
            name="activeBacklogs"
            checked={studentData.activeBacklogs}
            onChange={handleChange}
            className="mt-1 block"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Backlogs History</label>
          <input
            type="checkbox"
            name="backlogsHistory"
            checked={studentData.backlogsHistory}
            onChange={handleChange}
            className="mt-1 block"
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isSubmitting ? 'Adding Student...' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;