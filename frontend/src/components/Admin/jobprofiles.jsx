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
  FormControlLabel,
  Switch,
  Box,
  Typography
} from "@mui/material";
import { Delete, Edit, Visibility, VisibilityOff, Add } from "@mui/icons-material";

const AdminJobProfileManager = () => {
  const [jobProfiles, setJobProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [editProfile, setEditProfile] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [filters, setFilters] = useState({
    job_type: "",
    job_category: "",
    job_class: "",
  });

  const initialJobProfile = {
    job_type: "",
    company_name: "",
    company_logo: "",
    job_role: "",
    jobdescription: "",
    joblocation: "",
    job_category: "",
    job_salary: {
      ctc: "",
      base_salary: ""
    },
    deadline: new Date(),
    eligibility_criteria: {
      department_allowed: [],
      gender_allowed: "Any",
      eligible_batch: "",
      minimum_cgpa: 0.0,
      active_backlogs: false,
      history_backlogs: false,
      course_allowed: ""
    },
    job_class: "",
    visibility: true,
    Approved_Status: false,
    completed: false,
    recruiter_editing_allowed: false
  };

  useEffect(() => {
    fetchJobProfiles();
  }, []);

  const fetchJobProfiles = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles`, { withCredentials: true });
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
    setIsAddMode(false);
    setOpenEditDialog(true);
  };

  const handleAdd = () => {
    setEditProfile({ ...initialJobProfile });
    setIsAddMode(true);
    setOpenEditDialog(true);
  };

  const handleSave = async () => {
    try {
      if (isAddMode) {
        await axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles`, 
          editProfile,
          { withCredentials: true }
        );
      } else {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles/${editProfile._id}`, 
          editProfile,
          { withCredentials: true }
        );
      }
      fetchJobProfiles();
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error saving job profile:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles/${id}`, { withCredentials: true });
      fetchJobProfiles();
    } catch (error) {
      console.error("Error deleting job profile:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles/bulk-delete`, 
        { ids: selectedProfiles },
        { withCredentials: true }
      );
      fetchJobProfiles();
      setSelectedProfiles([]);
    } catch (error) {
      console.error("Error bulk deleting job profiles:", error);
    }
  };

  const handleToggleVisibility = async (id, visibility) => {
    try {
      await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/admin/jobprofiles/${id}`, 
        { visibility: !visibility },
        { withCredentials: true }
      );
      fetchJobProfiles();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const handleSelectProfile = (id) => {
    if (selectedProfiles.includes(id)) {
      setSelectedProfiles(selectedProfiles.filter((profileId) => profileId !== id));
    } else {
      setSelectedProfiles([...selectedProfiles, id]);
    }
  };

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      setEditProfile({
        ...editProfile,
        [parentField]: {
          ...editProfile[parentField],
          [childField]: value
        }
      });
    } else {
      setEditProfile({ ...editProfile, [field]: value });
    }
  };

  const handleEligibilityChange = (field, value) => {
    setEditProfile({
      ...editProfile,
      eligibility_criteria: {
        ...editProfile.eligibility_criteria,
        [field]: value
      }
    });
  };

  const departments = [
    "COMPUTER SCIENCE AND ENGINEERING", 
    "INFORMATION TECHNOLOGY", 
    "ELECTRICAL ENGINEERING", 
    "MECHANICAL ENGINEERING",
    "CIVIL ENGINEERING",
    "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "BIO TECHNOLOGY",
    "CHEMICAL ENGINEERING",
    "INDUSTRIAL AND PRODUCTION ENGINEERING",
    "INSTRUMENTATION AND CONTROL ENGINEERING",
    "TEXTILE TECHNOLOGY",
    "DATA SCIENCE AND ENGINEERING",
    "ELECTRONICS AND VLSI ENGINEERING",
    "MATHEMATICS AND COMPUTING"
  ];

  const courses = ["B.Tech", "M.Tech", "MBA", "M.Sc.", "PHD", "B.Sc.-B.Ed."];

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Manage Job Profiles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Add Job Profile
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Job Type</InputLabel>
          <Select name="job_type" value={filters.job_type} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="2m Intern">2m Intern</MenuItem>
            <MenuItem value="6m Intern">6m Intern</MenuItem>
            <MenuItem value="11m Intern">11m Intern</MenuItem>
            <MenuItem value="Intern+PPO">Intern+PPO</MenuItem>
            <MenuItem value="Intern+FTE">Intern+FTE</MenuItem>
            <MenuItem value="FTE">FTE</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Job Category</InputLabel>
          <Select name="job_category" value={filters.job_category} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Tech">Tech</MenuItem>
            <MenuItem value="Non-Tech">Non-Tech</MenuItem>
            <MenuItem value="Tech+Non-Tech">Tech+Non-Tech</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Job Class</InputLabel>
          <Select name="job_class" value={filters.job_class} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Below Dream">Below Dream</MenuItem>
            <MenuItem value="Dream">Dream</MenuItem>
            <MenuItem value="Super Dream">Super Dream</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {selectedProfiles.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={handleBulkDelete}
          sx={{ mb: 2 }}
        >
          Delete Selected ({selectedProfiles.length})
        </Button>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedProfiles.length > 0 && selectedProfiles.length < filteredProfiles.length}
                  checked={filteredProfiles.length > 0 && selectedProfiles.length === filteredProfiles.length}
                  onChange={() => {
                    if (selectedProfiles.length === filteredProfiles.length) {
                      setSelectedProfiles([]);
                    } else {
                      setSelectedProfiles(filteredProfiles.map(profile => profile._id));
                    }
                  }}
                />
              </TableCell>
              <TableCell>Job Role</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Job Type</TableCell>
              <TableCell>Job Category</TableCell>
              <TableCell>Job Class</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProfiles.map((profile) => (
              <TableRow key={profile._id} hover>
                <TableCell padding="checkbox">
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
                <TableCell>{profile.Approved_Status ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(profile)} color="primary" title="Edit">
                    <Edit />
                  </Button>
                  <Button onClick={() => handleDelete(profile._id)} color="error" title="Delete">
                    <Delete />
                  </Button>
                  <Button 
                    onClick={() => handleToggleVisibility(profile._id, profile.visibility)} 
                    color={profile.visibility ? "success" : "warning"}
                    title={profile.visibility ? "Visible" : "Hidden"}
                  >
                    {profile.visibility ? <Visibility /> : <VisibilityOff />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isAddMode ? "Add New Job Profile" : "Edit Job Profile"}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              label="Job Role"
              value={editProfile?.job_role || ""}
              onChange={(e) => handleChange('job_role', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Company Name"
              value={editProfile?.company_name || ""}
              onChange={(e) => handleChange('company_name', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Company Logo URL"
              value={editProfile?.company_logo || ""}
              onChange={(e) => handleChange('company_logo', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Job Location"
              value={editProfile?.joblocation || ""}
              onChange={(e) => handleChange('joblocation', e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Job Type</InputLabel>
              <Select
                value={editProfile?.job_type || ""}
                onChange={(e) => handleChange('job_type', e.target.value)}
              >
                <MenuItem value="2m Intern">2m Intern</MenuItem>
                <MenuItem value="6m Intern">6m Intern</MenuItem>
                <MenuItem value="11m Intern">11m Intern</MenuItem>
                <MenuItem value="Intern+PPO">Intern+PPO</MenuItem>
                <MenuItem value="Intern+FTE">Intern+FTE</MenuItem>
                <MenuItem value="FTE">FTE</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Job Category</InputLabel>
              <Select
                value={editProfile?.job_category || ""}
                onChange={(e) => handleChange('job_category', e.target.value)}
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
                onChange={(e) => handleChange('job_class', e.target.value)}
              >
                <MenuItem value="Below Dream">Below Dream</MenuItem>
                <MenuItem value="Dream">Dream</MenuItem>
                <MenuItem value="Super Dream">Super Dream</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Salary Details</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="CTC"
                value={editProfile?.job_salary?.ctc || ""}
                onChange={(e) => handleChange('job_salary.ctc', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Base Salary"
                value={editProfile?.job_salary?.base_salary || ""}
                onChange={(e) => handleChange('job_salary.base_salary', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Eligibility Criteria</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Course Allowed</InputLabel>
                <Select
                  value={editProfile?.eligibility_criteria?.course_allowed || ""}
                  onChange={(e) => handleEligibilityChange('course_allowed', e.target.value)}
                >
                  {courses.map(course => (
                    <MenuItem key={course} value={course}>{course}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Gender Allowed</InputLabel>
                <Select
                  value={editProfile?.eligibility_criteria?.gender_allowed || "Any"}
                  onChange={(e) => handleEligibilityChange('gender_allowed', e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                  <MenuItem value="Any">Any</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Eligible Batch"
                value={editProfile?.eligibility_criteria?.eligible_batch || ""}
                onChange={(e) => handleEligibilityChange('eligible_batch', e.target.value)}
                placeholder="e.g., 2023, 2024"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Minimum CGPA"
                type="number"
                inputProps={{ min: 0, max: 10, step: 0.1 }}
                value={editProfile?.eligibility_criteria?.minimum_cgpa || 0}
                onChange={(e) => handleEligibilityChange('minimum_cgpa', parseFloat(e.target.value))}
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editProfile?.eligibility_criteria?.active_backlogs || false}
                    onChange={(e) => handleEligibilityChange('active_backlogs', e.target.checked)}
                  />
                }
                label="Allow Active Backlogs"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editProfile?.eligibility_criteria?.history_backlogs || false}
                    onChange={(e) => handleEligibilityChange('history_backlogs', e.target.checked)}
                  />
                }
                label="Allow History Backlogs"
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Job Description</Typography>
            <TextField
              label="Job Description"
              value={editProfile?.jobdescription || ""}
              onChange={(e) => handleChange('jobdescription', e.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={4}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Administrative Settings</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={editProfile?.visibility || false}
                    onChange={(e) => handleChange('visibility', e.target.checked)}
                  />
                }
                label="Visible to Students"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editProfile?.Approved_Status || false}
                    onChange={(e) => handleChange('Approved_Status', e.target.checked)}
                  />
                }
                label="Approved"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editProfile?.completed || false}
                    onChange={(e) => handleChange('completed', e.target.checked)}
                  />
                }
                label="Process Completed"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editProfile?.recruiter_editing_allowed || false}
                    onChange={(e) => handleChange('recruiter_editing_allowed', e.target.checked)}
                  />
                }
                label="Allow Recruiter Editing"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            {isAddMode ? "Add Job Profile" : "Update Job Profile"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminJobProfileManager;