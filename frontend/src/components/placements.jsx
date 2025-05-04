import { CSVLink } from 'react-csv';
import React, { useState, useEffect } from "react";
import axios from "axios";

const btechdepartmentOptions = [
  {
    label: "BIO TECHNOLOGY",
    options: [{ value: "BIO TECHNOLOGY", label: "BIO TECHNOLOGY" }],
  },
  {
    label: "CHEMICAL ENGINEERING",
    options: [{ value: "CHEMICAL ENGINEERING", label: "CHEMICAL ENGINEERING" }],
  },
  {
    label: "CIVIL ENGINEERING",
    options: [{ value: "CIVIL ENGINEERING", label: "CIVIL ENGINEERING" }],
  },
  {
    label: "COMPUTER SCIENCE AND ENGINEERING",
    options: [
      {
        value: "COMPUTER SCIENCE AND ENGINEERING",
        label: "COMPUTER SCIENCE AND ENGINEERING",
      },
      {
        value: "DATA SCIENCE AND ENGINEERING",
        label: "DATA SCIENCE AND ENGINEERING",
      },
    ],
  },
  {
    label: "ELECTRICAL ENGINEERING",
    options: [
      { value: "ELECTRICAL ENGINEERING", label: "ELECTRICAL ENGINEERING" },
    ],
  },
  {
    label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    options: [
      {
        value: "ELECTRONICS AND COMMUNICATION ENGINEERING",
        label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
      },
      {
        value: "ELECTRONICS AND VLSI ENGINEERING",
        label: "ELECTRONICS AND VLSI ENGINEERING",
      },
    ],
  },
  {
    label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
    options: [
      {
        value: "INDUSTRIAL AND PRODUCTION ENGINEERING",
        label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
      },
    ],
  },
  {
    label: "INFORMATION TECHNOLOGY",
    options: [
      { value: "INFORMATION TECHNOLOGY", label: "INFORMATION TECHNOLOGY" },
    ],
  },
  {
    label: "INSTRUMENTATION AND CONTROL ENGINEERING",
    options: [
      {
        value: "INSTRUMENTATION AND CONTROL ENGINEERING",
        label: "INSTRUMENTATION AND CONTROL ENGINEERING",
      },
    ],
  },
  {
    label: "MATHEMATICS AND COMPUTING",
    options: [
      {
        value: "MATHEMATICS AND COMPUTING",
        label: "MATHEMATICS AND COMPUTING",
      },
    ],
  },
  {
    label: "MECHANICAL ENGINEERING",
    options: [
      { value: "MECHANICAL ENGINEERING", label: "MECHANICAL ENGINEERING" },
    ],
  },
  {
    label: "TEXTILE TECHNOLOGY",
    options: [{ value: "TEXTILE TECHNOLOGY", label: "TEXTILE TECHNOLOGY" }],
  },
];

const mtechdepartmentOptions = [
  {
    label: "BIO TECHNOLOGY",
    options: [{ value: "BIO TECHNOLOGY", label: "BIO TECHNOLOGY" }],
  },
  {
    label: "CHEMICAL ENGINEERING",
    options: [{ value: "CHEMICAL ENGINEERING", label: "CHEMICAL ENGINEERING" }],
  },
  {
    label: "CIVIL ENGINEERING",
    options: [
      {
        value: "STRUCTURAL AND CONSTRUCTION ENGINEERING",
        label: "STRUCTURAL AND CONSTRUCTION ENGINEERING",
      },
      {
        value: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING",
        label: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING",
      },
    ],
  },
  {
    label: "COMPUTER SCIENCE AND ENGINEERING",
    options: [
      {
        value: "COMPUTER SCIENCE AND ENGINEERING",
        label: "COMPUTER SCIENCE AND ENGINEERING",
      },
      {
        value: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)",
        label: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)",
      },
      {
        value: "DATA SCIENCE AND ENGINEERING",
        label: "DATA SCIENCE AND ENGINEERING",
      },
    ],
  },
  {
    label: "ELECTRICAL ENGINEERING",
    options: [
      { value: "ELECTRIC VEHICLE DESIGN", label: "ELECTRIC VEHICLE DESIGN" },
    ],
  },
  {
    label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    options: [
      {
        value: "SIGNAL PROCESSING AND MACHINE LEARNING",
        label: "SIGNAL PROCESSING AND MACHINE LEARNING",
      },
      { value: "VLSI DESIGN", label: "VLSI DESIGN" },
    ],
  },
  {
    label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
    options: [
      {
        value: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS",
        label: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS",
      },
    ],
  },
  {
    label: "INFORMATION TECHNOLOGY",
    options: [{ value: "DATA ANALYTICS", label: "DATA ANALYTICS" }],
  },
  {
    label: "CONTROL AND INSTRUMENTATION ENGINEERING",
    options: [
      {
        value: "CONTROL AND INSTRUMENTATION ENGINEERING",
        label: "CONTROL AND INSTRUMENTATION ENGINEERING",
      },
      {
        value: "MACHINE INTELLIGENCE AND AUTOMATION",
        label: "MACHINE INTELLIGENCE AND AUTOMATION",
      },
    ],
  },
  {
    label: "MATHEMATICS AND COMPUTING",
    options: [
      {
        value: "MATHEMATICS AND COMPUTING",
        label: "MATHEMATICS AND COMPUTING",
      },
    ],
  },
  {
    label: "MECHANICAL ENGINEERING",
    options: [
      { value: "DESIGN ENGINEERING", label: "DESIGN ENGINEERING" },
      {
        value: "THERMAL AND ENERGY ENGINEERING",
        label: "THERMAL AND ENERGY ENGINEERING",
      },
    ],
  },
  {
    label: "TEXTILE TECHNOLOGY",
    options: [
      {
        value: "TEXTILE TECHNOLOGY",
        label: "TEXTILE TECHNOLOGY",
      },
      {
        value: "TEXTILE ENGINEERING AND MANAGEMENT",
        label: "TEXTILE ENGINEERING AND MANAGEMENT",
      },
    ],
  },
  {
    label: "RENEWABLE ENERGY",
    options: [{ value: "RENEWABLE ENERGY", label: "RENEWABLE ENERGY" }],
  },
  {
    label: "ARTIFICIAL INTELLIGENCE",
    options: [
      { value: "ARTIFICIAL INTELLIGENCE", label: "ARTIFICIAL INTELLIGENCE" },
    ],
  },
  {
    label: "POWER SYSTEMS AND RELIABILITY",
    options: [
      {
        value: "POWER SYSTEMS AND RELIABILITY",
        label: "POWER SYSTEMS AND RELIABILITY",
      },
    ],
  },
];

const mbadepartmentOptions = [
  { value: "HUMANITIES AND MANAGEMENT", label: "HUMANITIES AND MANAGEMENT" },
];

const mscdepartmentOptions = [
  { value: "CHEMISTRY", label: "CHEMISTRY" },
  { value: "MATHEMATICS", label: "MATHEMATICS" },
  { value: "PHYSICS", label: "PHYSICS" },
];

const phddepartmentOptions = [];

const Icon = ({ type }) => {
  const icons = {
    company: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    type: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10 16l-4-4 4-4" />
        <path d="M14 8l4 4-4 4" />
      </svg>
    ),
    calendar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
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
    ),
    degree: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    department: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    gender: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="10" r="7"></circle>
        <path d="M12 17v7"></path>
        <path d="M7 22h10"></path>
      </svg>
    ),
    money: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
      >
        <text
          x="4.5"
          y="20"
          fontSize="25"
          fontFamily="Arial, sans-serif"
          fill="currentColor"
        >
          ₹
        </text>
      </svg>
    ),
    student: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    filter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    ),
    chevron: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    ),
    eye: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    )
  };

  return icons[type] || null;
};

// Stats card component
const LoadingSkeleton = () => (
  <div className="h-full w-full animate-pulse space-y-2">
    <div className="h-8 bg-current opacity-10 rounded-md w-24"></div>
    <div className="h-4 bg-current opacity-10 rounded-md w-32"></div>
    <div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
      -translate-x-full animate-[shimmer_2s_infinite] border-t border-white/10"
    ></div>
  </div>
);

const StatCard = ({
  value,
  label,
  bgColor,
  borderColor,
  textColor,
  icon,
  isLoading,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div
      className={`
        ${bgColor} 
        ${borderColor} 
        rounded-lg 
        p-6 
        ${textColor} 
        shadow-md 
        relative 
        overflow-hidden
        transition-all 
        duration-300 
        ease-in-out
        ${isTransitioning ? "scale-[1.02]" : "scale-100"}
      `}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div
          className={`
            flex items-center justify-between
            transform 
            transition-all 
            duration-300 
            ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}
          `}
        >
          <div>
            <div className="text-2xl font-bold">
              {value === 0 ? "N/A" : value}
            </div>
            <div className={`${textColor}/90 text-sm`}>{label}</div>
          </div>
          <div
            className={`p-3 rounded-full border-2 ${bgColor.replace('border', 'bg').replace('-500', '-100')} ${bgColor.replace('border', 'text')} border-current`}
          >
            {icon}
          </div>
        </div>
      )}
    </div>
  );
};

// Filter component
const FilterSection = ({ filters, setFilters, handleClearFilters, applyFilters, departments }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'degree' && { department: '' })
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-8">
      <div
        className="p-4 flex justify-between items-center cursor-pointer border-b"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <div className="flex items-center space-x-2 text-gray-700">
          <Icon type="filter" />
          <h2 className="text-lg font-medium">Filter Placements</h2>
        </div>
        <div className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}>
          <Icon type="chevron" />
        </div>
      </div>

      {isFilterOpen && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="company" />
                  Company Name
                </div>
              </label>
              <input
                type="text"
                name="company_name"
                value={filters.company_name}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="student" />
                  Student Name
                </div>
              </label>
              <input
                type="text"
                name="student_name"
                value={filters.student_name}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Raghav"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="calendar" />
                  Batch
                </div>
              </label>
              <select
                name="batch"
                value={filters.batch}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                {["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"].map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="degree" />
                  Degree
                </div>
              </label>
              <select
                name="degree"
                value={filters.degree}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="M.Sc">M.Sc</option>
                <option value="PHD">PHD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="department" />
                  Department
                </div>
              </label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                disabled={!filters.degree}
                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${!filters.degree ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">All</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="type" />
                  Placement Type
                </div>
              </label>
              <select
                name="placement_type"
                value={filters.placement_type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Intern+PPO">Intern+PPO</option>
                <option value="Intern+FTE">Intern+FTE</option>
                <option value="FTE">FTE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="gender" />
                  Gender
                </div>
              </label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="money" />
                  CTC
                </div>
              </label>
              <select
                name="ctc"
                value={filters.ctc}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="one">Less than 10 LPA</option>
                <option value="two">10-20 LPA</option>
                <option value="three">Greater than 20 LPA</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
            >
              Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 text-white bg-custom-blue hover:bg-blue-700 rounded-md shadow-sm transition duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Placement Card Component
const PlacementCard = ({ placement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const {
    company_name = "",
    company_logo = "",
    placement_type = "",
    placement_offer_mode = "On-Campus",
    batch = "",
    degree = "",
    ctc = "0",
    role = "",
    shortlisted_students = [],
  } = placement;

  if (!placement || Object.keys(placement).length === 0) {
    return null;
  }

  const displayedStudents = showAllStudents
    ? shortlisted_students
    : shortlisted_students.slice(0, 4);

  const formattedCTC = ctc
    ? parseInt(ctc) >= 10000000
      ? `₹ ${(parseInt(ctc) / 10000000).toFixed(2)} Cr`
      : `₹ ${(parseInt(ctc) / 100000).toFixed(2)} LPA`
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-custom-blue text-lg font-semibold">
              {company_name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {company_name}
              </h3>
              <div className="flex flex-wrap items-center mt-1 gap-2 text-gray-600 text-sm">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                  {placement_type}
                </span>
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs">
                  {placement_offer_mode}
                </span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs">
                  {batch}
                </span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs">
                  {degree}
                </span>
              </div>
              {role && (
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Role:</span> {role}
                </p>
              )}
            </div>
          </div>
          <div className="bg-custom-blue text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">
            {formattedCTC}
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="p-4">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon type="student" />
            <span className="font-medium text-gray-700">
              Shortlisted Students ({shortlisted_students.length})
            </span>
          </div>
          <div
            className="text-gray-400 transition-transform duration-200"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Icon type="chevron" />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedStudents.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 text-base font-medium">
                    {student?.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-base truncate">
                      {student?.name || "Unknown"}
                    </div>
                    <div className="text-sm flex flex-wrap items-center gap-2 text-gray-500">
                      <span>{student?.department || "N/A"}</span>
                      {student?.gender && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                          {student.gender}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {shortlisted_students.length > 4 && (
              <button
                onClick={() => setShowAllStudents(!showAllStudents)}
                className="w-full mt-2 py-2 text-sm font-medium text-blue-600
                hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                {showAllStudents
                  ? "Show Less"
                  : `Show ${shortlisted_students.length - 4} More Students`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const PlacementInsights = () => {
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

  const [departments, setDepartments] = useState([]);

  const [placements, setPlacements] = useState([]);
  const [insights, setInsights] = useState({
    totalStudentsPlaced: 0,
    companiesVisited: 0,
    averagePackage: 0,
  });
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("card");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (filters.degree) {
      let deptOptions = [];
      switch (filters.degree) {
        case 'B.Tech':
          deptOptions = btechdepartmentOptions.flatMap(group => group.options.map(opt => opt.value));
          break;
        case 'M.Tech':
          deptOptions = mtechdepartmentOptions.flatMap(group => group.options.map(opt => opt.value));
          break;
        case 'MBA':
          deptOptions = mbadepartmentOptions.map(opt => opt.value);
          break;
        case 'M.Sc':
          deptOptions = mscdepartmentOptions.map(opt => opt.value);
          break;
        case 'PHD':
          deptOptions = phddepartmentOptions.map(opt => opt.value);
          break;
        default:
          deptOptions = [];
      }
      setDepartments(deptOptions);
    } else {
      setDepartments([]);
      setFilters(prev => ({
        ...prev,
        department: ''
      }));
    }
  }, [filters.degree]);

  const fetchPlacements = async (updatedFilters = filters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(
        Object.entries(updatedFilters).filter(([_, value]) => value !== "")
      ).toString();
      const apiUrl = `${import.meta.env.REACT_APP_BASE_URL}/placements/filter?${queryParams}`;
      const response = await axios.get(apiUrl);
      setPlacements(response.data);
      const insightsUrl = `${import.meta.env.REACT_APP_BASE_URL}/placements/insights?${queryParams}`;
      const insightsResponse = await axios.get(insightsUrl);
      setInsights(insightsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

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
    setDepartments([]);
    fetchPlacements({});
  };

  const applyFilters = () => {
    fetchPlacements(filters);
    setPage(1);
  };

  const sortedPlacements = React.useMemo(() => {
    if (!placements.length) return [];

    return [...placements].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "ctc_high") {
        return parseInt(b.ctc) - parseInt(a.ctc);
      } else if (sortBy === "ctc_low") {
        return parseInt(a.ctc) - parseInt(b.ctc);
      }
      return 0;
    });
  }, [placements, sortBy]);

  const paginatedPlacements = React.useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPlacements.slice(startIndex, endIndex);
  }, [sortedPlacements, page]);

  const totalPages = Math.ceil(sortedPlacements.length / itemsPerPage);

  const prepareExportData = () => {
    return sortedPlacements.map(placement => ({
      'Company Name': placement.company_name,
      'Role': placement.role || 'N/A',
      'Placement Type': placement.placement_type,
      'Batch': placement.batch,
      'Degree': placement.degree,
      'CTC (₹)': parseInt(placement.ctc) >= 10000000
        ? `${(parseInt(placement.ctc) / 10000000).toFixed(2)} Cr`
        : `${(parseInt(placement.ctc) / 100000).toFixed(2)} LPA`,
      'Students Count': placement.shortlisted_students.length,
      'Date': placement.createdAt
        ? new Date(placement.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : ''
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 tracking-tight mb-2">
            Placement{" "}
            <span className="bg-custom-blue text-transparent bg-clip-text">
              Insights
            </span>
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            value={insights.totalStudentsPlaced}
            label="Students Placed"
            bgColor="bg-[#ffead6]"
            borderColor="border-2 border-[#e4bca0]"
            textColor="text-[#b87748]"
            icon={<Icon type="student" />}
            isLoading={loading}
          />
          <StatCard
            value={insights.companiesVisited}
            label="Companies Visited"
            bgColor="bg-[#f3e5fa]"
            borderColor="border-2 border-[#d3b8e3]"
            textColor="text-[#a578c0]"
            icon={<Icon type="company" />}
            isLoading={loading}
          />
          <StatCard
            value={
              insights.average_ctc && insights.average_ctc !== "N/A"
                ? `₹${insights.average_ctc} LPA`
                : "N/A"
            }
            label="Average Package"
            bgColor="bg-[#d7f7e5]"
            borderColor="border-2 border-[#b3d4c2]"
            textColor="text-[#6a987b]"
            icon={<Icon type="money" />}
            isLoading={loading}
          />
        </div>

        {/* Filters Section */}
        <FilterSection
          filters={filters}
          setFilters={setFilters}
          handleClearFilters={handleClearFilters}
          applyFilters={applyFilters}
          departments={departments}
        />

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <span className="text-gray-500 text-sm">View:</span>
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setView("card")}
                className={`px-3 py-1 rounded-md text-sm ${view === "card"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
                  }`}
              >
                Cards
              </button>
              <button
                onClick={() => setView("table")}
                className={`px-3 py-1 rounded-md text-sm ${view === "table"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
                  }`}
              >
                Table
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="ctc_high">Highest CTC</option>
              <option value="ctc_low">Lowest CTC</option>
            </select>

            {/* Export Button */}
            <CSVLink
              data={prepareExportData()}
              filename={`placements-${new Date().toLocaleDateString()}.csv`}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md shadow-sm text-sm font-medium flex items-center ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export
            </CSVLink>
          </div>
        </div>

        {/* Placements List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : view === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPlacements.length > 0 ? (
              paginatedPlacements.map((placement, index) => (
                <PlacementCard key={index} placement={placement} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
                <h3 className="mt-4 text-lg font-medium text-gray-900">No placements found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Batch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Degree
                    </th>
                    <th className="px-11 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CTC
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedPlacements.length > 0 ? (
                    paginatedPlacements.map((placement, index) => (
                      <React.Fragment key={placement._id || index}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center text-blue-600 font-semibold">
                                {placement.company_name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-800">
                                  {placement.company_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {placement.role || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                              {placement.placement_type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {placement.batch}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {placement.degree}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-custom-blue text-white text-xs font-medium px-2.5 py-1 rounded-full">
                              {parseInt(placement.ctc) >= 10000000
                                ? `${(parseInt(placement.ctc) / 10000000).toFixed(2)} Cr`
                                : `${(parseInt(placement.ctc) / 100000).toFixed(2)} LPA`}
                            </span>
                          </td>
                          <td className="px-9 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <span>{placement.shortlisted_students.length}</span>
                              {placement.shortlisted_students.length > 0 && (
                                <button
                                  onClick={() =>
                                    setExpandedRow(expandedRow === placement._id ? null : placement._id)
                                  }
                                  className="text-blue-600 hover:text-blue-800"
                                  title="View Students"
                                >
                                  <Icon type="eye" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                        {expandedRow === placement._id && (
                          <tr>
                            <td colSpan="8" className="px-0 py-0">
                              <div className="m-2 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden shadow-sm">
                                <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                                  <h4 className="font-medium text-custom-blue">Shortlisted Students</h4>
                                  <button
                                    onClick={() => setExpandedRow(null)}
                                    className="text-blue-600 hover:text-blue-800 rounded-full p-1 hover:bg-blue-100"
                                  >
                                    <Icon type="chevron" style={{ transform: 'rotate(180deg)' }} />
                                  </button>
                                </div>
                                <div className="p-4">
                                  {placement.shortlisted_students.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                      {placement.shortlisted_students.map((student, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center bg-white p-3 rounded-md border border-gray-200 shadow-sm hover:shadow-md hover:bg-blue-50 transition duration-200 ease-in-out"
                                        >
                                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold mr-3">
                                            {student.name?.charAt(0) || "S"}
                                          </div>
                                          <div className="text-sm">
                                            <p className="font-medium text-gray-800">{student.name}</p>
                                            <p className="text-xs text-gray-500">{student?.department} - {student.gender}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 text-center py-4">No students in the shortlist</p>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <h3 className="mt-4 text-lg font-medium text-gray-900">No placements found</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your filters or search criteria
                          </p>
                          <button
                            onClick={handleClearFilters}
                            className="mt-4 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pages */}
        {sortedPlacements.length > itemsPerPage && (
          <div className="flex items-center justify-between bg-white px-4 py-3 mt-6 rounded-lg shadow-sm">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(page * itemsPerPage, sortedPlacements.length)}
                  </span>{" "}
                  of <span className="font-medium">{sortedPlacements.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Page numbers */}
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNumber = idx + 1;
                    const showPage =
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= page - 1 && pageNumber <= page + 1);

                    if (!showPage && pageNumber === page - 2) {
                      return (
                        <span
                          key={`ellipsis-start`}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    if (!showPage && pageNumber === page + 2) {
                      return (
                        <span
                          key={`ellipsis-end`}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === pageNumber
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementInsights;