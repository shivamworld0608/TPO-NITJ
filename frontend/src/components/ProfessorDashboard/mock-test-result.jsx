import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { X, Download } from 'lucide-react';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ResultAnalysis = ({ assessmentId, onClose }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('totalScore');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/${assessmentId}/results`,
          { withCredentials: true }
        );
        setResults(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch results:', error);
        setLoading(false);
      }
    };
    fetchResults();
  }, [assessmentId]);

  // Sorting logic
  const sortResults = (field) => {
    const order = sortField === field && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortOrder(order);

    const sorted = [...results].sort((a, b) => {
      if (field === 'student.name') {
        return order === 'asc'
          ? a.student.name.localeCompare(b.student.name)
          : b.student.name.localeCompare(a.student.name);
      }
      return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
    });
    setResults(sorted);
  };

  // Filtering logic
  const filteredResults = filterStatus === 'all' ? results : results.filter((r) => r.status === filterStatus);

  // Chart Data Preparation
  const scoreDistributionData = {
    labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
    datasets: [
      {
        label: 'Score Distribution',
        data: [
          filteredResults.filter((r) => r.totalScore <= 20).length,
          filteredResults.filter((r) => r.totalScore > 20 && r.totalScore <= 40).length,
          filteredResults.filter((r) => r.totalScore > 40 && r.totalScore <= 60).length,
          filteredResults.filter((r) => r.totalScore > 60 && r.totalScore <= 80).length,
          filteredResults.filter((r) => r.totalScore > 80).length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const statusPieData = {
    labels: ['Ongoing', 'Completed'],
    datasets: [
      {
        data: [
          filteredResults.filter((r) => r.status === 'ongoing').length,
          filteredResults.filter((r) => r.status === 'completed').length,
        ],
        backgroundColor: ['#FF9F40', '#4CAF50'],
      },
    ],
  };

  // Statistics
  const avgScore = filteredResults.length
    ? (filteredResults.reduce((sum, r) => sum + r.totalScore, 0) / filteredResults.length).toFixed(2)
    : 0;
  const maxScore = filteredResults.length ? Math.max(...filteredResults.map((r) => r.totalScore)) : 0;
  const minScore = filteredResults.length ? Math.min(...filteredResults.map((r) => r.totalScore)) : 0;
  const completionRate =
    filteredResults.length > 0
      ? (
          (filteredResults.filter((r) => r.status === 'completed').length / filteredResults.length) * 100
        ).toFixed(2)
      : 0;

  // Download CSV
  const downloadCSV = () => {
    const headers = ['Rank,Name,Email,Score,Status,Tab Switches,Copy-Paste,Start Time,End Time'];
    const rows = filteredResults.map((r) => [
      r.rank,
      r.student.name,
      r.student.email,
      r.totalScore,
      r.status,
      r.tabSwitches,
      r.copyPaste,
      new Date(r.startTime).toLocaleString(),
      r.endTime ? new Date(r.endTime).toLocaleString() : 'N/A',
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Assessment_${assessmentId}_Results.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl m-6 p-8 animate-fade-in-down">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-custom-blue">Result Analysis</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-indigo-50 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-indigo-700">Average Score</h3>
            <p className="text-2xl font-bold text-indigo-900">{avgScore}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-green-700">Max Score</h3>
            <p className="text-2xl font-bold text-green-900">{maxScore}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-red-700">Min Score</h3>
            <p className="text-2xl font-bold text-red-900">{minScore}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-purple-700">Completion Rate</h3>
            <p className="text-2xl font-bold text-purple-900">{completionRate}%</p>
          </div>
        </div>

        {/* Filter and Download */}
        <div className="flex justify-between items-center mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={downloadCSV}
            className="flex items-center px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={16} className="mr-2" /> Download CSV
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Score Distribution</h3>
            <Bar
              data={scoreDistributionData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' }, title: { display: false } },
              }}
            />
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Status Breakdown</h3>
            <Pie
              data={statusPieData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' }, title: { display: false } },
              }}
            />
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th
                  className="p-4 cursor-pointer hover:bg-indigo-200"
                  onClick={() => sortResults('rank')}
                >
                  Rank {sortField === 'rank' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="p-4 cursor-pointer hover:bg-indigo-200"
                  onClick={() => sortResults('student.name')}
                >
                  Name {sortField === 'student.name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4">Email</th>
                <th
                  className="p-4 cursor-pointer hover:bg-indigo-200"
                  onClick={() => sortResults('totalScore')}
                >
                  Score {sortField === 'totalScore' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="p-4 cursor-pointer hover:bg-indigo-200"
                  onClick={() => sortResults('status')}
                >
                  Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="p-4 cursor-pointer hover:bg-indigo-200"
                  onClick={() => sortResults('tabSwitches')}
                >
                  Tab Switches {sortField === 'tabSwitches' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="p-4 cursor-pointer hover:bg-indigo-200"
                  onClick={() => sortResults('copyPaste')}
                >
                  Copy-Paste {sortField === 'copyPaste' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{result.rank}</td>
                  <td className="p-4">{result.student.name}</td>
                  <td className="p-4">{result.student.email}</td>
                  <td className="p-4">{result.totalScore}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        result.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {result.status}
                    </span>
                  </td>
                  <td className="p-4">{result.tabSwitches}</td>
                  <td className="p-4">{result.copyPaste}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultAnalysis;