import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const BrochureManager = () => {
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrochures, setSelectedBrochures] = useState([]);
  const [editBrochure, setEditBrochure] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    type: "",
    brochureId: null,
    confirmationInput: "",
    departmentName: "",
  });
  const [filters, setFilters] = useState({
    department_name: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState(null); // State for file upload
  const brochuresPerPage = 10;

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/admin/brochure/get`, {
        withCredentials: true,
      });
      setBrochures(Array.isArray(response.data.data) ? response.data.data : []);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch brochures");
      setBrochures([]);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editBrochure?._id
        ? `${import.meta.env.REACT_APP_BASE_URL}/admin/brochure/update/${editBrochure._id}`
        : `${import.meta.env.REACT_APP_BASE_URL}/admin/brochure/add`;

      const formData = new FormData();
      formData.append("department_name", editBrochure.department_name);
      formData.append("department_link", editBrochure.department_link);
      if (file) {
        formData.append("brochure_file", file);
      } else if (!editBrochure?._id) {
        toast.error("PDF file is required for new brochures");
        return;
      }

      const method = editBrochure?._id ? axios.put : axios.post;

      const response = await method(url, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchBrochures();
      setOpenEditDialog(false);
      setFile(null); // Reset file input
      toast.success(editBrochure?._id ? "Brochure updated successfully" : "Brochure added successfully");
    } catch (error) {
      toast.error(`Failed to ${editBrochure?._id ? "update" : "add"} brochure`);
    }
  };

  const updateDeleteConfirmation = useCallback((value) => {
    setDeleteConfirmModal((prev) => ({
      ...prev,
      confirmationInput: value,
    }));
  }, []);

  const openDeleteConfirmModal = (type, brochureId = null) => {
    const brochureToDelete = type === "single" ? brochures.find((b) => b._id === brochureId) : null;

    setDeleteConfirmModal({
      isOpen: true,
      type,
      brochureId,
      confirmationInput: "",
      departmentName: brochureToDelete ? brochureToDelete.department_name : "",
    });
  };

  const handleDeleteBrochures = async () => {
    try {
      const idsToDelete = deleteConfirmModal.type === "bulk" ? selectedBrochures : [deleteConfirmModal.brochureId];

      await axios.delete(`${import.meta.env.REACT_APP_BASE_URL}/admin/brochure/delete`, {
        data: { brochureIds: idsToDelete },
        withCredentials: true,
      });

      setBrochures(brochures.filter((brochure) => !idsToDelete.includes(brochure._id)));
      setSelectedBrochures([]);

      setDeleteConfirmModal((prev) => ({
        ...prev,
        isOpen: false,
        type: "",
        brochureId: null,
        confirmationInput: "",
      }));

      toast.success("Brochures deleted successfully");
    } catch (error) {
      toast.error("Failed to delete brochures");
    }
  };

  const DeleteConfirmationModal = () => {
    if (!deleteConfirmModal.isOpen) return null;

    const brochureToDelete = deleteConfirmModal.type === "single" ? brochures.find((b) => b._id === deleteConfirmModal.brochureId) : null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Confirm Deletion</h2>
            <button
              onClick={() =>
                setDeleteConfirmModal((prev) => ({
                  ...prev,
                  isOpen: false,
                  type: "",
                  brochureId: null,
                  confirmationInput: "",
                }))
              }
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <p className="mb-4">
            {deleteConfirmModal.type === "bulk"
              ? `Are you sure you want to delete ${selectedBrochures.length} selected brochures?`
              : `Are you sure you want to delete the brochure for ${brochureToDelete?.department_name}?`}
          </p>

          <div className="mb-4">
            <label className="block mb-2">Type the department name to confirm:</label>
            <input
              type="text"
              value={deleteConfirmModal.confirmationInput}
              onChange={(e) => updateDeleteConfirmation(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter department name"
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() =>
                setDeleteConfirmModal((prev) => ({
                  ...prev,
                  isOpen: false,
                  type: "",
                  brochureId: null,
                  confirmationInput: "",
                }))
              }
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteBrochures}
              disabled={deleteConfirmModal.type === "single" ? deleteConfirmModal.confirmationInput !== brochureToDelete?.department_name : false}
              className={`
                px-4 py-2 rounded text-white
                ${(deleteConfirmModal.type === "single" ? deleteConfirmModal.confirmationInput !== brochureToDelete?.department_name : false)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"}
              `}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleSelectBrochure = (brochureId) => {
    setSelectedBrochures((prev) => (prev.includes(brochureId) ? prev.filter((id) => id !== brochureId) : [...prev, brochureId]));
  };

  const openEditModal = (brochure = null) => {
    setEditBrochure(
      brochure || {
        department_name: "",
        department_link: "",
        brochure_link: "",
      }
    );
    setFile(null); // Reset file input when opening modal
    setOpenEditDialog(true);
  };

  const applyFilters = () => {
    if (!Array.isArray(brochures)) {
      return [];
    }
    return brochures.filter(
      (brochure) =>
        !filters.department_name ||
        (brochure.department_name && brochure.department_name.toLowerCase().includes(filters.department_name.toLowerCase()))
    );
  };

  // Pagination logic
  const filteredBrochures = applyFilters();
  const indexOfLastBrochure = currentPage * brochuresPerPage;
  const indexOfFirstBrochure = indexOfLastBrochure - brochuresPerPage;
  const currentBrochures = filteredBrochures.slice(indexOfFirstBrochure, indexOfLastBrochure);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <DeleteConfirmationModal />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center mb-2 md:mb-0">
          <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
          Brochure Management
        </h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button
            onClick={() => openEditModal()}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <Plus className="mr-2" /> Add Brochure
          </button>
          {selectedBrochures.length > 0 && (
            <button
              onClick={() => openDeleteConfirmModal("bulk")}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <Trash2 className="mr-2" /> Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Department Name"
          value={filters.department_name}
          onChange={(e) => {
            setFilters({ ...filters, department_name: e.target.value });
            setCurrentPage(1);
          }}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      {/* Brochure Table */}
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
                      checked={selectedBrochures.length === currentBrochures.length}
                      onChange={() =>
                        setSelectedBrochures(
                          selectedBrochures.length === currentBrochures.length ? [] : currentBrochures.map((brochure) => brochure._id)
                        )
                      }
                    />
                  </th>
                  <th className="border p-2">Department Name</th>
                  <th className="border p-2">Department Link</th>
                  <th className="border p-2">Brochure Link</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBrochures.map((brochure) => (
                  <tr key={brochure._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedBrochures.includes(brochure._id)}
                        onChange={() => handleSelectBrochure(brochure._id)}
                      />
                    </td>
                    <td className="border p-2">{brochure.department_name}</td>
                    <td className="border p-2">
                      <a href={brochure.department_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Visit Department
                      </a>
                    </td>
                    <td className="border p-2">
                      <a href={`${import.meta.env.REACT_APP_BASE_URL}${brochure.brochure_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View PDF
                      </a>
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => openEditModal(brochure)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteConfirmModal("single", brochure._id)}
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
              Showing {indexOfFirstBrochure + 1} to {Math.min(indexOfLastBrochure, filteredBrochures.length)} of {filteredBrochures.length} brochures
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
                Page {currentPage} of {Math.ceil(filteredBrochures.length / brochuresPerPage)}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage >= Math.ceil(filteredBrochures.length / brochuresPerPage)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add/Edit Brochure Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editBrochure?._id ? "Edit Brochure" : "Add Brochure"}</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-4">
            <TextField
              label="Department Name"
              fullWidth
              margin="normal"
              value={editBrochure?.department_name || ""}
              onChange={(e) => setEditBrochure({ ...editBrochure, department_name: e.target.value })}
              required
            />
            <TextField
              label="Department Link"
              type="url"
              fullWidth
              margin="normal"
              value={editBrochure?.department_link || ""}
              onChange={(e) => setEditBrochure({ ...editBrochure, department_link: e.target.value })}
              required
            />
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {editBrochure?._id ? "Update Brochure PDF (optional)" : "Upload Brochure PDF"}
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {editBrochure?.brochure_link && (
                <p className="mt-2 text-sm text-gray-600">
                  Current PDF: <a href={editBrochure.brochure_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Current PDF</a>
                </p>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editBrochure?._id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BrochureManager;