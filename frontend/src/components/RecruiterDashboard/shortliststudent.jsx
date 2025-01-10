import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ShortlistStudents = ({ jobId, stepIndex, onClose }) => {
  const [students, setStudents] = useState([{ name: '', email: '' }]);

  const handleInputChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const handleAddStudent = () => {
    setStudents([...students, { name: '', email: '' }]);
  };

  const handleRemoveStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      console.log('Shortlisting students...');
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/add-shortlist-students`,
        { jobId, stepIndex, students },
        { withCredentials: true }
      );
      toast.success('Students shortlisted successfully!');
      onClose();
    } catch (error) {
      console.error('Error shortlisting students:', error);
      toast.error('Failed to shortlist students.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">Shortlist Students</h2>

      {/* Student Input Fields */}
      {students.map((student, index) => (
        <div
          key={index}
          className="mb-6 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300"
        >
          <input
            type="text"
            placeholder="Student Name"
            value={student.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 mb-4"
          />
          <input
            type="email"
            placeholder="Student Email"
            value={student.email}
            onChange={(e) => handleInputChange(index, 'email', e.target.value)}
            className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
          <button
            className="mt-4 text-red-500 hover:text-red-600 transition-all duration-300"
            onClick={() => handleRemoveStudent(index)}
          >
            Remove Student
          </button>
        </div>
      ))}

      {/* Add More Students Button */}
      <button
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        onClick={handleAddStudent}
      >
        Add More Students
      </button>

      {/* Submit and Cancel Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShortlistStudents;