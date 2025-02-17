import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { X, UserX } from 'lucide-react';
import { Button } from '../ui/button';

const AppliedStudents = ({ jobId, onClose }) => {
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const exportToExcel = () => {
    if (submissions.length === 0) return;
    
    const data = submissions.map((submission) => {
      const formattedFields = submission.fields.reduce((acc, field) => {
        acc[field.fieldName] = field.value;
        return acc;
      }, {});
      return { ...formattedFields, Resume: submission.resumeUrl };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'NITJ_Applied_Students.xlsx');
  };

  if (submissions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex flex-col items-center justify-center py-12">
          <UserX className="w-24 h-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Applications Yet
          </h2>
          <p className="text-gray-500 text-center mb-6">
            No student applied yet for this position.
            <br />
            Check back later for new submissions.
          </p>
          <div className="w-32 h-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-2xl mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-custom-blue">Applied Students</h1>
        <div className="flex space-x-4">
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={exportToExcel}
          >
            Download Excel
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              {submissions[0].fields.map((field, index) => (
                <th
                  key={index}
                  className="border border-gray-200 px-6 py-4 text-left text-custom-blue font-semibold"
                >
                  {field.fieldName}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2 bg-gray-50">Resume</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all duration-200">
                {submission.fields.map((field, fieldIndex) => (
                  <td
                    key={fieldIndex}
                    className="border border-gray-200 px-6 py-4 text-gray-700"
                  >
                    {field.value}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    onClick={() => {
                      const url = submission.resumeUrl.startsWith("http") ? submission.resumeUrl : `https://${submission.resumeUrl}`;
                      window.open(url, "_blank");
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedStudents;