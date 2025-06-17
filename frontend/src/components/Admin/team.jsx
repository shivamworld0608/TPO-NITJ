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
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";

const DevteamManager = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [editProfile, setEditProfile] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    type: '', // 'bulk' or 'single'
    developerId: null,
    confirmationInput: '',
    developerEmail: ''
  });
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const developersPerPage = 100;

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/devteam`,
        { withCredentials: true }
      );
      setDevelopers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch developers");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editProfile._id 
        ? `${import.meta.env.REACT_APP_BASE_URL}/admin/devteam/${editProfile._id}`
        : `${import.meta.env.REACT_APP_BASE_URL}/admin/devteam`;
      
      const method = editProfile._id ? axios.put : axios.post;
      
      const response = await method(url, editProfile, { withCredentials: true });
      
      fetchDevelopers();
      setOpenEditDialog(false);
      
      toast.success(editProfile._id ? "Developer updated successfully" : "Developer added successfully");
    } catch (error) {
      toast.error(`Failed to ${editProfile._id ? 'update' : 'add'} developer`);
    }
  };

  const updateDeleteConfirmation = useCallback((value) => {
    setDeleteConfirmModal(prev => ({
      ...prev, 
      confirmationInput: value
    }));
  }, []);

  const openDeleteConfirmModal = (type, developerId = null) => {
    const developerToDelete = type === 'single' 
      ? developers.find(d => d._id === developerId)
      : null;

    setDeleteConfirmModal({
      isOpen: true,
      type,
      developerId: developerId,
      confirmationInput: '',
      developerEmail: developerToDelete ? developerToDelete.email : ''
    });
  };

  const handleDeleteDevelopers = async () => {
    try {
      const idsToDelete = deleteConfirmModal.type === 'bulk' 
        ? selectedDevelopers 
        : [deleteConfirmModal.developerId];

      await axios.delete(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/devteam`,
        { 
          data: { developerIds: idsToDelete },
          withCredentials: true 
        }
      );
      
      setDevelopers(developers.filter(developer => !idsToDelete.includes(developer._id)));
      setSelectedDevelopers([]);
      
      setDeleteConfirmModal(prev => ({ 
        ...prev,
        isOpen: false, 
        type: '', 
        developerId: null, 
        confirmationInput: '' 
      }));

      toast.success("Developers deleted successfully");
    } catch (error) {
      toast.error("Failed to delete developers");
    }
  };

  const DeleteConfirmationModal = () => {
    if (!deleteConfirmModal.isOpen) return null;

    const developerToDelete = deleteConfirmModal.type === 'single'
      ? developers.find(d => d._id === deleteConfirmModal.developerId)
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
                developerId: null, 
                confirmationInput: '' 
              }))}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="mb-4">
            {deleteConfirmModal.type === 'bulk'
              ? `Are you sure you want to delete ${selectedDevelopers.length} selected developers?`
              : `Are you sure you want to delete developer with email: ${developerToDelete?.email}?`
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
                developerId: null, 
                confirmationInput: '' 
              }))}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteDevelopers}
              disabled={deleteConfirmModal.type === 'single' 
                ? deleteConfirmModal.confirmationInput !== developerToDelete?.email
                : false
              }
              className={`
                px-4 py-2 rounded text-white
                ${(deleteConfirmModal.type === 'single' 
                  ? deleteConfirmModal.confirmationInput !== developerToDelete?.email
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

  const handleSelectDeveloper = (developerId) => {
    setSelectedDevelopers(prev => 
      prev.includes(developerId) 
        ? prev.filter(id => id !== developerId)
        : [...prev, developerId]
    );
  };

  const openEditModal = (developer = null) => {
    setEditProfile(developer || {
      name: '',
      image: '',
      linkedinUrl: '',
      githubUrl: '',
      resumeUrl: '',
      website: '',
      email: '',
      mobile: '',
      department: '',
      batch: '',
      role: 'Developer'
    });
    setOpenEditDialog(true);
  };

  const applyFilters = () => {
    return developers.filter(developer => {
      return (
        (!filters.name || (developer.name && developer.name.toLowerCase().includes(filters.name.toLowerCase()))) &&
        (!filters.email || (developer.email && developer.email.toLowerCase().includes(filters.email.toLowerCase()))) &&
        (!filters.role || (developer.role && developer.role.toLowerCase().includes(filters.role.toLowerCase())))
      );
    });
  };

  // Pagination logic
  const filteredDevelopers = applyFilters();
  const indexOfLastDeveloper = currentPage * developersPerPage;
  const indexOfFirstDeveloper = indexOfLastDeveloper - developersPerPage;
  const currentDevelopers = filteredDevelopers.slice(indexOfFirstDeveloper, indexOfLastDeveloper);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <DeleteConfirmationModal />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center mb-2 md:mb-0">
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Developer Team Management
        </h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button 
            onClick={() => openEditModal()}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <Plus className="mr-2" /> Add Developer
          </button>
          {selectedDevelopers.length > 0 && (
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
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
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
        <input
          type="text"
          placeholder="Role"
          value={filters.role}
          onChange={(e) => {
            setFilters({ ...filters, role: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded"
        />
      </div>

      {/* Developer Table */}
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
                      checked={selectedDevelopers.length === currentDevelopers.length}
                      onChange={() => setSelectedDevelopers(
                        selectedDevelopers.length === currentDevelopers.length 
                          ? [] 
                          : currentDevelopers.map(developer => developer._id)
                      )}
                    />
                  </th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Mobile</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Department</th>
                  <th className="border p-2">Batch</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDevelopers.map(developer => (
                  <tr key={developer._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedDevelopers.includes(developer._id)}
                        onChange={() => handleSelectDeveloper(developer._id)}
                      />
                    </td>
                    <td className="border p-2">{developer.name}</td>
                    <td className="border p-2">{developer.email}</td>
                    <td className="border p-2">{developer.mobile}</td>
                    <td className="border p-2">{developer.role}</td>
                    <td className="border p-2">{developer.department}</td>
                    <td className="border p-2">{developer.batch}</td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => openEditModal(developer)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => openDeleteConfirmModal('single', developer._id)}
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
              Showing {indexOfFirstDeveloper + 1} to {Math.min(indexOfLastDeveloper, filteredDevelopers.length)} of {filteredDevelopers.length} developers
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
                Page {currentPage} of {Math.ceil(filteredDevelopers.length / developersPerPage)}
              </span>
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage >= Math.ceil(filteredDevelopers.length / developersPerPage)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add/Edit Developer Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editProfile?._id ? 'Edit Developer' : 'Add Developer'}
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
              required
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
              label="Mobile"
              fullWidth
              margin="normal"
              value={editProfile?.mobile || ''}
              onChange={(e) => setEditProfile({ ...editProfile, mobile: e.target.value })}
            />
            <TextField
              label="Department"
              fullWidth
              margin="normal"
              value={editProfile?.department || ''}
              onChange={(e) => setEditProfile({ ...editProfile, department: e.target.value })}
            />
            <TextField
              label="Batch"
              fullWidth
              margin="normal"
              value={editProfile?.batch || ''}
              onChange={(e) => setEditProfile({ ...editProfile, batch: e.target.value })}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={editProfile?.role || 'Developer'}
                onChange={(e) => setEditProfile({ ...editProfile, role: e.target.value })}
                label="Role"
              >
                <MenuItem value="Coordinator">Coordinator</MenuItem>
                <MenuItem value="Developer Team Lead">Developer Team Lead</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              value={editProfile?.image || ''}
              onChange={(e) => setEditProfile({ ...editProfile, image: e.target.value })}
            />
            <TextField
              label="LinkedIn URL"
              fullWidth
              margin="normal"
              value={editProfile?.linkedinUrl || ''}
              onChange={(e) => setEditProfile({ ...editProfile, linkedinUrl: e.target.value })}
            />
            <TextField
              label="GitHub URL"
              fullWidth
              margin="normal"
              value={editProfile?.githubUrl || ''}
              onChange={(e) => setEditProfile({ ...editProfile, githubUrl: e.target.value })}
            />
            <TextField
              label="Resume URL"
              fullWidth
              margin="normal"
              value={editProfile?.resumeUrl || ''}
              onChange={(e) => setEditProfile({ ...editProfile, resumeUrl: e.target.value })}
            />
            <TextField
              label="Website URL"
              fullWidth
              margin="normal"
              value={editProfile?.website || ''}
              onChange={(e) => setEditProfile({ ...editProfile, website: e.target.value })}
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

export default DevteamManager;