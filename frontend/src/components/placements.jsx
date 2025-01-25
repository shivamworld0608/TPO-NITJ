import React, { useState, useEffect } from "react";
import axios from "axios";

const PlacementCard = ({ placement = { placement } }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllStudents, setShowAllStudents] = useState(false);

  const {
    company_name = "",
    placement_type = "",
    batch = "",
    degree = "",
    ctc = 0,
    shortlisted_students = [],
  } = placement;

  if (!placement || Object.keys(placement).length === 0) {
    return null;
  }

  const displayedStudents = showAllStudents
    ? shortlisted_students
    : shortlisted_students.slice(0, 3);

  const formattedCTC = ctc
    ? ctc >= 10000000
      ? `${(ctc / 10000000).toFixed(2)} Cr`
      : `${(ctc / 100000).toFixed(2)} LPA`
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Header Section */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 text-lg font-semibold">
              {company_name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {company_name}
              </h3>
              <div className="flex flex-wrap items-center mt-1 gap-2 text-gray-600 text-base">
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 16l-4-4 4-4" />
                    <path d="M14 8l4 4-4 4" />
                  </svg>

                  <span>{placement_type}</span>
                  <span className="text-gray-300">|</span>
                </div>
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>

                  <span>{batch}</span>
                  <span className="text-gray-300">|</span>
                </div>
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>

                  <span>{degree}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 text-white text-base font-semibold px-3 py-1 rounded shadow">
            {formattedCTC}
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="p-4">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-md"
        >
          <span className="font-medium text-gray-700 text-lg">
            Shortlisted Students ({shortlisted_students.length})
          </span>
          <span
            className="text-gray-400 transition-transform duration-200"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </div>

        {isExpanded && (
          <div className="mt-2 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedStudents.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-600 text-base font-medium">
                    {student?.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-base truncate">
                      {student?.name || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {student?.department || "N/A"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {shortlisted_students.length > 3 && (
              <button
                onClick={() => setShowAllStudents(!showAllStudents)}
                className="w-full mt-2 py-2 text-base font-medium text-gray-600 
                         bg-gray-50 hover:bg-gray-100 rounded-md transition-colors
                         border border-gray-200"
              >
                {showAllStudents
                  ? "Show Less"
                  : `Show ${shortlisted_students.length - 3} More Students`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Insights = () => {
  const [filters, setFilters] = useState({
    company_name: "",
    student_name: "",
    placement_type: "",
    batch: "",
    degree: "",
    gender: "",
    department: "",
    ctc: "",
  });

  const [placements, setPlacements] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    studentsPlaced: 0,
    placementPercentage: 0,
  });

  const fetchPlacements = async (updatedFilters) => {
    try {
      // Construct query parameters from filters
      const queryParams = new URLSearchParams(
        Object.entries(updatedFilters).filter(([_, value]) => value !== "")
      ).toString();

      console.log(queryParams);

      const apiUrl = `${
        import.meta.env.REACT_APP_BASE_URL
      }/placements/filter?${queryParams}`;

      const response = await axios.get(apiUrl);
      // console.log(response.data);
      setPlacements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch placements whenever filters are updated
  useEffect(() => {
    fetchPlacements(filters);
  }, [filters]);

  // Update stats whenever placements change
  useEffect(() => {
    const totalStudents = placements.reduce(
      (acc, placement) => acc + placement.shortlisted_students.length,
      0
    );
    const studentsPlaced = placements.reduce(
      (acc, placement) => acc + placement.shortlisted_students.length,
      0
    );
    const placementPercentage =
      totalStudents > 0
        ? ((studentsPlaced / totalStudents) * 100).toFixed(2)
        : 0;

    setStats({
      totalStudents,
      studentsPlaced,
      placementPercentage,
    });
  }, [placements]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      company_name: "",
      student_name: "",
      placement_type: "",
      batch: "",
      degree: "",
      gender: "",
      department: "",
      ctc: "",
    });
    fetchPlacements({});
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide mb-2">
        Placement{" "}
        <span className="bg-custom-blue text-transparent bg-clip-text">
          Insights
        </span>
      </h1>

      {/* Filters Section */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Company Name Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={filters.company_name}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Google"
            />
          </div>

          {/* Student Name Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name
            </label>
            <input
              type="text"
              name="student_name"
              value={filters.student_name}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Raghav"
            />
          </div>

          {/* Batch Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch
            </label>
            <select
              name="batch"
              value={filters.batch}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All</option>
              {[
                "2022",
                "2023",
                "2024",
                "2025",
                "2026",
                "2027",
                "2028",
                "2029",
                "2030",
              ].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All</option>
              {[
                "CSE",
                "ECE",
                "EE",
                "ME",
                "CE",
                "IT",
                "CH",
                "ICE",
                "BT",
                "TT",
                "IPE",
                "DS",
                "VLSI",
                "AI",
                "HM",
              ].map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Placement Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placement Type
            </label>
            <select
              name="placement_type"
              value={filters.placement_type}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Tech">Tech</option>
              <option value="Non-Tech">Non-Tech</option>
            </select>
          </div>

          {/* Degree Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree
            </label>
            <select
              name="degree"
              value={filters.degree}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* CTC Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTC
            </label>
            <select
              name="ctc"
              value={filters.ctc}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All</option>
              <option value="one">Less than 10 LPA</option>
              <option value="two">10-20 LPA</option>
              <option value="three">Greater than 20 LPA</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-6 text-right">
          <button
            onClick={handleClearFilters}
            className="px-6 py-3 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition duration-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Big Buttons Section */}
      <div className="flex justify-center gap-6 mb-8">
        <button className="w-1/3 bg-blue-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
          Students Placed: {stats.studentsPlaced}
        </button>
        <button className="w-1/3 bg-green-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-green-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
          Total Students: {stats.totalStudents}
        </button>
        <button className="w-1/3 bg-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-indigo-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
          Placement %: {stats.placementPercentage}%
        </button>
      </div>

      {/* Insights Section */}
      {/* Placements Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {placements.length > 0 ? (
          placements.map((placement) => (
            <div
              key={placement.id}
              className="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <PlacementCard placement={placement} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No placements found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Insights;
