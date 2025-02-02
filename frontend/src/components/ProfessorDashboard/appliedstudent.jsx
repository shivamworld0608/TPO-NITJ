import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { UserX, X } from "lucide-react";
import { Button } from "../ui/button";

const AppliedStudentp = ({ jobId, onClose }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/api/form-submissions/${jobId}`,
          { withCredentials: true }
        );
        setSubmissions(response.data);
      } catch (err) {
        setError("Failed to load submissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [jobId]);

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${filename}.xlsx`);
  };

  const handleExport = () => {
    const data = submissions.map((submission) => {
      const formattedFields = submission.fields.reduce((acc, field) => {
        acc[field.fieldName] = field.value;
        return acc;
      }, {});
      return { ...formattedFields, Resume: submission.resumeUrl };
    });
    exportToExcel(data, "Professor_Submissions");
  };

  const handleRemove = async (submissionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently remove the student.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${
              import.meta.env.REACT_APP_BASE_URL
            }/api/form-submissions/${submissionId}`,
            { withCredentials: true }
          );
          setSubmissions(
            submissions.filter((submission) => submission._id !== submissionId)
          );
          Swal.fire("Removed!", "The student has been removed.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire(
            "Error!",
            "There was an error removing the student.",
            "error"
          );
        }
      }
    });
  };

  const handleRemoveAll = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently remove all students.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove all!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${
              import.meta.env.REACT_APP_BASE_URL
            }/api/form-submissions/delete-all/${jobId}`,
            { withCredentials: true }
          );
          setSubmissions([]);
          Swal.fire("Removed!", "All students have been removed.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire(
            "Error!",
            "There was an error removing the students.",
            "error"
          );
        }
      }
    });
  };

  const handleMakeVisibleToAll = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "All students will be made visible to the recruiter.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make visible!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedSubmissions = submissions.map((submission) => ({
            ...submission,
            isVisible: true,
          }));
          await axios.patch(
            `${
              import.meta.env.REACT_APP_BASE_URL
            }/api/form-submissions/make-visible/${jobId}`,
            { isVisible: true },
            { withCredentials: true }
          );
          setSubmissions(updatedSubmissions);
          Swal.fire(
            "Made Visible!",
            "All students are now visible to the recruiter.",
            "success"
          );
        } catch (err) {
          console.error(err);
          Swal.fire(
            "Error!",
            "There was an error making the students visible.",
            "error"
          );
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <svg
            className="w-16 h-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose} // Corrected this line
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
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Students Applied</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          onClick={handleExport}
        >
          Download Excel
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          onClick={handleRemoveAll}
        >
          Remove All Students
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleMakeVisibleToAll}
        >
          Make All Visible to Recruiter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              {submissions[0]?.fields.map((field, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 bg-gray-50"
                >
                  {field.fieldName}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2 bg-gray-50">
                Resume
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {submission.fields.map((field, fieldIndex) => (
                  <td
                    key={fieldIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {field.value}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-grren-700 transition-colors"
                    onClick={() => {
                      const url = submission.resumeUrl.startsWith("http")
                        ? others_link
                        : `https://${submission.resumeUrl}`;
                      window.open(url, "_blank");
                    }}
                  >
                    View
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => handleRemove(submission._id)}
                  >
                    Remove
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

export default AppliedStudentp;
