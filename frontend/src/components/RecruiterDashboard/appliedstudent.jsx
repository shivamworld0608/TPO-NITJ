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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-2xl mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Applied Students</h1>
        <div className="flex space-x-4">
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={exportToExcel}
          >
            Download Excel
          </button>
          <button
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={onBack}
          >
            Back to Job Details
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="border border-gray-200 px-6 py-4 text-left text-blue-800 font-semibold">
                Student Name
              </th>
              {submissions[0]?.fields.map((field, index) => (
                <th
                  key={index}
                  className="border border-gray-200 px-6 py-4 text-left text-blue-800 font-semibold"
                >
                  {field.fieldName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all duration-200">
                <td className="border border-gray-200 px-6 py-4 text-gray-700">
                  {submission.studentId.name}
                </td>
                {submission.fields.map((field, fieldIndex) => (
                  <td
                    key={fieldIndex}
                    className="border border-gray-200 px-6 py-4 text-gray-700"
                  >
                    {field.value}
                  </td>
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