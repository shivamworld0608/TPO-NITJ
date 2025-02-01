import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Notes as NotesIcon, Edit as EditIcon } from '@mui/icons-material';
import {   FormControlLabel, Grid } from '@mui/material';

const ConversationLog = () => {
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState({
    companyName: '',
    contactNo: '',
    email: '',
    contacted: false,
    notes: '',
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
  });

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/conversations`,{ withCredentials: true });
    setConversations(response.data);
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
    await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/conversations`, newConversation,{ withCredentials: true });
    fetchConversations();
    setNewConversation({
      companyName: '',
      contactNo: '',
      email: '',
      contacted: false,
      notes: '',
    });
    setOpenAddDialog(false);
  };

  const handleUpdateConversation = async (id, updatedConversation) => {
    await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/conversations/${id}`, updatedConversation,{ withCredentials: true });
    fetchConversations();
  };

  const handleDeleteConversation = async (id) => {
    await axios.delete(`${import.meta.env.REACT_APP_BASE_URL}/conversations/${id}`,{ withCredentials: true });
    fetchConversations();
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

  return (
    <>
    <div className="flex justify-center items-center">
    <h1 className="text-3xl  font-bold text-gray-800">Conversation <span className='text-custom-blue'>Log</span></h1>
  </div>
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton color="primary" onClick={handleOpenAddDialog}>
          <AddIcon fontSize="large" />
        </IconButton>
        <h2 style={{ margin: 0, fontWeight: 'bold' }}>Add New <span className='text-custom-blue'>Conversation</span></h2>
      
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contacted</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversations.map((conversation) => (
              <TableRow key={conversation._id}>
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
                <TableCell style={{ display: 'flex', gap: '10px' }}>
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
  <DialogTitle sx={{ 
      fontSize: '1.5rem', 
      fontWeight: 'bold', 
      textAlign: 'center', 
      pb: 1 
    }}>
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
      sx={{ 
        mt: 1, 
        '& .MuiOutlinedInput-root': { borderRadius: '10px' } 
      }}
    />
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
    <Button 
      onClick={handleCloseNotesDialog} 
      color="secondary" 
      variant="outlined"
      sx={{ borderRadius: '8px' }}
    >
      Cancel
    </Button>
    <Button 
      onClick={handleSaveNotes} 
      color="primary" 
      variant="contained"
      sx={{ borderRadius: '8px' }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>


      {/* Edit Conversation Dialog */}
    
<Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ 
      fontSize: '1.5rem', 
      fontWeight: 'bold', 
      textAlign: 'center', 
      pb: 1 
    }}>
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
    </Grid>
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
    <Button 
      onClick={handleCloseEditDialog} 
      color="secondary" 
      variant="outlined"
      sx={{ borderRadius: '8px' }}
    >
      Cancel
    </Button>
    <Button 
      onClick={handleSaveEdit} 
      color="primary" 
      variant="contained"
      sx={{ borderRadius: '8px' }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </div>
    </>
  );
};

export default ConversationLog;