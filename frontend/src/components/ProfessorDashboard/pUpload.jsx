import React, { useState, useEffect } from 'react';
import { Download, Loader2, Trash2, Upload, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { FileText } from 'lucide-react';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';


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
  const [downloadingStates, setDownloadingStates] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);


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
    baseURL:  `${import.meta.env.REACT_APP_BASE_URL}`, 
    withCredentials: true
  });
  const fetchPDFs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/pdfs');
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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
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

  const handleFileUpload = async (title, file) => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append('pdf', file);
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


  

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsUploadModalOpen(true); // Open the modal instead
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="rounded-lg p-6 mb-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">PDF <span className="text-custom-blue">Documents</span></h1>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload">
                <Button 
                  variant="outline" 
                  className="inline-flex items-center gap-2"
                  disabled={uploadingFile}
                  asChild
                >
                  <span>
                    {uploadingFile ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload PDF
                      </>
                    )}
                  </span>
                </Button>
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
  file={selectedFile} // Pass the selected file
  onUpload={(title) => handleFileUpload(title, selectedFile)} // Ensure file is included
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
              <Card key={pdf._id} className="group hover:shadow-md transition-shadow duration-200 bg-white">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-custom-blue transition-colors">
                        {pdf.title}
                      </h2>
                      <p className="text-xs mt-1 text-gray-500">
                        Uploaded by: {pdf.uploadedBy?.name || 'Unknown'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(pdf._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="aspect-w-3 aspect-h-4 mb-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center group-hover:border-custom-blue transition-colors">
                    <div className="text-center p-4">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 group-hover:text-custom-blue transition-colors" />
                      <p className="text-sm font-medium text-gray-600 mt-1">PDF Document</p>
                      <p className="text-sm text-gray-400">{formatFileSize(pdf.size)}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded-full">
                      {formatDate(pdf.uploadDate)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-1 bg-custom-blue text-white rounded">
                  <Button 
                    variant="default"
                    className="w-full"
                    onClick={() => handleDownload(pdf._id, pdf.filename)}
                    disabled={downloadingStates[pdf._id]}
                  >
                    {downloadingStates[pdf._id] ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {pdfs.length === 0 && !loading && (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No PDFs Found</h3>
              <p className="text-gray-500 mb-4">Upload your first PDF using the button above</p>
              <label htmlFor="pdf-upload">
                <Button 
                  variant="outline" 
                  className="inline-flex items-center gap-2"
                  disabled={uploadingFile}
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4" />
                    Upload PDF
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFDownloadCards;