import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const AppliedStudents = ({ jobId, onBack }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/api/form-submissions/recruiter/${jobId}`,
          { withCredentials: true }
        );
        setSubmissions(response.data);
      } catch (err) {
        setError('Failed to load submissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [jobId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const exportToExcel = () => {
    const data = submissions.map((submission) => {
      const formattedFields = submission.fields.reduce((acc, field) => {
        acc[field.fieldName] = field.value;
        return acc;
      }, {});
      return { ...formattedFields, StudentName: submission.studentId.name };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Applied_Students.xlsx');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Applied Students</h1>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-green-600"
        onClick={exportToExcel}
      >
        Download Excel
      </button>
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-600"
        onClick={onBack}
      >
        Back to Job Details
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              {submissions[0]?.fields.map((field, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">{field.fieldName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{submission.studentId.name}</td>
                {submission.fields.map((field, fieldIndex) => (
                  <td key={fieldIndex} className="border border-gray-300 px-4 py-2">{field.value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedStudents;
