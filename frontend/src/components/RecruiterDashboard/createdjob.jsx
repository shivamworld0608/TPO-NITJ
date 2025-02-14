import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import Swal from 'sweetalert2';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Briefcase,
  Plus,
  Trash2,
  Eye,
  GraduationCap
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import CreateJob from './createjob';
import ViewJobDetails from './ViewJob';
import axios from 'axios';

const CreatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [viewingJobDetails, setViewingJobDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/recruiter/getjobs`,
          { credentials: 'include' }
        );
        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (error) {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/deletejob/${jobId}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );
      
      if (response.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting job:', error);
      return false;
    }
  };

  const handleDeleteJob = async (jobId) => {
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
        await axios.delete(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/deletejob/${jobId}`,
          { withCredentials: true }
        );
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        Swal.fire('Deleted!', 'The job has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting job:', error.message);
        Swal.fire('Failed!', 'Failed to delete the job. Please try again.', 'error');
      }
    }
  };

  const showNotification = (message, type) => {
    return (
      <Alert variant={type === 'error' ? 'destructive' : 'default'}>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  };

  const filteredAndSortedJobs = jobs
    .filter(job => 
      job.job_role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.deadline) - new Date(b.deadline);
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-custom-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (viewingJobDetails) {
    return (
      <div className="container mx-auto p-4">
        <ViewJobDetails
          job={viewingJobDetails}
          onClose={() => setViewingJobDetails(null)}
        />
      </div>
    );
  }

  if (isCreatingJob) {
    return (
      <div className="container mx-auto p-4">
        <CreateJob
          onJobCreated={(newJob) => {
            setJobs((prevJobs) => [...prevJobs, newJob]);
            setIsCreatingJob(false);
            showNotification('Job created successfully', 'success');
          }}
          onCancel={() => setIsCreatingJob(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900"><span>Job </span><span className='text-custom-blue'>Listings</span></h1>
            <Button
              onClick={() => setIsCreatingJob(true)}
              className="bg-custom-blue hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>

        {/* Job Cards */}
        {filteredAndSortedJobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">No jobs found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or create a new job listing</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedJobs.map((job) => (
              <Card key={job._id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-custom-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{job.job_role}</h3>
                        <p className="text-gray-600">{job.company_name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.joblocation || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <IndianRupee className="w-4 h-4" />
                      <span>{job.job_salary.ctc || "Competitive"} LPA</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>{job.job_class}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-100 text-custom-blue rounded-full text-sm">
                      {job.job_type || "Full-time"}
                    </span>
                    {job.isRemote && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Remote
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2 hover:bg-custom-blue hover:text-white border-custom-blue"
                      onClick={() => setViewingJobDetails(job)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white border-red-500"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedJobs;