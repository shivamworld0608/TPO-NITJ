import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from "./Notification";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControlLabel,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Notes as NotesIcon, Edit as EditIcon, PushPin, PushPinOutlined } from '@mui/icons-material';

const ConversationLog = () => {
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newConversation, setNewConversation] = useState({
    companyName: '',
    contactNo: '',
    email: '',
    contacted: false,
    notes: '',
    color: '#ffffff',
    pinned: false,
  });
  const [openNotesDialog, setOpenNotesDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState('');
  const [editingConversationId, setEditingConversationId] = useState(null);
  const [editingConversation, setEditingConversation] = useState({
    companyName: '',
    contactNo: '',
    email: '',
    contacted: false,
    notes: '',
    color: '#ffffff',
    pinned: false,
  });
  const [loading, setLoading] = useState(false);

  // Fixed colors for the color picker (matching your image: white, pink, green, blue)
  const colors = ['#ffffff', '#ffcccc', '#ccffcc', '#cce5ff'];

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const filtered = conversations.filter(conversation =>
      conversation.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Sort conversations: pinned ones come first
    const sorted = filtered.sort((a, b) => (b.pinned - a.pinned));
    setFilteredConversations(sorted);
  }, [searchTerm, conversations]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/conversations`, { withCredentials: true });
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConversation({ ...newConversation, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewConversation({ ...newConversation, [name]: checked });
  };

  const handleAddConversation = async () => {
    try {
      console.log(newConversation);
      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/conversations`, newConversation, { withCredentials: true });
      fetchConversations();
      setNewConversation({
        companyName: '',
        contactNo: '',
        email: '',
        contacted: false,
        notes: '',
        color: '#ffffff',
        pinned: false,
      });
      setOpenAddDialog(false);
    } catch (error) {
      console.error('Error adding conversation:', error);
    }
  };

  const handleUpdateConversation = async (id, updatedConversation) => {
    try {
      await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/conversations/${id}`, updatedConversation, { withCredentials: true });
      fetchConversations();
    } catch (error) {
      console.error('Error updating conversation:', error);
    }
  };

  const handleDeleteConversation = async (id) => {
    try {
      await axios.delete(`${import.meta.env.REACT_APP_BASE_URL}/conversations/${id}`, { withCredentials: true });
      fetchConversations();
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleOpenNotesDialog = (id, notes) => {
    setEditingConversationId(id);
    setSelectedNotes(notes);
    setOpenNotesDialog(true);
  };

  const handleCloseNotesDialog = () => {
    setOpenNotesDialog(false);
    setEditingConversationId(null);
    setSelectedNotes('');
  };

  const handleSaveNotes = async () => {
    if (editingConversationId) {
      const updatedConversation = conversations.find((c) => c._id === editingConversationId);
      updatedConversation.notes = selectedNotes;
      await handleUpdateConversation(editingConversationId, updatedConversation);
    }
    handleCloseNotesDialog();
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (conversation) => {
    setEditingConversation(conversation);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingConversation({
      companyName: '',
      contactNo: '',
      email: '',
      contacted: false,
      notes: '',
      color: '#ffffff',
      pinned: false,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingConversation({ ...editingConversation, [name]: value });
  };

  const handleEditCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditingConversation({ ...editingConversation, [name]: checked });
  };

  const handleSaveEdit = async () => {
    await handleUpdateConversation(editingConversation._id, editingConversation);
    handleCloseEditDialog();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColorChange = (color, conversationId) => {
    const updatedConversation = conversations.find((c) => c._id === conversationId);
    updatedConversation.color = color;
    handleUpdateConversation(conversationId, updatedConversation);
  };

  const handlePinConversation = (conversationId) => {
    const updatedConversation = conversations.find((c) => c._id === conversationId);
    updatedConversation.pinned = !updatedConversation.pinned;
    handleUpdateConversation(conversationId, updatedConversation);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-800">Conversation <span className='text-custom-blue'>Log</span></h1>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <IconButton color="primary" onClick={handleOpenAddDialog}>
            <AddIcon fontSize="large" />
          </IconButton>
          <h2 style={{ margin: 0, fontWeight: 'bold' }}>Add New <span className='text-custom-blue'>Conversation</span></h2>
        </div>

        {/* Search Input Field */}
        <TextField
          label="Search by Company Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
            <TableHead style={{ backgroundColor: '#0369A0' }}>
      <TableRow>
        <TableCell style={{ color: 'white' }}>Company Name</TableCell>
        <TableCell style={{ color: 'white' }}>Contact No.</TableCell>
        <TableCell style={{ color: 'white' }}>Email</TableCell>
        <TableCell style={{ color: 'white' }}>Contacted</TableCell>
        <TableCell style={{ color: 'white' }}>Notes</TableCell>
        <TableCell style={{ color: 'white' }}>Color</TableCell>
        <TableCell style={{ color: 'white' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
              <TableBody>
                {filteredConversations.map((conversation) => (
                  <TableRow key={conversation._id} style={{ backgroundColor: conversation.color }}>
                    <TableCell>{conversation.companyName}</TableCell>
                    <TableCell>{conversation.contactNo}</TableCell>
                    <TableCell>{conversation.email}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={conversation.contacted}
                        onChange={(e) => {
                          const updatedConversation = { ...conversation, contacted: e.target.checked };
                          handleUpdateConversation(conversation._id, updatedConversation);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenNotesDialog(conversation._id, conversation.notes)}>
                        <NotesIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        {colors.map((color) => (
                          <div
                            key={color}
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: color,
                              border: conversation.color === color ? '2px solid black' : '1px solid #ccc',
                              cursor: 'pointer',
                            }}
                            onClick={() => handleColorChange(color, conversation._id)}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <IconButton onClick={() => handlePinConversation(conversation._id)}>
                        {conversation.pinned ? <PushPin /> : <PushPinOutlined />}
                      </IconButton>
                      <IconButton onClick={() => handleOpenEditDialog(conversation)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteConversation(conversation._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add Conversation Dialog */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', pb: 1 }}>
            Add New Conversation
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="companyName"
                  label="Company Name"
                  value={newConversation.companyName}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contactNo"
                  label="Contact No."
                  value={newConversation.contactNo}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  value={newConversation.email}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="contacted"
                      checked={newConversation.contacted}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label="Contacted"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  label="Notes"
                  multiline
                  rows={4}
                  value={newConversation.notes}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {colors.map((color) => (
                    <div
                      key={color}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: newConversation.color === color ? '2px solid black' : '1px solid #ccc',
                        cursor: 'pointer',
                      }}
                      onClick={() => setNewConversation({ ...newConversation, color })}
                    />
                  ))}
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="pinned"
                      checked={newConversation.pinned}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label="Pinned"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button onClick={handleCloseAddDialog} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleAddConversation} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notes Dialog */}
        <Dialog open={openNotesDialog} onClose={handleCloseNotesDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', pb: 1 }}>
            Edit Conversation Notes
          </DialogTitle>
          <DialogContent sx={{ px: 3, py: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={selectedNotes}
              onChange={(e) => setSelectedNotes(e.target.value)}
              variant="outlined"
              placeholder="Enter your notes here..."
              sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button onClick={handleCloseNotesDialog} color="secondary" variant="outlined" sx={{ borderRadius: '8px' }}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes} color="primary" variant="contained" sx={{ borderRadius: '8px' }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Conversation Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', pb: 1 }}>
            Edit Conversation
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="companyName"
                  label="Company Name"
                  value={editingConversation.companyName}
                  onChange={handleEditInputChange}
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contactNo"
                  label="Contact No."
                  value={editingConversation.contactNo}
                  onChange={handleEditInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  value={editingConversation.email}
                  onChange={handleEditInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="contacted"
                      checked={editingConversation.contacted}
                      onChange={handleEditCheckboxChange}
                      color="primary"
                    />
                  }
                  label="Contacted"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  label="Notes"
                  multiline
                  rows={4}
                  value={editingConversation.notes}
                  onChange={handleEditInputChange}
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: '10px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {colors.map((color) => (
                    <div
                      key={color}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: editingConversation.color === color ? '2px solid black' : '1px solid #ccc',
                        cursor: 'pointer',
                      }}
                      onClick={() => setEditingConversation({ ...editingConversation, color })}
                    />
                  ))}
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="pinned"
                      checked={editingConversation.pinned}
                      onChange={handleEditCheckboxChange}
                      color="primary"
                    />
                  }
                  label="Pinned"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button onClick={handleCloseEditDialog} color="secondary" variant="outlined" sx={{ borderRadius: '8px' }}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} color="primary" variant="contained" sx={{ borderRadius: '8px' }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Notification />
      </div>
    </>
  );
};

export default ConversationLog;