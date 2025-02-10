import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";

const AdminJobProfileManager = () => {
  const [jobProfiles, setJobProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [editProfile, setEditProfile] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [filters, setFilters] = useState({
    job_type: "",
    job_category: "",
    job_class: "",
  });

  useEffect(() => {
    fetchJobProfiles();
  }, []);

  const fetchJobProfiles = async () => {
    try {
 
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles`,{withCredentials:true});
      setJobProfiles(response.data);
      setFilteredProfiles(response.data);
    } catch (error) {
      console.error("Error fetching job profiles:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    filterProfiles({ ...filters, [name]: value });
  };

  const filterProfiles = (filters) => {
    let filtered = jobProfiles;
    if (filters.job_type) {
      filtered = filtered.filter((profile) => profile.job_type === filters.job_type);
    }
    if (filters.job_category) {
      filtered = filtered.filter((profile) => profile.job_category === filters.job_category);
    }
    if (filters.job_class) {
      filtered = filtered.filter((profile) => profile.job_class === filters.job_class);
    }
    setFilteredProfiles(filtered);
  };

  const handleEdit = (profile) => {
    setEditProfile(profile);
    setOpenEditDialog(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles/${editProfile._id}`, editProfile);
      fetchJobProfiles();
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating job profile:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles/${id}`);
      fetchJobProfiles();
    } catch (error) {
      console.error("Error deleting job profile:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles/bulk-delete`, { ids: selectedProfiles });
      fetchJobProfiles();
      setSelectedProfiles([]);
    } catch (error) {
      console.error("Error bulk deleting job profiles:", error);
    }
  };

  const handleToggleShow = async (id, show) => {
    try {
      await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles/${id}`, { show: !show });
      fetchJobProfiles();
    } catch (error) {
      console.error("Error toggling show status:", error);
    }
  };

  const handleSelectProfile = (id) => {
    if (selectedProfiles.includes(id)) {
      setSelectedProfiles(selectedProfiles.filter((profileId) => profileId !== id));
    } else {
      setSelectedProfiles([...selectedProfiles, id]);
    }
  };

  return (
    <Paper>
      <div style={{ padding: "20px" }}>
        <h1>Manage Job Profiles</h1>
        <div style={{ marginBottom: "20px" }}>
          <FormControl style={{ marginRight: "10px", minWidth: "150px" }}>
            <InputLabel>Job Type</InputLabel>
            <Select name="job_type" value={filters.job_type} onChange={handleFilterChange}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="2m Intern">2m Intern</MenuItem>
              <MenuItem value="6m Intern">6m Intern</MenuItem>
              <MenuItem value="Intern+PPO">Intern+PPO</MenuItem>
              <MenuItem value="Intern+FTE">Intern+FTE</MenuItem>
              <MenuItem value="FTE">FTE</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ marginRight: "10px", minWidth: "150px" }}>
            <InputLabel>Job Category</InputLabel>
            <Select name="job_category" value={filters.job_category} onChange={handleFilterChange}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Non-Tech">Non-Tech</MenuItem>
              <MenuItem value="Tech+Non-Tech">Tech+Non-Tech</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ marginRight: "10px", minWidth: "150px" }}>
            <InputLabel>Job Class</InputLabel>
            <Select name="job_class" value={filters.job_class} onChange={handleFilterChange}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Below Dream">Below Dream</MenuItem>
              <MenuItem value="Dream">Dream</MenuItem>
              <MenuItem value="Super Dream">Super Dream</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBulkDelete}
          disabled={selectedProfiles.length === 0}
        >
          Bulk Delete
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Job Role</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Job Type</TableCell>
                <TableCell>Job Category</TableCell>
                <TableCell>Job Class</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProfiles.includes(profile._id)}
                      onChange={() => handleSelectProfile(profile._id)}
                    />
                  </TableCell>
                  <TableCell>{profile.job_role}</TableCell>
                  <TableCell>{profile.company_name}</TableCell>
                  <TableCell>{profile.job_type}</TableCell>
                  <TableCell>{profile.job_category}</TableCell>
                  <TableCell>{profile.job_class}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(profile)}>
                      <Edit />
                    </Button>
                    <Button onClick={() => handleDelete(profile._id)}>
                      <Delete />
                    </Button>
                    <Button onClick={() => handleToggleShow(profile._id, profile.show)}>
                      {profile.show ? <Visibility /> : <VisibilityOff />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Job Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Job Role"
            value={editProfile?.job_role || ""}
            onChange={(e) => setEditProfile({ ...editProfile, job_role: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company Name"
            value={editProfile?.company_name || ""}
            onChange={(e) => setEditProfile({ ...editProfile, company_name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Job Type</InputLabel>
            <Select
              value={editProfile?.job_type || ""}
              onChange={(e) => setEditProfile({ ...editProfile, job_type: e.target.value })}
            >
              <MenuItem value="2m Intern">2m Intern</MenuItem>
              <MenuItem value="6m Intern">6m Intern</MenuItem>
              <MenuItem value="Intern+PPO">Intern+PPO</MenuItem>
              <MenuItem value="Intern+FTE">Intern+FTE</MenuItem>
              <MenuItem value="FTE">FTE</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Job Category</InputLabel>
            <Select
              value={editProfile?.job_category || ""}
              onChange={(e) => setEditProfile({ ...editProfile, job_category: e.target.value })}
            >
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Non-Tech">Non-Tech</MenuItem>
              <MenuItem value="Tech+Non-Tech">Tech+Non-Tech</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Job Class</InputLabel>
            <Select
              value={editProfile?.job_class || ""}
              onChange={(e) => setEditProfile({ ...editProfile, job_class: e.target.value })}
            >
              <MenuItem value="Below Dream">Below Dream</MenuItem>
              <MenuItem value="Dream">Dream</MenuItem>
              <MenuItem value="Super Dream">Super Dream</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminJobProfileManager;