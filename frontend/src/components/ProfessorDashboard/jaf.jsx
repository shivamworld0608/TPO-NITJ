import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ViewJobDetails from "./ViewJob";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Building2, MapPin, DollarSign, Calendar, Briefcase } from "lucide-react";


const JAF = () => {
  const [jobProfiles, setJobProfiles] = useState({ approved: [], notApproved: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  

  useEffect(() => {
    const fetchJobProfiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/professor/getjobs`,
          { withCredentials: true }
        );
        setJobProfiles(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch job profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobProfiles();
  }, []);

  const handleApprove = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/approvejob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Approved!", "The job has been approved.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((job) => job._id !== jobId),
          approved: [...prev.approved, prev.notApproved.find((job) => job._id === jobId)],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to approve the job.", "error");
      }
    }
  };

  const handleReject = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/rejectjob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Rejected!", "The job has been rejected.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((job) => job._id !== jobId),
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to reject the job.", "error");
      }
    }
  };

  const JobCard = ({ job, showActions }) => (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            {job.company_logo ? (
              <img
                src={job.company_logo}
                className="w-14 h-14 object-contain"
              />
            ) : (
              <span className="text-lg font-bold text-custom-blue">
                {job.company_name?.[0]?.toUpperCase() || "N"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{job.company_name}</h3>
            <p className="text-sm text-gray-500">Job ID: {job.job_id}</p>
          </div>
        </div>
      </CardHeader>
  
      <CardContent className="pb-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.job_role}</p>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.job_salary?.ctc}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.joblocation}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">
              Posted: {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
  
      <CardFooter className="flex flex-col space-y-2">
        {showActions && (
          <div className="flex space-x-2 w-full">
            <button
              className="flex-1 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              onClick={() => handleApprove(job._id)}
            >
              Approve
            </button>
            <button
              className="flex-1 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => handleReject(job._id)}
            >
              Reject
            </button>
          </div>
        )}
        <button
          className="w-full bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setSelectedJob(job)}
        >
          View Details
        </button>
      </CardFooter>
    </Card>
  );
  

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-center">
        <h3 className="text-xl font-semibold mb-2">Error</h3>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {selectedJob ? (
        <ViewJobDetails onClose={() => setSelectedJob(null)} job={selectedJob} />
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center mb-8 text-custom-blue">
            Job Profiles Dashboard
          </h1>
          
          <Tabs defaultValue="approved" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 space-x-4">
              <TabsTrigger value="approved" className="data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2">
                Approved Jobs ({jobProfiles.approved.length})
              </TabsTrigger>
              <TabsTrigger value="not-approved" className="border data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2">
                Pending Approval ({jobProfiles.notApproved.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="approved">
              {jobProfiles.approved.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobProfiles.approved.map((job) => (
                    <JobCard key={job._id} job={job} showActions={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No approved job profiles yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="not-approved">
              {jobProfiles.notApproved.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobProfiles.notApproved.map((job) => (
                    <JobCard key={job._id} job={job} showActions={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No jobs pending approval</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default JAF;