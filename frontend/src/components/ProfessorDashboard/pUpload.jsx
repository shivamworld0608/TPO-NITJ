import React, { useState, useEffect } from 'react';
import { Download, Loader2, Trash2, Upload, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Swal from 'sweetalert2';


const PDFUploadModal = ({ 
  isOpen, 
  onClose, 
  file, 
  onUpload 
}) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (newTitle.length > 50) {
      setTitleError('Title must be 50 characters or less');
    } else {
      setTitleError('');
    }
  };

  const handleUpload = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }

    if (title.length > 50) {
      return;
    }

    onUpload(title);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload <span className='text-custom-blue'>PDF</span> </DialogTitle>
          <DialogDescription>
            Enter title for your choosen PDF document
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter PDF title"
              value={title}
              onChange={handleTitleChange}
              className="w-full md:w-1/2 lg:w-1/2"
              maxLength={35}
            />
            {titleError && (
              <div className="col-span-4 text-red-500 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {titleError}
              </div>
            )}
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleUpload}
            disabled={!!titleError || !title.trim()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PDFDownloadCards = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [downloadingStates, setDownloadingStates] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const api = axios.create({
    baseURL: `${import.meta.env.REACT_APP_BASE_URL}`, 
    withCredentials: true
  });

  const fetchPDFs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/api/pdfs/`,
        { withCredentials: true }
      );
      setPdfs(response.data);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch PDFs';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // File validation
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }
    if (file.type !== 'application/pdf') {
      toast.error("Only PDF files are allowed");
      return;
    }

    // Store file and open modal
    setSelectedFile(file);
    setIsUploadModalOpen(true);
  };

  const handleFileUpload = async (title) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('pdf', selectedFile);
    formData.append('title', title);

    setUploadingFile(true);
    setUploadProgress(0);

    try {
      await api.post('/api/pdfs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      
      await fetchPDFs();
      toast.success("PDF uploaded successfully");
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Upload failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploadingFile(false);
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };

  const handleDelete = async (id) => {
       const result = await Swal.fire({
         title: 'Are you sure?',
         text: 'You won’t be able to undo this action!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#3085d6',
         confirmButtonText: 'Yes, delete it!',
       });
   if (result.isConfirmed) {
    try {
      await api.delete(`/api/pdfs/${id}`);
      await fetchPDFs();
      Swal.fire('Deleted!', 'The pdf has been deleted.', 'success');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Delete failed';
      Swal.fire('Failed!', 'Failed to delete this pdf. Please try again.', 'error');
    }
  }
  };

  const handleDownload = async (id, filename) => {
    setDownloadingStates(prev => ({ ...prev, [id]: true }));

    try {
      const response = await api.get(`/api/pdfs/download/${id}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      await fetchPDFs();
      toast.success("PDF downloaded successfully");
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Download failed';
      toast.error(errorMessage);
    } finally {
      setDownloadingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">PDF Documents</h1>
        <div className="relative">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="pdf-upload"
            disabled={uploadingFile}
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadingFile ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading: {uploadProgress}%
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload PDF
              </>
            )}
          </label>
          {uploadingFile && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <PDFUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        file={selectedFile}
        onUpload={handleFileUpload}
      />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfs.map((pdf) => (
          <Card key={pdf._id} className="overflow-hidden">
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{pdf.title}</h2>
                  <p className="text-sm text-gray-500">
                    Uploaded by: {pdf.uploadedBy?.name || 'Unknown'}
                  </p>
                </div>
                {pdf.uploadedBy?._id === pdf.uploadedBy?._id && (
                  <button
                    onClick={() => handleDelete(pdf._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete PDF"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(pdf.uploadDate)}
              </p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="aspect-w-3 aspect-h-4 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-gray-500 mb-2">PDF Document</p>
                  <p className="text-sm text-gray-400">{formatFileSize(pdf.size)}</p>
                </div>
              </div>
              {pdf.description && (
                <p className="text-sm text-gray-600 mb-2">{pdf.description}</p>
              )}
              <div className="text-sm text-gray-500">
                Downloads: {pdf.downloads}
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50">
              <button
                onClick={() => handleDownload(pdf._id, pdf.filename)}
                disabled={downloadingStates[pdf._id]}
                className="w-full flex items-center justify-center gap-2 bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloadingStates[pdf._id] ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Download PDF
                  </>
                )}
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {pdfs.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No PDFs uploaded yet. Upload your first PDF using the button above.
        </div>
      )}
    </div>
  );
};

export default PDFDownloadCards;