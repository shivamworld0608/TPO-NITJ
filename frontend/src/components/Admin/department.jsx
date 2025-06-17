import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
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
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import Select from "react-select";

// Combine all department options, merging options with the same label
const departmentOptions = [
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
      { value: "CIVIL ENGINEERING", label: "CIVIL ENGINEERING" },
      { value: "STRUCTURAL AND CONSTRUCTION ENGINEERING", label: "STRUCTURAL AND CONSTRUCTION ENGINEERING" },
      { value: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING", label: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING" },
    ],
  },
  {
    label: "COMPUTER SCIENCE AND ENGINEERING",
    options: [
      { value: "COMPUTER SCIENCE AND ENGINEERING", label: "COMPUTER SCIENCE AND ENGINEERING" },
      { value: "DATA SCIENCE AND ENGINEERING", label: "DATA SCIENCE AND ENGINEERING" },
      { value: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)", label: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)" },
    ],
  },
  {
    label: "ELECTRICAL ENGINEERING",
    options: [
      { value: "ELECTRICAL ENGINEERING", label: "ELECTRICAL ENGINEERING" },
      { value: "ELECTRIC VEHICLE DESIGN", label: "ELECTRIC VEHICLE DESIGN" },
    ],
  },
  {
    label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    options: [
      { value: "ELECTRONICS AND COMMUNICATION ENGINEERING", label: "ELECTRONICS AND COMMUNICATION ENGINEERING" },
      { value: "ELECTRONICS AND VLSI ENGINEERING", label: "ELECTRONICS AND VLSI ENGINEERING" },
      { value: "SIGNAL PROCESSING AND MACHINE LEARNING", label: "SIGNAL PROCESSING AND MACHINE LEARNING" },
      { value: "VLSI DESIGN", label: "VLSI DESIGN" },
    ],
  },
  {
    label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
    options: [
      { value: "INDUSTRIAL AND PRODUCTION ENGINEERING", label: "INDUSTRIAL AND PRODUCTION ENGINEERING" },
      { value: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS", label: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS" },
    ],
  },
  {
    label: "INFORMATION TECHNOLOGY",
    options: [
      { value: "INFORMATION TECHNOLOGY", label: "INFORMATION TECHNOLOGY" },
      { value: "DATA ANALYTICS", label: "DATA ANALYTICS" },
    ],
  },
  {
    label: "INSTRUMENTATION AND CONTROL ENGINEERING",
    options: [
      { value: "INSTRUMENTATION AND CONTROL ENGINEERING", label: "INSTRUMENTATION AND CONTROL ENGINEERING" },
      { value: "CONTROL AND INSTRUMENTATION ENGINEERING", label: "CONTROL AND INSTRUMENTATION ENGINEERING" },
      { value: "MACHINE INTELLIGENCE AND AUTOMATION", label: "MACHINE INTELLIGENCE AND AUTOMATION" },
    ],
  },
  {
    label: "MATHEMATICS AND COMPUTING",
    options: [{ value: "MATHEMATICS AND COMPUTING", label: "MATHEMATICS AND COMPUTING" }],
  },
  {
    label: "MECHANICAL ENGINEERING",
    options: [
      { value: "MECHANICAL ENGINEERING", label: "MECHANICAL ENGINEERING" },
      { value: "DESIGN ENGINEERING", label: "DESIGN ENGINEERING" },
      { value: "THERMAL AND ENERGY ENGINEERING", label: "THERMAL AND ENERGY ENGINEERING" },
    ],
  },
  {
    label: "TEXTILE TECHNOLOGY",
    options: [
      { value: "TEXTILE TECHNOLOGY", label: "TEXTILE TECHNOLOGY" },
      { value: "TEXTILE ENGINEERING AND MANAGEMENT", label: "TEXTILE ENGINEERING AND MANAGEMENT" },
    ],
  },
  {
    label: "RENEWABLE ENERGY",
    options: [{ value: "RENEWABLE ENERGY", label: "RENEWABLE ENERGY" }],
  },
  {
    label: "ARTIFICIAL INTELLIGENCE",
    options: [{ value: "ARTIFICIAL INTELLIGENCE", label: "ARTIFICIAL INTELLIGENCE" }],
  },
  {
    label: "POWER SYSTEMS AND RELIABILITY",
    options: [{ value: "POWER SYSTEMS AND RELIABILITY", label: "POWER SYSTEMS AND RELIABILITY" }],
  },
  {
    label: "HUMANITIES AND MANAGEMENT",
    options: [{ value: "HUMANITIES AND MANAGEMENT", label: "HUMANITIES AND MANAGEMENT" }],
  },
  {
    label: "CHEMISTRY",
    options: [{ value: "CHEMISTRY", label: "CHEMISTRY" }],
  },
  {
    label: "MATHEMATICS",
    options: [{ value: "MATHEMATICS", label: "MATHEMATICS" }],
  },
  {
    label: "PHYSICS",
    options: [{ value: "PHYSICS", label: "PHYSICS" }],
  },
];

// Create name options from departmentOptions labels
const nameOptions = departmentOptions.map((dept) => ({
  value: dept.label,
  label: dept.label,
}));

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [editDepartment, setEditDepartment] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    type: '',
    departmentId: null,
    confirmationInput: '',
    departmentEmail: ''
  });
  const [filters, setFilters] = useState({
    name: '',
    email: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 100;

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/departments`,
        { withCredentials: true }
      );
      setDepartments(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch departments");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editDepartment._id 
        ? `${import.meta.env.REACT_APP_BASE_URL}/admin/departments/${editDepartment._id}`
        : `${import.meta.env.REACT_APP_BASE_URL}/admin/departments`;
      
      const method = editDepartment._id ? axios.put : axios.post;
      
      const response = await method(url, editDepartment, { withCredentials: true });
      
      fetchDepartments();
      setOpenEditDialog(false);
      
      toast.success(editDepartment._id ? "Department updated successfully" : "Department added successfully");
    } catch (error) {
      toast.error(`Failed to ${editDepartment._id ? 'update' : 'add'} department`);
    }
  };

  const updateDeleteConfirmation = useCallback((value) => {
    setDeleteConfirmModal(prev => ({
      ...prev, 
      confirmationInput: value
    }));
  }, []);

  const openDeleteConfirmModal = (type, departmentId = null) => {
    const departmentToDelete = type === 'single' 
      ? departments.find(d => d._id === departmentId)
      : null;

    setDeleteConfirmModal({
      isOpen: true,
      type,
      departmentId: departmentId,
      confirmationInput: '',
      departmentEmail: departmentToDelete ? departmentToDelete.email : ''
    });
  };

  const handleDeleteDepartments = async () => {
    try {
      const idsToDelete = deleteConfirmModal.type === 'bulk' 
        ? selectedDepartments 
        : [deleteConfirmModal.departmentId];

      await axios.delete(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/departments`,
        { 
          data: { DepartmentIds: idsToDelete },
          withCredentials: true 
        }
      );
      
      setDepartments(departments.filter(department => !idsToDelete.includes(department._id)));
      setSelectedDepartments([]);
      
      setDeleteConfirmModal(prev => ({ 
        ...prev,
        isOpen: false, 
        type: '', 
        departmentId: null, 
        confirmationInput: '' 
      }));

      toast.success("Departments deleted successfully");
    } catch (error) {
      toast.error("Failed to delete departments");
    }
  };

  const DeleteConfirmationModal = () => {
    if (!deleteConfirmModal.isOpen) return null;

    const departmentToDelete = deleteConfirmModal.type === 'single'
      ? departments.find(d => d._id === deleteConfirmModal.departmentId)
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
                departmentId: null, 
                confirmationInput: '' 
              }))}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="mb-4">
            {deleteConfirmModal.type === 'bulk'
              ? `Are you sure you want to delete ${selectedDepartments.length} selected departments?`
              : `Are you sure you want to delete department with email: ${departmentToDelete?.email}?`
            }
          </p>
          
          <div className="mb-4">
            <label className="block mb-2">
              Type the email to confirm:
            </label>
            <input 
              type="text"
              value={deleteConfirmModal.confirmationInput}
              onChange={(e) => updateDeleteConfirmation(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter email"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setDeleteConfirmModal(prev => ({ 
                ...prev,
                isOpen: false, 
                type: '', 
                departmentId: null, 
                confirmationInput: '' 
              }))}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteDepartments}
              disabled={deleteConfirmModal.type === 'single' 
                ? deleteConfirmModal.confirmationInput !== departmentToDelete?.email
                : false
              }
              className={`
                px-4 py-2 rounded text-white
                ${(deleteConfirmModal.type === 'single' 
                  ? deleteConfirmModal.confirmationInput !== departmentToDelete?.email
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

  const handleSelectDepartment = (departmentId) => {
    setSelectedDepartments(prev => 
      prev.includes(departmentId) 
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const openEditModal = (department = null) => {
    setEditDepartment(department || {
      name: '',
      email: '',
      password: '',
      departments: [],
      otp: ''
    });
    setOpenEditDialog(true);
    setShowPassword(false);
  };

  const applyFilters = () => {
    return departments.filter(department => {
      return (
        (!filters.name || (department.name && department.name.toLowerCase().includes(filters.name.toLowerCase()))) &&
        (!filters.email || (department.email && department.email.toLowerCase().includes(filters.email.toLowerCase())))
      );
    });
  };

  const handleNameChange = (selectedOption) => {
    const selectedName = selectedOption ? selectedOption.value : '';
    const selectedDept = departmentOptions.find(dept => dept.label === selectedName);
    const subDepartments = selectedDept ? selectedDept.options.map(option => option.value) : [];

    setEditDepartment({
      ...editDepartment,
      name: selectedName,
      departments: subDepartments,
    });
  };

  const handleSubDepartmentsChange = (selectedOptions) => {
    setEditDepartment({
      ...editDepartment,
      departments: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    });
  };

  const filteredDepartments = applyFilters();
  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = filteredDepartments.slice(indexOfFirstDepartment, indexOfLastDepartment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <DeleteConfirmationModal />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center mb-2 md:mb-0">
          <FontAwesomeIcon icon={faBuilding} className="mr-3" />
          Department Management
        </h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button 
            onClick={() => openEditModal()}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <Plus className="mr-2" /> Add Department
          </button>
          {selectedDepartments.length > 0 && (
            <button 
              onClick={() => openDeleteConfirmModal('bulk')}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <Trash2 className="mr-2" /> Delete Selected
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
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
          placeholder="Email"
          value={filters.email}
          onChange={(e) => {
            setFilters({ ...filters, email: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
      </div>

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
                      checked={selectedDepartments.length === currentDepartments.length}
                      onChange={() => setSelectedDepartments(
                        selectedDepartments.length === currentDepartments.length 
                          ? [] 
                          : currentDepartments.map(department => department._id)
                      )}
                    />
                  </th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Programmes</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDepartments.map(department => (
                  <tr key={department._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedDepartments.includes(department._id)}
                        onChange={() => handleSelectDepartment(department._id)}
                      />
                    </td>
                    <td className="border p-2">{department.name}</td>
                    <td className="border p-2">{department.email}</td>
                    <td className="border p-2">
                      <div className="flex flex-wrap gap-1">
                        {department.departments.map((subDept, index) => (
                          <Chip key={index} label={subDept} size="small" />
                        ))}
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => openEditModal(department)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => openDeleteConfirmModal('single', department._id)}
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

          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {indexOfFirstDepartment + 1} to {Math.min(indexOfLastDepartment, filteredDepartments.length)} of {filteredDepartments.length} departments
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
                Page {currentPage} of {Math.ceil(filteredDepartments.length / departmentsPerPage)}
              </span>
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage >= Math.ceil(filteredDepartments.length / departmentsPerPage)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editDepartment?._id ? 'Edit Department' : 'Add Department'}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <Select
                options={nameOptions}
                onChange={handleNameChange}
                value={nameOptions.find(option => option.value === editDepartment?.name)}
                className="w-full border-2 p-1.5 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300 z-40"
                placeholder="Select Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Programmes
              </label>
              <Select
                options={departmentOptions}
                isMulti
                onChange={handleSubDepartmentsChange}
                value={departmentOptions
                  .flatMap((group) => group.options)
                  .filter((option) => editDepartment?.departments?.includes(option.value))}
                className="w-full border-2 p-1.5 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300 z-20"
              />
            </div>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={editDepartment?.email || ''}
              onChange={(e) => setEditDepartment({ ...editDepartment, email: e.target.value })}
              required
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={editDepartment?.password || ''}
              onChange={(e) => setEditDepartment({ ...editDepartment, password: e.target.value })}
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
              helperText={!editDepartment?._id ? "Required for new departments" : "Leave blank to keep existing password"}
            />
            <TextField
              label="OTP"
              fullWidth
              margin="normal"
              value={editDepartment?.otp || ''}
              onChange={(e) => setEditDepartment({ ...editDepartment, otp: e.target.value })}
              helperText="Optional one-time password"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editDepartment?._id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DepartmentManager;