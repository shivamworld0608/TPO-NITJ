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
        console.log("shortlisting students");
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/add-shortlist-students`,
        { jobId, stepIndex, students },
        { withCredentials: true }
      );
      toast.success('Students shortlisted successfully.');
      onClose();
    } catch (error) {
      console.error('Error shortlisting students:', error);
      toast.error('Failed to shortlist students.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Shortlist Students</h2>
      {students.map((student, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Student Name"
            value={student.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            placeholder="Student Email"
            value={student.email}
            onChange={(e) => handleInputChange(index, 'email', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            className="mt-2 text-red-500"
            onClick={() => handleRemoveStudent(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddStudent}
      >
        Add More Students
      </button>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default ShortlistStudents;
