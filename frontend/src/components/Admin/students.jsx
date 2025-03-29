import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit, X, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
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
  IconButton
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
  const [filters, setFilters] = useState({
    department: '',
    course: '',
    placementstatus: '',
    minCgpa: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 100;

  // Predefined lists (same as before)
  const departments = [
    "Biotechnology","Chemical Engineering","Civil Engineering","Computer Science & Engineering","Data Science and Engineering","Electrical Engineering",
    "Electronics & Communication Engineering","Electronics and VLSI Engineering","Industrial and Production Engineering",
    "Information Technology","Instrumentation and Control Engineering","Mathematics and Computing","Mechanical Engineering",
    "Textile Technology","Structural and Construction Engineering","Geotechnical and Geo-Environmental Engineering",
    "Information Security","Electric Vehicle Design","Signal Processing and Machine Learning","VLSI Design","Industrial Engineering and Data Analytics",
    "Manufacturing Technology With Machine Learning","Data Analytics","Control and Instrumentation","Machine Intelligence and Automation",
    "Mathematics and Computing","Design Engineering","Thermal and Energy Engineering","Textile Engineering and Management","Renewable Energy",
    "Artificial Intelligence","Power Systems and Reliability","Finance","Human Resource","Marketing","Chemistry","Mathematics",
    "Physics",
];

  const courses = ["B.Tech", "M.Tech", "MBA", "M.Sc", "PHD"];
  const placementStatuses = ['Not Placed', 'Below Dream', 'Dream', 'Super Dream'];

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

  const openDeleteConfirmModal = (type, studentId = null) => {
    const studentToDelete = type === 'single' 
      ? students.find(s => s._id === studentId)
      : null;

    // Explicitly set the modal to open
    setDeleteConfirmModal({
      isOpen: true,
      type,
      studentId: studentId,
      rollNoConfirmation: '',
      studentRollNo: studentToDelete ? studentToDelete.rollno : ''
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
      
      // Close delete confirmation modal
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
      email: '', // New field
      password: '', // New field
      department: '',
      course: '',
      cgpa: '',
      internshipstatus: '',
      placementstatus: ''
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
        (!filters.minCgpa || parseFloat(student.cgpa) >= parseFloat(filters.minCgpa))
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
                  <th className="border p-2">Department</th>
                  <th className="border p-2">Course</th>
                  <th className="border p-2">CGPA</th>
                  <th className="border p-2">Internship Status</th>
                  <th className="border p-2">Placement Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map(student => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleSelectStudent(student._id)}
                      />
                    </td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.rollno}</td>
                    <td className="border p-2">{student.department}</td>
                    <td className="border p-2">{student.course}</td>
                    <td className="border p-2">{student.cgpa}</td>
                    <td className="border p-2">{student.internshipstatus}</td>
                    <td className="border p-2">{student.placementstatus}</td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => openEditModal(student)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => openDeleteConfirmModal('single', student._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 space-x-2">
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
        </>
      )}

      {/* Add/Edit Student Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editProfile?._id ? 'Edit Student' : 'Add Student'}
        </DialogTitle>
        <DialogContent>
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
                <MenuItem key={course} value={course}>{course}</MenuItem>
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
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Internship Status</InputLabel>
            <Select
              value={editProfile?.internshipstatus || ''}
              onChange={(e) => setEditProfile({ ...editProfile, internshipstatus: e.target.value })}
            >
              <MenuItem value="">Internship Status</MenuItem>
              <MenuItem value="No Intern">No Intern</MenuItem>
              <MenuItem value="2m Intern">2m Intern</MenuItem>
              <MenuItem value="6m Intern">6m Intern</MenuItem>
              <MenuItem value="11m Intern">11m Intern</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Placement Status</InputLabel>
            <Select
              value={editProfile?.placementstatus || ''}
              onChange={(e) => setEditProfile({ ...editProfile, placementstatus: e.target.value })}
            >
              <MenuItem value="">Placement Status</MenuItem>
              {placementStatuses.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
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