import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
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
  IconButton
} from "@mui/material";

const ProfessorManager = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [editProfile, setEditProfile] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    type: '', // 'bulk' or 'single'
    professorId: null,
    confirmationInput: '',
    professorEmail: ''
  });
  const [filters, setFilters] = useState({
    name: '',
    email: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const professorsPerPage = 100;

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/professors`,
        { withCredentials: true }
      );
      setProfessors(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch professors");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editProfile._id 
        ? `${import.meta.env.REACT_APP_BASE_URL}/admin/professors/${editProfile._id}`
        : `${import.meta.env.REACT_APP_BASE_URL}/admin/professors`;
      
      const method = editProfile._id ? axios.put : axios.post;
      
      const response = await method(url, editProfile, { withCredentials: true });
      
      fetchProfessors();
      setOpenEditDialog(false);
      
      toast.success(editProfile._id ? "Professor updated successfully" : "Professor added successfully");
    } catch (error) {
      toast.error(`Failed to ${editProfile._id ? 'update' : 'add'} professor`);
    }
  };

  const updateDeleteConfirmation = useCallback((value) => {
    setDeleteConfirmModal(prev => ({
      ...prev, 
      confirmationInput: value
    }));
  }, []);

  const openDeleteConfirmModal = (type, professorId = null) => {
    const professorToDelete = type === 'single' 
      ? professors.find(p => p._id === professorId)
      : null;

    setDeleteConfirmModal({
      isOpen: true,
      type,
      professorId: professorId,
      confirmationInput: '',
      professorEmail: professorToDelete ? professorToDelete.email : ''
    });
  };

  const handleDeleteProfessors = async () => {
    try {
      const idsToDelete = deleteConfirmModal.type === 'bulk' 
        ? selectedProfessors 
        : [deleteConfirmModal.professorId];

      await axios.delete(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/professors`,
        { 
          data: { professorIds: idsToDelete },
          withCredentials: true 
        }
      );
      
      setProfessors(professors.filter(professor => !idsToDelete.includes(professor._id)));
      setSelectedProfessors([]);
      
      setDeleteConfirmModal(prev => ({ 
        ...prev,
        isOpen: false, 
        type: '', 
        professorId: null, 
        confirmationInput: '' 
      }));

      toast.success("Professors deleted successfully");
    } catch (error) {
      toast.error("Failed to delete professors");
    }
  };

  const DeleteConfirmationModal = () => {
    if (!deleteConfirmModal.isOpen) return null;

    const professorToDelete = deleteConfirmModal.type === 'single'
      ? professors.find(p => p._id === deleteConfirmModal.professorId)
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
                professorId: null, 
                confirmationInput: '' 
              }))}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="mb-4">
            {deleteConfirmModal.type === 'bulk'
              ? `Are you sure you want to delete ${selectedProfessors.length} selected professors?`
              : `Are you sure you want to delete professor with email: ${professorToDelete?.email}?`
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
                professorId: null, 
                confirmationInput: '' 
              }))}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteProfessors}
              disabled={deleteConfirmModal.type === 'single' 
                ? deleteConfirmModal.confirmationInput !== professorToDelete?.email
                : false
              }
              className={`
                px-4 py-2 rounded text-white
                ${(deleteConfirmModal.type === 'single' 
                  ? deleteConfirmModal.confirmationInput !== professorToDelete?.email
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

  const handleSelectProfessor = (professorId) => {
    setSelectedProfessors(prev => 
      prev.includes(professorId) 
        ? prev.filter(id => id !== professorId)
        : [...prev, professorId]
    );
  };

  const openEditModal = (professor = null) => {
    setEditProfile(professor || {
      name: '',
      email: '',
      password: ''
    });
    setOpenEditDialog(true);
    setShowPassword(false);
  };

  const applyFilters = () => {
    return professors.filter(professor => {
      return (
        (!filters.name || (professor.name && professor.name.toLowerCase().includes(filters.name.toLowerCase()))) &&
        (!filters.email || (professor.email && professor.email.toLowerCase().includes(filters.email.toLowerCase())))
      );
    });
  };

  // Pagination logic
  const filteredProfessors = applyFilters();
  const indexOfLastProfessor = currentPage * professorsPerPage;
  const indexOfFirstProfessor = indexOfLastProfessor - professorsPerPage;
  const currentProfessors = filteredProfessors.slice(indexOfFirstProfessor, indexOfLastProfessor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <DeleteConfirmationModal />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center mb-2 md:mb-0">
          <FontAwesomeIcon icon={faUserTie} className="mr-3" />
          Professor Management
        </h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button 
            onClick={() => openEditModal()}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <Plus className="mr-2" /> Add Professor
          </button>
          {selectedProfessors.length > 0 && (
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

      {/* Professor Table */}
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
                      checked={selectedProfessors.length === currentProfessors.length}
                      onChange={() => setSelectedProfessors(
                        selectedProfessors.length === currentProfessors.length 
                          ? [] 
                          : currentProfessors.map(professor => professor._id)
                      )}
                    />
                  </th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProfessors.map(professor => (
                  <tr key={professor._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedProfessors.includes(professor._id)}
                        onChange={() => handleSelectProfessor(professor._id)}
                      />
                    </td>
                    <td className="border p-2">{professor.name}</td>
                    <td className="border p-2">{professor.email}</td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => openEditModal(professor)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => openDeleteConfirmModal('single', professor._id)}
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
              Showing {indexOfFirstProfessor + 1} to {Math.min(indexOfLastProfessor, filteredProfessors.length)} of {filteredProfessors.length} professors
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
                Page {currentPage} of {Math.ceil(filteredProfessors.length / professorsPerPage)}
              </span>
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage >= Math.ceil(filteredProfessors.length / professorsPerPage)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add/Edit Professor Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editProfile?._id ? 'Edit Professor' : 'Add Professor'}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-4">
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
              helperText={!editProfile?._id ? "Required for new professors" : "Leave blank to keep existing password"}
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

export default ProfessorManager;