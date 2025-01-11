import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const ShortlistStudents = ({ jobId, stepIndex, onClose }) => {
  const [students, setStudents] = useState([{ name: '', email: '' }]);
  const [uploadMethod, setUploadMethod] = useState('manual'); // 'manual' or 'excel'

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

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Validate and transform the data
        const transformedData = data.map(row => ({
          name: row.name || row.Name || '',
          email: row.email || row.Email || ''
        })).filter(student => student.name && student.email);

        if (transformedData.length === 0) {
          toast.error('No valid data found in Excel file. Please ensure columns are named "name" and "email"');
          return;
        }

        setStudents(transformedData);
        toast.success(`Successfully loaded ${transformedData.length} students`);
      } catch (error) {
        console.error('Error processing Excel file:', error);
        toast.error('Error processing Excel file. Please check the format.');
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
    };

    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([{ name: '', email: '' }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'student_template.xlsx');
  };

  const handleSubmit = async () => {
    // Validate students data
    const invalidStudents = students.filter(s => !s.name || !s.email);
    if (invalidStudents.length > 0) {
      toast.error('Please fill in all student details');
      return;
    }

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
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">Shortlist Students</h2>

      {/* Upload Method Toggle */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            uploadMethod === 'manual'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setUploadMethod('manual')}
        >
          Manual Entry
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            uploadMethod === 'excel'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setUploadMethod('excel')}
        >
          Excel Upload
        </button>
      </div>

      {uploadMethod === 'excel' ? (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={downloadTemplate}
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Download Excel Template
            </button>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelUpload}
              className="w-full max-w-xs"
            />
            <p className="text-sm text-gray-500">
              Upload Excel file with columns: name, email
            </p>
          </div>
        </div>
      ) : (
        <>
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

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={handleAddStudent}
          >
            Add More Students
          </button>
        </>
      )}

      {/* Preview of Excel Data */}
      {uploadMethod === 'excel' && students.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Students Preview</h3>
          <div className="max-h-60 overflow-y-auto">
            {students.map((student, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded mb-2">
                <p>Name: {student.name}</p>
                <p>Email: {student.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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