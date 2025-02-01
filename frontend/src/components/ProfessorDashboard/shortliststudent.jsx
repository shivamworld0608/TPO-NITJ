import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const ShortlistStudents = ({ jobId, stepIndex, onClose }) => {
  const [students, setStudents] = useState([]);
  const [uploadMethod, setUploadMethod] = useState('shortlist');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (uploadMethod === 'shortlist') {
      const fetchEligibleStudents = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/eligible_students`,
            { jobId, stepIndex },
            { withCredentials: true }
          );
          const updatedStudents = response.data.eligibleStudents.map((student) => ({
            ...student,
            shortlisted: false,
            absent: false,
          }));
          setStudents(updatedStudents);
        } catch (err) {
          console.error('Error fetching eligible students:', err);
          toast.error('Failed to fetch eligible students');
        } finally {
          setLoading(false);
        }
      };
      fetchEligibleStudents();
    }
  }, [uploadMethod, jobId, stepIndex]);

  const handleCheckboxChange = (index, field) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = !updatedStudents[index][field];
    if (field === 'shortlisted' && updatedStudents[index].shortlisted) {
      updatedStudents[index].absent = false;
    } else if (field === 'absent' && updatedStudents[index].absent) {
      updatedStudents[index].shortlisted = false;
    }
    setStudents(updatedStudents);
  };

  const handleBulkAction = (action) => {
    const updatedStudents = students.map(student => ({
      ...student,
      shortlisted: action === 'shortlist',
      absent: action === 'absent'
    }));
    setStudents(updatedStudents);
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

        const transformedData = data.map((row) => ({
          name: row.name || row.Name || '',
          email: row.email || row.Email || '',
          shortlisted: row.shortlisted || false,
          absent: row.absent || false,
        })).filter((student) => student.name && student.email);

        if (transformedData.length === 0) {
          toast.error('No valid data found in Excel file. Ensure columns are named "name" and "email".');
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
    const ws = XLSX.utils.json_to_sheet([{ name: '', email: '', shortlisted: '', absent: '' }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'student_template.xlsx');
  };

  const handleSubmit = async () => {
    const shortlistedStudents = students.filter((student) => student.shortlisted|| student.absent || uploadMethod !== 'shortlist');
    if (shortlistedStudents.length === 0) {
      toast.error('No students have been added or shortlisted');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/add-shortlist-students`,
        { jobId, stepIndex, students: shortlistedStudents },
        { withCredentials: true }
      );
      toast.success('Students processed successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting students:', error);
      toast.error('Failed to submit students.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
      {/* Upload Method Toggle */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            uploadMethod === 'shortlist' ? 'bg-custom-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setUploadMethod('shortlist')}
        >
          Select Manually
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            uploadMethod === 'excel' ? 'bg-custom-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setUploadMethod('excel')}
        >
          Upload Excel
        </button>
      </div>

      {/* Upload Excel */}
      {uploadMethod === 'excel' && (
        <div className="mb-6 border rounded-3xl py-4 shadow">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleExcelUpload}
            className="mb-4"
          />
          <button
            className="bg-custom-blue text-white px-4 py-2 rounded-lg"
            onClick={downloadTemplate}
          >
            Download Template
          </button>
        </div>
      )}

      {/* Shortlist */}
      {uploadMethod === 'shortlist' && students.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <div className="mb-4 flex space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() => handleBulkAction('shortlist')}
            >
              Shortlist All
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => handleBulkAction('absent')}
            >
              Mark All Absent
            </button>
          </div>
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border text-center">Shortlisted</th>
                <th className="px-4 py-2 border text-center">Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border">{student.email}</td>
                  <td className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      checked={student.shortlisted}
                      onChange={() => handleCheckboxChange(index, 'shortlisted')}
                    />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      checked={student.absent}
                      onChange={() => handleCheckboxChange(index, 'absent')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit and Cancel Buttons */}
      <div className="mt-8 flex space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShortlistStudents;