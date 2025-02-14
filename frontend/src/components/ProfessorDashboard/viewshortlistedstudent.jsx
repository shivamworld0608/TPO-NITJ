import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const ViewShortlistStudents = ({ jobId, stepIndex, onClose }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchEligibleStudents = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/shortlisted_students`,
          { jobId, stepIndex },
          { withCredentials: true }
        );
        const updatedStudents = response.data.shortlistedStudents.map((student) => ({
          ...student,
        }));
        setStudents(updatedStudents);
      } catch (err) {
        console.error('Error fetching shortlisted students:', err);
        toast.error('Failed to fetch shortlisted students');
      }
    };
    fetchEligibleStudents();
  }, [jobId, stepIndex]);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shortlisted Students');
    XLSX.writeFile(workbook, 'shortlisted_students.xlsx');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
      {/* Back Arrow */}
      <div className="mb-6 cursor-pointer" onClick={onClose}>
        <FaArrowLeft className="text-xl text-gray-700 hover:text-gray-900" />
      </div>

      {/* Download Excel Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleDownloadExcel}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <FaFileExcel className="mr-2" />
          Download Excel
        </button>
      </div>

      {students.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewShortlistStudents;