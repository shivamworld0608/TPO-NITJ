import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import {
  X,
  Pencil,
  Save,
  Search,
  Filter,
  UserCog,
  GraduationCap,
  User,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Notification from "./Notification";

const StudentAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    department: "",
    course: "",
    batch: "",
    cgpa: "",
    gender: "",
    rollno: "",
    debarred: "",
    active_backlogs: "",
    backlogs_history: "",
    name: "",
    placementstatus: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleEditClick = (student) => {
    setEditMode(true);
    setEditedStudent({ ...student });
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/student-analysis/get`,
          { withCredentials: true }
        );

        setData(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch students.");
      }
    };

    fetchStudents();
  }, []);

  const clearFilters = () => {
    setFilters({
      department: "",
      course: "",
      batch: "",
      cgpa: "",
      gender: "",
      debarred: "",
      active_backlogs: "",
      backlogs_history: "",
      rollno: "",
      name: "",
      placementstatus: "",
    });
  };
  const handleSaveClick = async () => {
    try {
      await axios.put(
        `${
          import.meta.env.REACT_APP_BASE_URL
        }/student-analysis/profile-update/${editedStudent._id}`,
        editedStudent,
        { withCredentials: true }
      );
      setEditMode(false);
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/student-analysis/get`,
        { withCredentials: true }
      );
      setData(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to update student details."
      );
    }
  };

  const handleChange = (field, value) => {
    if (!editedStudent) return;

    setEditedStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const cgpaOptions = [
    { value: "All", label: "All" },
    { value: "> 9.0", label: "> 9.0" },
    { value: "> 8.5", label: "> 8.5" },
    { value: "> 8.0", label: "> 8.0" },
    { value: "> 7.5", label: "> 7.5" },
    { value: "> 7.0", label: "> 7.0" },
    { value: "> 6.5", label: "> 6.5" },
    { value: "> 6.0", label: "> 6.0" },
    { value: "> 5.5", label: "> 5.5" },
    { value: "> 5.0", label: "> 5.0" },
  ];

  const genderOptions = [
    { value: "All", label: "All" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const batchOptions = [
    { value: "All", label: "All" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
  ];

  const placementStatusOptions = [
    { value: "All", label: "All" },
    { value: "Not Placed", label: "Not Placed" },
    { value: "Below Dream", label: "Below Dream" },
    { value: "Dream", label: "Dream" },
    { value: "Super Dream", label: "Super Dream" },
  ];

  const backlogOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const [departmentOptions, setDepartmentOptions] = useState([]);

  const courseOptions = [
    { value: "All", label: "All" },
    { value: "B.Tech", label: "B.Tech" },
    { value: "M.Tech", label: "M.Tech" },
    { value: "MBA", label: "MBA" },
    { value: "M.Sc", label: "M.Sc" },
    { value: "PHD", label: "PHD" },
  ];

  const btechdepartmentOptions = [
    {
      label: "Biotechnology",
      options: [{ value: "Biotechnology", label: "Biotechnology" }],
    },
    {
      label: "Chemical Engineering",
      options: [
        { value: "Chemical Engineering", label: "Chemical Engineering" },
      ],
    },
    {
      label: "Civil Engineering",
      options: [{ value: "Civil Engineering", label: "Civil Engineering" }],
    },
    {
      label: "Computer Science & Engineering",
      options: [
        {
          value: "Computer Science & Engineering",
          label: "Computer Science & Engineering",
        },
        {
          value: "Data Science and Engineering",
          label: "Data Science and Engineering",
        },
      ],
    },
    {
      label: "Electrical Engineering",
      options: [
        { value: "Electrical Engineering", label: "Electrical Engineering" },
      ],
    },
    {
      label: "Electronics & Communication Engineering",
      options: [
        {
          value: "Electronics & Communication Engineering",
          label: "Electronics & Communication Engineering",
        },
        {
          value: "Electronics and VLSI Engineering",
          label: "Electronics and VLSI Engineering",
        },
      ],
    },
    {
      label: "Industrial and Production Engineering",
      options: [
        {
          value: "Industrial and Production Engineering",
          label: "Industrial and Production Engineering",
        },
      ],
    },
    {
      label: "Information Technology",
      options: [
        { value: "Information Technology", label: "Information Technology" },
      ],
    },
    {
      label: "Instrumentation and Control Engineering",
      options: [
        {
          value: "Instrumentation and Control Engineering",
          label: "Instrumentation and Control Engineering",
        },
      ],
    },
    {
      label: "Mathematics and Computing",
      options: [
        {
          value: "Mathematics and Computing",
          label: "Mathematics and Computing",
        },
      ],
    },
    {
      label: "Mechanical Engineering",
      options: [
        { value: "Mechanical Engineering", label: "Mechanical Engineering" },
      ],
    },
    {
      label: "Textile Technology",
      options: [{ value: "Textile Technology", label: "Textile Technology" }],
    },
  ];

  const mtechdepartmentOptions = [
    {
      label: "Biotechnology",
      options: [{ value: "Biotechnology", label: "Biotechnology" }],
    },
    {
      label: "Chemical Engineering",
      options: [
        { value: "Chemical Engineering", label: "Chemical Engineering" },
      ],
    },
    {
      label: "Civil Engineering",
      options: [
        {
          value: "Structural and Construction Engineering",
          label: "Structural and Construction Engineering",
        },
        {
          value: "Geotechnical and Geo-Environmental Engineering",
          label: "Geotechnical and Geo-Environmental Engineering",
        },
      ],
    },
    {
      label: "Computer Science & Engineering",
      options: [
        {
          value: "Computer Science & Engineering",
          label: "Computer Science & Engineering",
        },
        { value: "Information Security", label: "Information Security" },
        {
          value: "Data Science and Engineering",
          label: "Data Science and Engineering",
        },
      ],
    },
    {
      label: "Electrical Engineering",
      options: [
        { value: "Electric Vehicle Design", label: "Electric Vehicle Design" },
      ],
    },
    {
      label: "Electronics & Communication Engineering",
      options: [
        {
          value: "Signal Processing and Machine Learning",
          label: "Signal Processing and Machine Learning",
        },
        { value: "VLSI Design", label: "VLSI Design" },
      ],
    },
    {
      label: "Industrial & Production Engineering",
      options: [
        {
          value: "Industrial Engineering and Data Analytics",
          label: "Industrial Engineering and Data Analytics",
        },
        {
          value: "Manufacturing Technology With Machine Learning",
          label: "Manufacturing Technology With Machine Learning",
        },
      ],
    },
    {
      label: "Information Technology",
      options: [{ value: "Data Analytics", label: "Data Analytics" }],
    },
    {
      label: "Instrumentation and Control Engineering",
      options: [
        {
          value: "Control and Instrumentation",
          label: "Control and Instrumentation",
        },
        {
          value: "Machine Intelligence and Automation",
          label: "Machine Intelligence and Automation",
        },
      ],
    },
    {
      label: "Mathematics and Computing",
      options: [
        {
          value: "Mathematics and Computing",
          label: "Mathematics and Computing",
        },
      ],
    },
    {
      label: "Mechanical Engineering",
      options: [
        { value: "Design Engineering", label: "Design Engineering" },
        {
          value: "Thermal and Energy Engineering",
          label: "Thermal and Energy Engineering",
        },
      ],
    },
    {
      label: "Textile Engineering",
      options: [
        {
          value: "Textile Engineering and Management",
          label: "Textile Engineering and Management",
        },
      ],
    },
    {
      label: "Renewable Energy",
      options: [{ value: "Renewable Energy", label: "Renewable Energy" }],
    },
    {
      label: "Artificial Intelligence",
      options: [
        { value: "Artificial Intelligence", label: "Artificial Intelligence" },
      ],
    },
    {
      label: "Power Systems and Reliability",
      options: [
        {
          value: "Power Systems and Reliability",
          label: "Power Systems and Reliability",
        },
      ],
    },
  ];

  const mbadepartmentOptions = [
    { value: "Finance", label: "Finance" },
    { value: "Human Resource", label: "Human Resource" },
    { value: "Marketing", label: "Marketing" },
  ];

  const mscdepartmentOptions = [
    { value: "Chemistry", label: "Chemistry" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
  ];

  const phddepartmentOptions = [
    { value: "Biotechnology", label: "Biotechnology" },
    { value: "Chemical Engineering", label: "Chemical Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    {
      value: "Computer Science and Engineering",
      label: "Computer Science and Engineering",
    },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    {
      value: "Electronics and Communication Engineering",
      label: "Electronics and Communication Engineering",
    },
    {
      value: "Industrial and Production Engineering",
      label: "Industrial and Production Engineering",
    },
    { value: "Information Technology", label: "Information Technology" },
    {
      value: "Instrumentation and Control Engineering",
      label: "Instrumentation and Control Engineering",
    },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Textile Technology", label: "Textile Technology" },
  ];

  // Combine all department options into a single array
  const allDepartments = [
    ...btechdepartmentOptions.flatMap((group) => group.options),
    ...mtechdepartmentOptions.flatMap((group) => group.options),
    ...mbadepartmentOptions,
    ...mscdepartmentOptions,
    ...phddepartmentOptions,
  ];

  // Extract unique values using a Set
  const uniqueDepartments = [
    ...new Set(allDepartments.map((dept) => dept.value)),
  ];

  // Sort the unique values alphabetically
  const sortedUniqueDepartments = uniqueDepartments.sort((a, b) =>
    a.localeCompare(b)
  );

  // Format the result into the desired structure
  const formattedDepartments = sortedUniqueDepartments.map((dept) => ({
    value: dept,
    label: dept,
  }));

  useEffect(() => {
    // Reset department filter when course changes
    setFilters((prevFilters) => ({
      ...prevFilters,
      department: "", // Reset department to default value
    }));

    // Update department options based on the selected course
    switch (filters.course) {
      case "B.Tech":
        setDepartmentOptions(btechdepartmentOptions);
        break;
      case "M.Tech":
        setDepartmentOptions(mtechdepartmentOptions);
        break;
      case "MBA":
        setDepartmentOptions(mbadepartmentOptions);
        break;
      case "M.Sc":
        setDepartmentOptions(mscdepartmentOptions);
        break;
      case "PHD":
        setDepartmentOptions(phddepartmentOptions);
        break;
      default:
        setDepartmentOptions(formattedDepartments);
        break;
    }
  }, [filters.course]); // Trigger when filters.course changes

  const filteredStudents = data.filter((student) => {
    return (
      (filters.department === "" ||
        filters.department === "All" ||
        student.department === filters.department) &&
      (filters.course === "" ||
        filters.course === "All" ||
        student.course === filters.course) &&
      (filters.batch === "" ||
        filters.batch === "All" ||
        student.batch === filters.batch) &&
      (filters.cgpa === "" ||
        filters.cgpa === "All" ||
        parseFloat(student.cgpa) >
          parseFloat(filters.cgpa.replace("> ", ""))) &&
      (filters.placementstatus === "" ||
        filters.placementstatus === "All" ||
        student.placementstatus === filters.placementstatus) &&
      (filters.gender === "" ||
        filters.gender === "All" ||
        student.gender === filters.gender) &&
      (filters.debarred === "" ||
        filters.debarred === "All" ||
        student.debarred === (filters.debarred === "true")) &&
      (filters.active_backlogs === "" ||
        filters.active_backlogs === "All" ||
        student.active_backlogs === (filters.active_backlogs === "true")) &&
      (filters.backlogs_history === "" ||
        filters.backlogs_history === "All" ||
        student.backlogs_history === (filters.backlogs_history === "true")) &&
      (filters.name === "" ||
        student.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.rollno === "" ||
        student.rollno.toLowerCase().includes(filters.rollno.toLowerCase()))
    );
  });

  const getAssessmentData = (student) => {
    if (!student) return [];

    return Object.entries(student.assessments).map(([type, data]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      total: data.total,
      shortlisted: data.shortlisted,
      rejected: data.rejected,
      absent: data.absent,
    }));
  };

  const getAssessmentStats = (student) => {
    if (!student?.assessments) return null;

    const stats = {
      total: 0,
      shortlisted: 0,
      rejected: 0,
      absent: 0,
    };

    Object.values(student.assessments).forEach((assessment) => {
      stats.total += assessment.total || 0;
      stats.shortlisted += assessment.shortlisted || 0;
      stats.rejected += assessment.rejected || 0;
      stats.absent += assessment.absent || 0;
    });

    stats.successRate = ((stats.shortlisted / stats.total) * 100).toFixed(1);

    return stats;
  };

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === "cgpa") {
      return sortDirection === "asc"
        ? parseFloat(a.cgpa) - parseFloat(b.cgpa)
        : parseFloat(b.cgpa) - parseFloat(a.cgpa);
    }
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDialogClose = () => {
    setEditMode(false);
    setEditedStudent(null);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Student <span className="text-custom-blue">Analytics</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage student performance and placement data
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {filteredStudents.length}
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course
              </label>
              <Select
                options={courseOptions}
                value={filters.course}
                onValueChange={(value) =>
                  setFilters({ ...filters, course: value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Department
              </label>
              <Select
                options={departmentOptions}
                value={filters.department}
                onValueChange={(value) =>
                  setFilters({ ...filters, department: value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Batch</label>
              <Select
                options={batchOptions}
                value={filters.batch}
                onValueChange={(value) =>
                  setFilters({ ...filters, batch: value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">CGPA</label>
              <Select
                options={cgpaOptions}
                value={filters.cgpa}
                onValueChange={(value) =>
                  setFilters({ ...filters, cgpa: value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Placement Status
              </label>
              <Select
                options={placementStatusOptions}
                value={filters.placementstatus}
                onValueChange={(value) =>
                  setFilters({ ...filters, placementstatus: value })
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Debarred
              </label>
              <Select
                options={backlogOptions}
                value={filters.debarred}
                onValueChange={(value) =>
                  setFilters({ ...filters, debarred: value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Active Backlogs
              </label>
              <Select
                options={backlogOptions}
                value={filters.active_backlogs}
                onValueChange={(value) =>
                  setFilters({ ...filters, active_backlogs: value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Backlogs History
              </label>
              <Select
                options={backlogOptions}
                value={filters.backlogs_history}
                onValueChange={(value) =>
                  setFilters({ ...filters, backlogs_history: value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <Select
                options={genderOptions}
                value={filters.gender}
                onValueChange={(value) =>
                  setFilters({ ...filters, gender: value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Search Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={filters.name}
                  onChange={(e) =>
                    setFilters({ ...filters, name: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by roll no..."
                  value={filters.rollno}
                  onChange={(e) =>
                    setFilters({ ...filters, rollno: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${
            sortField === "name" ? "bg-blue-50" : ""
          }`}
          onClick={() => handleSort("name")}
        >
          Name
          {sortField === "name" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </Button>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${
            sortField === "cgpa" ? "bg-blue-50" : ""
          }`}
          onClick={() => handleSort("cgpa")}
        >
          CGPA
          {sortField === "cgpa" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </Button>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedStudents.map((student) => (
          <Dialog
            key={student._id}
            onOpenChange={(open) => {
              if (!open) {
                handleDialogClose();
              }
            }}
          >
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-400  hover:scale-105 hover:bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <UserCog className="h-5 w-5 text-gray-400" />

                        <h3 className="font-bold text-lg  text-gray-900">
                          {student.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {student.rollno}
                      </p>
                      <span className="text-sm text-gray-600">
                        {student.course}
                      </span>
                    </div>
                    <GraduationCap className="h-6 w-6 text-blue-500" />
                  </div>

                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {student.department}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Batch: {student.batch}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        CGPA: {student.cgpa}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      student.placementstatus === "Super Dream"
                        ? "bg-green-100 text-green-800"
                        : student.placementstatus === "Dream"
                        ? "bg-blue-100 text-blue-800"
                        : student.placementstatus === "Below Dream"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-600 text-gray-100"
                    }`}
                  >
                    {student.placementstatus}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            {/* Student Details Dialog */}
            <DialogContent className="max-w-6xl max-h-[90vh] p-0">
              <div className="overflow-y-auto max-h-[90vh] px-6">
                <DialogHeader className="sticky top-0 bg-white py-4 z-10">
                  <div className="flex flex-col  gap-4 sm:flex-row sm:justify-between">
                    {/* Title Section - Centered */}
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2 justify-center lg:items-center lg:justify-center">
                      <User className="h-6 w-6 text-blue-500" />
                      {student.name}
                    </DialogTitle>

                    {/* Button Section - Stacked on Small Screens, Inline on Larger Screens */}
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 hover:scale-105 focus:outline-none"
                      onClick={() =>
                        editMode ? handleSaveClick() : handleEditClick(student)
                      }
                    >
                      {editMode ? (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Pencil className="h-4 w-4" />
                          Edit Details
                        </>
                      )}
                    </Button>
                  </div>
                </DialogHeader>

                <div className="mt-6 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 overflow-x-hidden">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Personal Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Name
                            </label>
                            {editMode ? (
                              <Input
                                value={editedStudent.name}
                                onChange={(e) =>
                                  handleChange("name", e.target.value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Email
                            </label>
                            {editMode ? (
                              <Input
                                value={editedStudent.email}
                                onChange={(e) =>
                                  handleChange("email", e.target.value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Phone
                            </label>
                            {editMode ? (
                              <Input
                                value={editedStudent.phone}
                                onChange={(e) =>
                                  handleChange("phone", e.target.value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.phone}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Roll Number
                            </label>
                            {editMode ? (
                              <Input
                                value={editedStudent.rollno}
                                onChange={(e) =>
                                  handleChange("rollno", e.target.value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.rollno}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Academic Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Department
                            </label>
                            {editMode ? (
                              <Select
                                options={departmentOptions}
                                value={editedStudent.department}
                                onValueChange={(value) =>
                                  handleChange("department", value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.department}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Course
                            </label>
                            {editMode ? (
                              <Select
                                options={courseOptions}
                                value={editedStudent.course}
                                onValueChange={(value) =>
                                  handleChange("course", value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.course}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              CGPA
                            </label>
                            {editMode ? (
                              <Input
                                type="number"
                                min="0"
                                max="10"
                                value={editedStudent.cgpa}
                                onChange={(e) =>
                                  handleChange("cgpa", e.target.value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.cgpa}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Batch
                            </label>
                            {editMode ? (
                              <Select
                                options={batchOptions}
                                value={editedStudent.batch}
                                onValueChange={(value) =>
                                  handleChange("batch", value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.batch}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Active Backlog
                            </label>
                            {editMode ? (
                              <Select
                                options={backlogOptions}
                                value={editedStudent.active_backlogs}
                                onValueChange={(value) =>
                                  handleChange("active_backlogs", value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.active_backlogs ? "Yes" : "No"}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Backlogs History
                            </label>
                            {editMode ? (
                              <Select
                                options={backlogOptions}
                                value={editedStudent.backlogs_history}
                                onValueChange={(value) =>
                                  handleChange("backlogs_history", value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.backlogs_history ? "Yes" : "No"}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Placement Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Placement Status
                            </label>
                            {editMode ? (
                              <Select
                                options={placementStatusOptions}
                                value={editedStudent.placementstatus}
                                onValueChange={(value) =>
                                  handleChange("placementstatus", value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <div
                                className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                  student.placementstatus === "Super Dream"
                                    ? "bg-green-100 text-green-800"
                                    : student.placementstatus === "Dream"
                                    ? "bg-blue-100 text-blue-800"
                                    : student.placementstatus === "Below Dream"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {student.placementstatus}
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Debarred
                            </label>
                            {editMode ? (
                              <Select
                                options={backlogOptions}
                                value={editedStudent.debarred}
                                onValueChange={(value) =>
                                  handleChange("debarred", value)
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">
                                {student.debarred ? "Yes" : "No"}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm"></Card>
                    </div>
                  </div>
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Academic Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Department */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Department
                          </label>
                          {editMode ? (
                            <Select
                              options={departmentOptions}
                              value={editedStudent.department}
                              onValueChange={(value) =>
                                handleChange("department", value)
                              }
                              className="mt-1"
                            />
                          ) : (
                            <p className="mt-1 text-gray-900">
                              {student.department}
                            </p>
                          )}
                        </div>

                        {/* Course */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Course
                          </label>
                          {editMode ? (
                            <Select
                              options={courseOptions}
                              value={editedStudent.course}
                              onValueChange={(value) =>
                                handleChange("course", value)
                              }
                              className="mt-1"
                            />
                          ) : (
                            <p className="mt-1 text-gray-900">
                              {student.course}
                            </p>
                          )}
                        </div>

                        {/* CGPA */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            CGPA
                          </label>
                          {editMode ? (
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              step="0.01"
                              value={editedStudent.cgpa}
                              onChange={(e) =>
                                handleChange("cgpa", e.target.value)
                              }
                              className="mt-1"
                            />
                          ) : (
                            <p className="mt-1 text-gray-900">{student.cgpa}</p>
                          )}
                        </div>

                        {/* Batch */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Batch
                          </label>
                          {editMode ? (
                            <Select
                              options={batchOptions}
                              value={editedStudent.batch}
                              onValueChange={(value) =>
                                handleChange("batch", value)
                              }
                              className="mt-1"
                            />
                          ) : (
                            <p className="mt-1 text-gray-900">
                              {student.batch}
                            </p>
                          )}
                        </div>

                        {/* Active Backlogs */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Active Backlog
                          </label>
                          {editMode ? (
                            <Select
                              options={backlogOptions}
                              value={editedStudent.active_backlogs}
                              onValueChange={(value) =>
                                handleChange("active_backlogs", value)
                              }
                              className="mt-1"
                            />
                          ) : (
                            <p className="mt-1 text-gray-900">
                              {student.active_backlogs ? "Yes" : "No"}
                            </p>
                          )}
                        </div>

                        {/* Backlogs History */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Backlogs History
                          </label>
                          {editMode ? (
                            <Select
                              options={backlogOptions}
                              value={editedStudent.backlogs_history}
                              onValueChange={(value) =>
                                handleChange("backlogs_history", value)
                              }
                              className="mt-1"
                            />
                          ) : (
                            <p className="mt-1 text-gray-900">
                              {student.backlogs_history ? "Yes" : "No"}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <CardHeader>
                    <CardTitle className="text-lg">
                      Assessment Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-600 text-sm font-medium">
                          Total Assessments
                        </div>
                        <div className="mt-2 flex items-baseline">
                          <div className="text-2xl font-bold text-blue-700">
                            {getAssessmentStats(student)?.total || 0}
                          </div>
                          <div className="ml-2 text-sm text-blue-600">
                            tests
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-green-600 text-sm font-medium">
                          Shortlisted
                        </div>
                        <div className="mt-2 flex items-baseline">
                          <div className="text-2xl font-bold text-green-700">
                            {getAssessmentStats(student)?.shortlisted || 0}
                          </div>
                          <div className="ml-2 text-sm text-green-600">
                            ({getAssessmentStats(student)?.successRate || 0}%)
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-red-600 text-sm font-medium">
                          Rejected
                        </div>
                        <div className="mt-2 flex items-baseline">
                          <div className="text-2xl font-bold text-red-700">
                            {getAssessmentStats(student)?.rejected || 0}
                          </div>
                          <div className="ml-2 text-sm text-red-600">tests</div>
                        </div>
                      </div>

                      <div className="bg-amber-50 rounded-lg p-4">
                        <div className="text-amber-600 text-sm font-medium">
                          Absent
                        </div>
                        <div className="mt-2 flex items-baseline">
                          <div className="text-2xl font-bold text-amber-700">
                            {getAssessmentStats(student)?.absent || 0}
                          </div>
                          <div className="ml-2 text-sm text-amber-600">
                            tests
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="h-72  p-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getAssessmentData(student)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis /> //extra margin due to this y-axis
                          automatically added
                          <Tooltip />
                          <Bar dataKey="total" fill="#6366f1" name="Total" />
                          <Bar
                            dataKey="shortlisted"
                            fill="#22c55e"
                            name="Shortlisted"
                          />
                          <Bar
                            dataKey="rejected"
                            fill="#ef4444"
                            name="Rejected"
                          />
                          <Bar dataKey="absent" fill="#f59e0b" name="Absent" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Assessment Type Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      {Object.entries(student?.assessments || {}).map(
                        ([type, data]) => (
                          <div
                            key={type}
                            className="p-6 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center text-center"
                          >
                            {/* Heading */}
                            <div className="font-semibold text-lg capitalize mb-4">
                              {type}
                            </div>

                            {/* Centered Status Row */}
                            <div className="flex flex-wrap justify-center items-center gap-6 text-sm w-full">
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                                <span className="text-gray-600">
                                  Total: {data.total}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-gray-600">
                                  Passed: {data.shortlisted}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                                <span className="text-gray-600">
                                  Failed: {data.rejected}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                                <span className="text-gray-600">
                                  Absent: {data.absent}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                  {/* Applications Section */}
                  <Card className="mt-6 border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Applied Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {student.applications.jobProfiles.map((job, index) => (
                          <Card
                            key={index}
                            className="p-4 border border-gray-100"
                          >
                            <h4 className="font-semibold text-gray-900">
                              {job.company_name}
                            </h4>
                            <p className="text-gray-600 mt-1">{job.job_role}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {job.job_type}
                              </span>
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                {job.job_class}
                              </span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <Notification />
    </div>
  );
};

export default StudentAnalyticsDashboard;
