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
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton
} from "@mui/material";

const RecruiterManager = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);
  const [editProfile, setEditProfile] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    type: '', // 'bulk' or 'single'
    recruiterId: null,
    emailConfirmation: '',
    recruiterEmail: ''
  });
  const [filters, setFilters] = useState({
    company: '',
    designation: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recruitersPerPage = 100;

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/recruiters`,
        { withCredentials: true }
      );
      setRecruiters(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch recruiters");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editProfile._id 
        ? `${import.meta.env.REACT_APP_BASE_URL}/admin/recruiters/${editProfile._id}`
        : `${import.meta.env.REACT_APP_BASE_URL}/admin/recruiters`;
      
      const method = editProfile._id ? axios.put : axios.post;
      
      const response = await method(url, editProfile, { withCredentials: true });
      
      fetchRecruiters();
      setOpenEditDialog(false);
      
      toast.success(editProfile._id ? "Recruiter updated successfully" : "Recruiter added successfully");
    } catch (error) {
      toast.error(`Failed to ${editProfile._id ? 'update' : 'add'} recruiter`);
    }
  };

  const updateDeleteConfirmation = useCallback((value) => {
    setDeleteConfirmModal(prev => ({
      ...prev, 
      emailConfirmation: value
    }));
  }, []);

  const openDeleteConfirmModal = (type, recruiterId = null) => {
    const recruiterToDelete = type === 'single' 
      ? recruiters.find(r => r._id === recruiterId)
      : null;

    setDeleteConfirmModal({
      isOpen: true,
      type,
      recruiterId: recruiterId,
      emailConfirmation: '',
      recruiterEmail: recruiterToDelete ? recruiterToDelete.email : ''
    });
  };

  const handleDeleteRecruiters = async () => {
    try {
      const idsToDelete = deleteConfirmModal.type === 'bulk' 
        ? selectedRecruiters 
        : [deleteConfirmModal.recruiterId];

      await axios.delete(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/recruiters`,
        { 
          data: { recruiterIds: idsToDelete },
          withCredentials: true 
        }
      );
      
      setRecruiters(recruiters.filter(recruiter => !idsToDelete.includes(recruiter._id)));
      setSelectedRecruiters([]);
      
      setDeleteConfirmModal(prev => ({ 
        ...prev,
        isOpen: false, 
        type: '', 
        recruiterId: null, 
        emailConfirmation: '' 
      }));

      toast.success("Recruiters deleted successfully");
    } catch (error) {
      toast.error("Failed to delete recruiters");
    }
  };

  const DeleteConfirmationModal = () => {
    if (!deleteConfirmModal.isOpen) return null;

    const recruiterToDelete = deleteConfirmModal.type === 'single'
      ? recruiters.find(r => r._id === deleteConfirmModal.recruiterId)
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
                recruiterId: null, 
                emailConfirmation: '' 
              }))}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="mb-4">
            {deleteConfirmModal.type === 'bulk'
              ? `Are you sure you want to delete ${selectedRecruiters.length} selected recruiters?`
              : `Are you sure you want to delete recruiter with Email: ${recruiterToDelete?.email}?`
            }
          </p>
          
          <div className="mb-4">
            <label className="block mb-2">
              Type the Email to confirm:
            </label>
            <input 
              type="text"
              value={deleteConfirmModal.emailConfirmation}
              onChange={(e) => updateDeleteConfirmation(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter Email"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setDeleteConfirmModal(prev => ({ 
                ...prev,
                isOpen: false, 
                type: '', 
                recruiterId: null, 
                emailConfirmation: '' 
              }))}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteRecruiters}
              disabled={deleteConfirmModal.type === 'single' 
                ? deleteConfirmModal.emailConfirmation !== recruiterToDelete?.email
                : false
              }
              className={`
                px-4 py-2 rounded text-white
                ${(deleteConfirmModal.type === 'single' 
                  ? deleteConfirmModal.emailConfirmation !== recruiterToDelete?.email
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

  const handleSelectRecruiter = (recruiterId) => {
    setSelectedRecruiters(prev => 
      prev.includes(recruiterId) 
        ? prev.filter(id => id !== recruiterId)
        : [...prev, recruiterId]
    );
  };

  const openEditModal = (recruiter = null) => {
    setEditProfile(recruiter || {
      name: '',
      email: '',
      password: '',
      company: '',
      designation: ''
    });
    setOpenEditDialog(true);
    setShowPassword(false);
  };

  const applyFilters = () => {
    return recruiters.filter(recruiter => {
      return (
        (!filters.company || recruiter.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (!filters.designation || recruiter.designation.toLowerCase().includes(filters.designation.toLowerCase()))
      );
    });
  };

  // Pagination logic
  const filteredRecruiters = applyFilters();
  const indexOfLastRecruiter = currentPage * recruitersPerPage;
  const indexOfFirstRecruiter = indexOfLastRecruiter - recruitersPerPage;
  const currentRecruiters = filteredRecruiters.slice(indexOfFirstRecruiter, indexOfLastRecruiter);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <DeleteConfirmationModal />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center mb-2 md:mb-0">
          <FontAwesomeIcon icon={faBuilding} className="mr-3" />
          Recruiter Management
        </h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button 
            onClick={() => openEditModal()}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <Plus className="mr-2" /> Add Recruiter
          </button>
          {selectedRecruiters.length > 0 && (
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
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input 
          type="text"
          placeholder="Search Company"
          value={filters.company}
          onChange={(e) => {
            setFilters({...filters, company: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
        <input 
          type="text"
          placeholder="Search Designation"
          value={filters.designation}
          onChange={(e) => {
            setFilters({...filters, designation: e.target.value});
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
      </div>

      {/* Recruiter Table */}
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
                      checked={selectedRecruiters.length === currentRecruiters.length}
                      onChange={() => setSelectedRecruiters(
                        selectedRecruiters.length === currentRecruiters.length 
                          ? [] 
                          : currentRecruiters.map(recruiter => recruiter._id)
                      )}
                    />
                  </th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Company</th>
                  <th className="border p-2">Designation</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecruiters.map(recruiter => (
                  <tr key={recruiter._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedRecruiters.includes(recruiter._id)}
                        onChange={() => handleSelectRecruiter(recruiter._id)}
                      />
                    </td>
                    <td className="border p-2">{recruiter.name}</td>
                    <td className="border p-2">{recruiter.email}</td>
                    <td className="border p-2">{recruiter.company}</td>
                    <td className="border p-2">{recruiter.designation}</td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => openEditModal(recruiter)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => openDeleteConfirmModal('single', recruiter._id)}
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
              Page {currentPage} of {Math.ceil(filteredRecruiters.length / recruitersPerPage)}
            </span>
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage >= Math.ceil(filteredRecruiters.length / recruitersPerPage)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}

      {/* Add/Edit Recruiter Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editProfile?._id ? 'Edit Recruiter' : 'Add Recruiter'}
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
            helperText={!editProfile?._id ? "Required for new recruiters" : "Leave blank to keep existing password"}
          />
          <TextField
            label="Company"
            fullWidth
            margin="normal"
            value={editProfile?.company || ''}
            onChange={(e) => setEditProfile({ ...editProfile, company: e.target.value })}
          />
          <TextField
            label="Designation"
            fullWidth
            margin="normal"
            value={editProfile?.designation || ''}
            onChange={(e) => setEditProfile({ ...editProfile, designation: e.target.value })}
          />
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

export default RecruiterManager;