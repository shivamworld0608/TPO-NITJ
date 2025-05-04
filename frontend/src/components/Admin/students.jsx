import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit, X, ChevronLeft, ChevronRight, Eye, EyeOff, Lock, Unlock } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Switch,
  FormHelperText
} from "@mui/material";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editProfile, setEditProfile] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    type: '', // 'bulk' or 'single'
    studentId: null,
    rollNoConfirmation: '',
    studentRollNo: ''
  });
  const [deactivateConfirmModal, setDeactivateConfirmModal] = useState({
    isOpen: false,
    studentId: null,
    rollNoConfirmation: '',
    studentRollNo: '',
    currentStatus: false
  });
  const [filters, setFilters] = useState({
    department: '',
    course: '',
    placementstatus: '',
    minCgpa: '',
    gender: '',
    category: '',
    activeBacklogs: '',
    deactivated: '',
    internshipstatus: '',
    batch: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    name: '',
    rollno: '',
    cgpa: '',
    active_backlogs: "",
    backlogs_history: "",
    debarred: "",
    disability: "",
    account_deactivate: ""
  
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 100;

  // Predefined lists
  const departments = [
    "INTEGRATED TEACHER EDUCATION PROGRAMME", "BIO TECHNOLOGY", "CHEMICAL ENGINEERING", "CIVIL ENGINEERING", 
    "COMPUTER SCIENCE AND ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRONICS AND COMMUNICATION ENGINEERING", 
    "INDUSTRIAL AND PRODUCTION ENGINEERING", "INFORMATION TECHNOLOGY", "INSTRUMENTATION AND CONTROL ENGINEERING", 
    "MECHANICAL ENGINEERING", "TEXTILE TECHNOLOGY", "DATA SCIENCE AND ENGINEERING", "ELECTRONICS AND VLSI ENGINEERING", 
    "MATHEMATICS AND COMPUTING", "CHEMISTRY", "MATHEMATICS", "PHYSICS", "ARTIFICIAL INTELLIGENCE", 
    "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)", "CONTROL AND INSTRUMENTATION ENGINEERING", 
    "DATA ANALYTICS", "DESIGN ENGINEERING", "ELECTRIC VEHICLE DESIGN", "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING", 
    "INDUSTRIAL ENGINEERING AND DATA ANALYTICS", "POWER SYSTEMS AND RELIABILITY", "RENEWABLE ENERGY", 
    "SIGNAL PROCESSING AND MACHINE LEARNING", "STRUCTURAL AND CONSTRUCTION ENGINEERING", "TEXTILE ENGINEERING AND MANAGEMENT", 
    "VLSI DESIGN", "MACHINE INTELLIGENCE AND AUTOMATION", "THERMAL AND ENERGY ENGINEERING", "HUMANITIES AND MANAGEMENT"
  ];

  const courses = ["B.Tech", "M.Tech", "MBA", "M.Sc.", "PHD", "B.Sc.-B.Ed."];
  const placementStatuses = ['Not Placed', 'Below Dream', 'Dream', 'Super Dream'];
  const internshipStatuses = ['No Intern', '2m Intern', '6m Intern', '11m Intern'];
  const genders = ['Male', 'Female', 'Other'];
  const categories = ['General', 'GEN-EWS', 'SC', 'ST', 'OBC-NCL'];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/students`,
        { withCredentials: true }
      );
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch students");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editProfile._id 
        ? `${import.meta.env.REACT_APP_BASE_URL}/admin/students/${editProfile._id}`
        : `${import.meta.env.REACT_APP_BASE_URL}/admin/students`;
      
      const method = editProfile._id ? axios.put : axios.post;
      
      const response = await method(url, editProfile, { withCredentials: true });
      
      fetchStudents();
      setOpenEditDialog(false);
      
      toast.success(editProfile._id ? "Student updated successfully" : "Student added successfully");
    } catch (error) {
      toast.error(`Failed to ${editProfile._id ? 'update' : 'add'} student`);
    }
  };

  const updateDeleteConfirmation = useCallback((value) => {
    setDeleteConfirmModal(prev => ({
      ...prev, 
      rollNoConfirmation: value
    }));
  }, []);

  const updateDeactivateConfirmation = useCallback((value) => {
    setDeactivateConfirmModal(prev => ({
      ...prev, 
      rollNoConfirmation: value
    }));
  }, []);

  const openDeleteConfirmModal = (type, studentId = null) => {
    const studentToDelete = type === 'single' 
      ? students.find(s => s._id === studentId)
      : null;

    setDeleteConfirmModal({
      isOpen: true,
      type,
      studentId: studentId,
      rollNoConfirmation: '',
      studentRollNo: studentToDelete ? studentToDelete.rollno : ''
    });
  };

  const openDeactivateConfirmModal = (studentId) => {
    const studentToDeactivate = students.find(s => s._id === studentId);
    
    setDeactivateConfirmModal({
      isOpen: true,
      studentId: studentId,
      rollNoConfirmation: '',
      studentRollNo: studentToDeactivate ? studentToDeactivate.rollno : '',
      currentStatus: studentToDeactivate ? studentToDeactivate.account_deactivate : false
    });
  };

  const handleDeleteStudents = async () => {
    try {
      const idsToDelete = deleteConfirmModal.type === 'bulk' 
        ? selectedStudents 
        : [deleteConfirmModal.studentId];

      await axios.delete(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/students`,
        { 
          data: { studentIds: idsToDelete },
          withCredentials: true 
        }
      );
      
      setStudents(students.filter(student => !idsToDelete.includes(student._id)));
      setSelectedStudents([]);
      
      setDeleteConfirmModal(prev => ({ 
        ...prev,
        isOpen: false, 
        type: '', 
        studentId: null, 
        rollNoConfirmation: '' 
      }));

      toast.success("Students deleted successfully");
    } catch (error) {
      toast.error("Failed to delete students");
    }
  };

  const handleDeactivateStudent = async () => {
    try {
      const studentId = deactivateConfirmModal.studentId;
      const studentToUpdate = students.find(s => s._id === studentId);
      const newStatus = !studentToUpdate.account_deactivate;
      
      await axios.patch(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/students/deactivate/${studentId}`,
        { deactivate: newStatus },
        { withCredentials: true }
      );
      
      // Update local state
      setStudents(students.map(student => 
        student._id === studentId 
          ? { ...student, account_deactivate: newStatus } 
          : student
      ));
      
      setDeactivateConfirmModal(prev => ({ 
        ...prev,
        isOpen: false, 
        studentId: null, 
        rollNoConfirmation: '' 
      }));

      toast.success(`Student account ${newStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${deactivateConfirmModal.currentStatus ? 'activate' : 'deactivate'} student account`);
    }
  };

  const DeleteConfirmationModal = () => {
    if (!deleteConfirmModal.isOpen) return null;

    const studentToDelete = deleteConfirmModal.type === 'single'
      ? students.find(s => s._id === deleteConfirmModal.studentId)
      : null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Confirm Deletion</h2>
            <button 
              onClick={() => setDeleteConfirmModal(prev => ({ 
                ...prev,
                isOpen: false, 
                type: '', 
                studentId: null, 
                rollNoConfirmation: '' 
              }))}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="mb-4">
            {deleteConfirmModal.type === 'bulk'
              ? `Are you sure you want to delete ${selectedStudents.length} selected students?`
              : `Are you sure you want to delete student with Roll No: ${studentToDelete?.rollno}?`
            }
          </p>
          
          <div className="mb-4">
            <label className="block mb-2">
              Type the Roll Number to confirm:
            </label>
            <input 
              type="text"
              value={deleteConfirmModal.rollNoConfirmation}
              onChange={(e) => updateDeleteConfirmation(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter Roll Number"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setDeleteConfirmModal(prev => ({ 
                ...prev,
                isOpen: false, 
                type: '', 
                studentId: null, 
                rollNoConfirmation: '' 
              }))}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteStudents}
              disabled={deleteConfirmModal.type === 'single' 
                ? deleteConfirmModal.rollNoConfirmation !== studentToDelete?.rollno
                : false
              }
              className={`
                px-4 py-2 rounded text-white
                ${(deleteConfirmModal.type === 'single' 
                  ? deleteConfirmModal.rollNoConfirmation !== studentToDelete?.rollno
                  : false)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
                }
              `}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DeactivateConfirmationModal = () => {
    if (!deactivateConfirmModal.isOpen) return null;

    const studentToDeactivate = students.find(s => s._id === deactivateConfirmModal.studentId);
    const actionText = studentToDeactivate?.account_deactivate ? 'activate' : 'deactivate';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Confirm Account {actionText.charAt(0).toUpperCase() + actionText.slice(1)}</h2>
            <button 
              onClick={() => setDeactivateConfirmModal(prev => ({ 
                ...prev,
                isOpen: false, 
                studentId: null, 
                rollNoConfirmation: '' 
              }))}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="mb-4">
            Are you sure you want to {actionText} the account for student with Roll No: {studentToDeactivate?.rollno}?
          </p>
          
          <div className="mb-4">
            <label className="block mb-2">
              Type the Roll Number to confirm:
            </label>
            <input 
              type="text"
              value={deactivateConfirmModal.rollNoConfirmation}
              onChange={(e) => updateDeactivateConfirmation(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter Roll Number"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setDeactivateConfirmModal(prev => ({ 
                ...prev,
                isOpen: false, 
                studentId: null, 
                rollNoConfirmation: '' 
              }))}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeactivateStudent}
              disabled={deactivateConfirmModal.rollNoConfirmation !== studentToDeactivate?.rollno}
              className={`
                px-4 py-2 rounded text-white
                ${deactivateConfirmModal.rollNoConfirmation !== studentToDeactivate?.rollno
                  ? 'bg-gray-400 cursor-not-allowed'
                  : studentToDeactivate?.account_deactivate 
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-orange-500 hover:bg-orange-600'
                }
              `}
            >
              {actionText.charAt(0).toUpperCase() + actionText.slice(1)}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const openEditModal = (student = null) => {
    setEditProfile(student || {
      name: '',
      rollno: '',
      email: '',
      password: '',
      phone: '',
      department: '',
      batch: '',
      course: '',
      address: '',
      cgpa: '',
      gender: '',
      category: '',
      active_backlogs: false,
      backlogs_history: false,
      debarred: false,
      disability: false,
      internshipstatus: 'No Intern',
      placementstatus: 'Not Placed',
      account_deactivate: false
    });
    setOpenEditDialog(true);
    setShowPassword(false);
  };

  const applyFilters = () => {
    return students.filter(student => {
      return (
        (!filters.department || student.department === filters.department) &&
        (!filters.course || student.course === filters.course) &&
        (!filters.placementstatus || student.placementstatus === filters.placementstatus) &&
        (!filters.minCgpa || parseFloat(student.cgpa) >= parseFloat(filters.minCgpa)) &&
        (!filters.gender || student.gender === filters.gender) &&
        (!filters.category || student.category === filters.category) &&
        (filters.activeBacklogs === '' || 
          (filters.activeBacklogs === 'yes' && student.active_backlogs) || 
          (filters.activeBacklogs === 'no' && !student.active_backlogs)) &&
        (filters.deactivated === '' || 
          (filters.deactivated === 'yes' && student.account_deactivate) || 
          (filters.deactivated === 'no' && !student.account_deactivate)) &&
        (!filters.internshipstatus || student.internshipstatus === filters.internshipstatus) &&
        (!filters.batch || String(student.batch) === String(filters.batch)) &&
        (!filters.address || (student.address && student.address.toLowerCase().includes(filters.address.toLowerCase()))) &&
        (!filters.phone || (student.phone && student.phone.includes(filters.phone))) &&
        (!filters.email || (student.email && student.email.toLowerCase().includes(filters.email.toLowerCase()))) &&
        (!filters.name || (student.name && student.name.toLowerCase().includes(filters.name.toLowerCase()))) &&
        (!filters.rollno || (student.rollno && student.rollno.toLowerCase().includes(filters.rollno.toLowerCase()))) &&
        (!filters.cgpa || (student.cgpa && student.cgpa.toString().includes(filters.cgpa))) &&
        (!filters.active_backlogs || (
          student.active_backlogs !== undefined && 
          student.active_backlogs === (filters.active_backlogs === "true")
        )) &&
        (!filters.backlogs_history || (
          student.backlogs_history !== undefined && 
          student.backlogs_history === (filters.backlogs_history === "true")
        )) &&
        (!filters.debarred || (
          student.debarred !== undefined && 
          student.debarred === (filters.debarred === "true")
        )) &&
        (!filters.disability || (
          student.disability !== undefined && 
          student.disability === (filters.disability === "true")
        )) &&
        (!filters.account_deactivate || (
          student.account_deactivate !== undefined && 
          student.account_deactivate === (filters.account_deactivate === "true")
        ))
      );
    });
  };
  // Pagination logic
  const filteredStudents = applyFilters();
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <DeleteConfirmationModal />
      <DeactivateConfirmationModal />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center mb-2 md:mb-0">
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Student Management
        </h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button 
            onClick={() => openEditModal()}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <Plus className="mr-2" /> Add Student
          </button>
          {selectedStudents.length > 0 && (
            <button 
              onClick={() => openDeleteConfirmModal('bulk')}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <Trash2 className="mr-2" /> Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <select 
          value={filters.department}
          onChange={(e) => {
            setFilters({...filters, department: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select 
          value={filters.course}
          onChange={(e) => {
            setFilters({...filters, course: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        <select 
          value={filters.placementstatus}
          onChange={(e) => {
            setFilters({...filters, placementstatus: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">Placement Status</option>
          {placementStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <input 
          type="number"
          placeholder="Min CGPA"
          value={filters.minCgpa}
          onChange={(e) => {
            setFilters({...filters, minCgpa: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
        <select 
          value={filters.gender}
          onChange={(e) => {
            setFilters({...filters, gender: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Genders</option>
          {genders.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
        <select 
          value={filters.category}
          onChange={(e) => {
            setFilters({...filters, category: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select 
          value={filters.activeBacklogs}
          onChange={(e) => {
            setFilters({...filters, activeBacklogs: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">Active Backlogs</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <select 
          value={filters.deactivated}
          onChange={(e) => {
            setFilters({...filters, deactivated: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">Account Status</option>
          <option value="yes">Deactivated</option>
          <option value="no">Active</option>
        </select>
        <select
          value={filters.internshipstatus}
          onChange={(e) => {
            setFilters({ ...filters, internshipstatus: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">Internship Status</option> 
          {internshipStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select
          value={filters.batch}
          onChange={(e) => {
            setFilters({ ...filters, batch: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">Batch</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={2020 + i}>{2020 + i}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Address"
          value={filters.address}
          onChange={(e) => {
            setFilters({ ...filters, address: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
            <input
          type="text"
          placeholder="Phone"
          value={filters.phone}
          onChange={(e) => {
            setFilters({ ...filters, phone: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />    
        <input
          type="text"
          placeholder="Email"
          value={filters.email}
          onChange={(e) => {
            setFilters({ ...filters, email: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Name"
          value={filters.name}
          onChange={(e) => {
            setFilters({ ...filters, name: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Roll No"
          value={filters.rollno}
          onChange={(e) => {
            setFilters({ ...filters, rollno: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="CGPA"
          value={filters.cgpa}
          onChange={(e) => {
            setFilters({ ...filters, cgpa: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        /><select
        value={filters.active_backlogs}
        onChange={(e) => {
          setFilters({ ...filters, active_backlogs: e.target.value });
          setCurrentPage(1);
        }}
        className="border p-2 rounded"
      >
        <option value="">Active Backlogs</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      
      <select
        value={filters.backlogs_history}
        onChange={(e) => {
          setFilters({ ...filters, backlogs_history: e.target.value });
          setCurrentPage(1);
        }}
        className="border p-2 rounded"
      >
        <option value="">Backlogs History</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      
      <select
        value={filters.debarred}
        onChange={(e) => {
          setFilters({ ...filters, debarred: e.target.value });
          setCurrentPage(1);
        }}
        className="border p-2 rounded"
      >
        <option value="">Debarred</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      
      <select
        value={filters.disability}
        onChange={(e) => {
          setFilters({ ...filters, disability: e.target.value });
          setCurrentPage(1);
        }}
        className="border p-2 rounded"
      >
        <option value="">Disability</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      
      <select
        value={filters.account_deactivate}
        onChange={(e) => {
          setFilters({ ...filters, account_deactivate: e.target.value });
          setCurrentPage(1);
        }}
        className="border p-2 rounded"
      >
        <option value="">Account Status</option>
        <option value="true">Deactivated</option>
        <option value="false">Active</option>
      </select>

      </div>

      {/* Student Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">
                    <input 
                      type="checkbox"
                      checked={selectedStudents.length === currentStudents.length}
                      onChange={() => setSelectedStudents(
                        selectedStudents.length === currentStudents.length 
                          ? [] 
                          : currentStudents.map(student => student._id)
                      )}
                    />
                  </th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Roll No</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Department</th>
                  <th className="border p-2">Course</th>
                  <th className="border p-2">Batch</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">CGPA</th>
                  <th className="border p-2">Backlogs</th>
                  <th className="border p-2">Internship</th>
                  <th className="border p-2">Placement</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map(student => (
                  <tr key={student._id} className={`hover:bg-gray-50 ${student.account_deactivate ? 'bg-red-50' : ''}`}>
                    <td className="border p-2 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleSelectStudent(student._id)}
                      />
                    </td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.rollno}</td>
                    <td className="border p-2">{student.email}</td>
                    <td className="border p-2">{student.phone?student.phone:''}</td>
                    <td className="border p-2">{student.address?student.address:''}</td>
                    <td className="border p-2">{student.department}</td>
                    <td className="border p-2">{student.course}</td>
                    <td className="border p-2">{student.batch}</td>
                    <td className="border p-2">{student.gender}</td>
                    <td className="border p-2">{student.category}</td>
                    <td className="border p-2">{student.cgpa}</td>
                    <td className="border p-2">
                      {student.active_backlogs ? 'Active' : student.backlogs_history ? 'History' : 'None'}
                    </td>
                    <td className="border p-2">{student.internshipstatus}</td>
                    <td className="border p-2">{student.placementstatus}</td>

                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-xs ${student.account_deactivate ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                        {student.account_deactivate ? 'Deactivated' : 'Active'}
                      </span>
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => openEditModal(student)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => openDeactivateConfirmModal(student._id)}
                          className={`${student.account_deactivate ? 'text-green-500 hover:text-green-700' : 'text-orange-500 hover:text-orange-700'}`}
                          title={student.account_deactivate ? 'Activate Account' : 'Deactivate Account'}
                        >
                          {student.account_deactivate ? <Unlock size={18} /> : <Lock size={18} />}
                        </button>
                        <button 
                          onClick={() => openDeleteConfirmModal('single', student._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} students
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft />
              </button>
              <span>
                Page {currentPage} of {Math.ceil(filteredStudents.length / studentsPerPage)}
              </span>
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage >= Math.ceil(filteredStudents.length / studentsPerPage)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add/Edit Student Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editProfile?._id ? 'Edit Student' : 'Add Student'}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editProfile?.name || ''}
              onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
            />
            <TextField
              label="Roll No"
              fullWidth
              margin="normal"
              value={editProfile?.rollno || ''}
              onChange={(e) => setEditProfile({ ...editProfile, rollno: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={editProfile?.email || ''}
              onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
              required
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={editProfile?.phone || ''}
              onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={editProfile?.password || ''}
              onChange={(e) => setEditProfile({ ...editProfile, password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              helperText={!editProfile?._id ? "Required for new students" : "Leave blank to keep existing password"}
            />
            <TextField
              label="Batch (Year)"
              fullWidth
              margin="normal"
              value={editProfile?.batch || ''}
              onChange={(e) => setEditProfile({ ...editProfile, batch: e.target.value })}
            />

            {/* Academic Information */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select
                value={editProfile?.department || ''}
                onChange={(e) => setEditProfile({ ...editProfile, department: e.target.value })}
              >
                <MenuItem value="">Select Department</MenuItem>
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                value={editProfile?.course || ''}
                onChange={(e) => setEditProfile({ ...editProfile, course: e.target.value })}
              >
                <MenuItem value="">Select Course</MenuItem>
                {courses.map(course => (
                  <MenuItem key={course}
                    value={course}>{course}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={editProfile?.gender || ''}
                    onChange={(e) => setEditProfile({ ...editProfile, gender: e.target.value })}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    {genders.map(gender => (
                      <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={editProfile?.category || ''}
                    onChange={(e) => setEditProfile({ ...editProfile, category: e.target.value })}
                  >
                    <MenuItem value="">Select Category</MenuItem>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="CGPA"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={editProfile?.cgpa || ''}
                  onChange={(e) => setEditProfile({ ...editProfile, cgpa: e.target.value })}
                  inputProps={{ step: "0.01", min: "0", max: "10" }}
                />
                
                {/* Address */}
                <TextField
                  label="Address"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={2}
                  value={editProfile?.address || ''}
                  onChange={(e) => setEditProfile({ ...editProfile, address: e.target.value })}
                />
    
                {/* Status Information */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Internship Status</InputLabel>
                  <Select
                    value={editProfile?.internshipstatus || 'No Intern'}
                    onChange={(e) => setEditProfile({ ...editProfile, internshipstatus: e.target.value })}
                  >
                    {internshipStatuses.map(status => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Placement Status</InputLabel>
                  <Select
                    value={editProfile?.placementstatus || 'Not Placed'}
                    onChange={(e) => setEditProfile({ ...editProfile, placementstatus: e.target.value })}
                  >
                    {placementStatuses.map(status => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
    
                {/* Toggle Switches */}
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editProfile?.active_backlogs || false}
                        onChange={(e) => setEditProfile({ ...editProfile, active_backlogs: e.target.checked })}
                        color="primary"
                      />
                    }
                    label="Active Backlogs"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editProfile?.backlogs_history || false}
                        onChange={(e) => setEditProfile({ ...editProfile, backlogs_history: e.target.checked })}
                        color="primary"
                      />
                    }
                    label="Backlogs History"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editProfile?.debarred || false}
                        onChange={(e) => setEditProfile({ ...editProfile, debarred: e.target.checked })}
                        color="primary"
                      />
                    }
                    label="Debarred"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editProfile?.disability || false}
                        onChange={(e) => setEditProfile({ ...editProfile, disability: e.target.checked })}
                        color="primary"
                      />
                    }
                    label="Disability"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editProfile?.account_deactivate || false}
                        onChange={(e) => setEditProfile({ ...editProfile, account_deactivate: e.target.checked })}
                        color="primary"
                      />
                    }
                    label="Account Deactivated"
                  />
                </div>
    
                {/* Image URL */}
                <TextField
                  label="Profile Image URL"
                  fullWidth
                  margin="normal"
                  className="col-span-1 md:col-span-2"
                  value={editProfile?.image || ''}
                  onChange={(e) => setEditProfile({ ...editProfile, image: e.target.value })}
                  helperText="Enter the URL for the student's profile image"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                {editProfile?._id ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    };
    
    export default StudentManager;