import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Briefcase,
  Tag,
  ClipboardList,
} from "lucide-react";
import ViewJAF from "./viewjaf";
import Notification from "./Notification";

const JAF = () => {
  const [JAFProfiles, setJAFProfiles] = useState({
    approved_jaf: [],
    notApproved_jaf: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJAF, setSelectedJAF] = useState(null);


  const handleBack = () => {
    setSelectedJAF(null); // Reset the selected JAF to go back to the dashboard
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  useEffect(() => {
    const fetchJAFProfiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/jaf/get`,
          { withCredentials: true }
        );
 
        setJAFProfiles(response.data);
 
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch jaf profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchJAFProfiles();
  }, []);

  const handleApprove = async (jafId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this jaf?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jaf/approvejaf/${jafId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Approved!", "The jaf has been approved.", "success");
        setJAFProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((jaf) => jaf._id !== jafId),
          approved: [
            ...prev.approved,
            prev.notApproved.find((jaf) => jaf._id === jafId),
          ],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to approve the jaf.", "error");
      }
    }
  };

  const handleReject = async (jafId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this jaf?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jaf/rejectjaf/${jafId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Rejected!", "The jaf has been rejected.", "success");
        setJAFProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((jaf) => jaf._id !== jafId),
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to reject the jaf.", "error");
      }
    }
  };

  const JAFCard = ({ jaf, showActions }) => (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5">
      {/* Header: Organization */}
      <CardHeader className="flex items-center space-x-4 pb-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {jaf.company_logo ? (
            <img src={jaf.company_logo} className="w-14 h-14 object-contain" />
          ) : (
            <span className="text-xl font-bold text-custom-blue">
              {jaf.organizationName?.[0]?.toUpperCase() || "N"}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {jaf.organizationName}
          </h3>
        </div>
      </CardHeader>

      {/* Content: Essential Details (Only Display If Available) */}
      <CardContent className="space-y-3 text-sm text-gray-700">
        {jaf.category && (
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-custom-blue" />
            <span>Category: {jaf.category}</span>
          </div>
        )}
        {jaf.sector && (
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-custom-blue" />
            <span>Sector: {jaf.sector}</span>
          </div>
        )}
        {jaf.placementType && (
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-4 h-4 text-custom-blue" />
            <span>
              Placement Type:{" "}
              {Array.isArray(jaf.placementType)
                ? jaf.placementType.join(" + ")
                : jaf.placementType}
            </span>
          </div>
        )}
        {jaf.specificLocations && jaf.specificLocations.length > 0 && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-custom-blue" />
            <span>
              Location:{" "}
              {Array.isArray(jaf.specificLocations)
                ? jaf.specificLocations.join(", ")
                : jaf.specificLocations}
            </span>
          </div>
        )}
        {jaf.summerInternshipOpportunities !== undefined && (
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-custom-blue" />
            <span>
              Summer Internship:{" "}
              {jaf.summerInternshipOpportunities
                ? "Available"
                : "Not Available"}
            </span>
          </div>
        )}
        {jaf.createdAt && (
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-custom-blue" />
            <span>Posted: {formatDateTime(jaf.createdAt)}</span>
          </div>
        )}
      </CardContent>

      {/* Footer: Actions */}
      <CardFooter className="flex flex-col space-y-2">
        {showActions && (
          <div className="flex space-x-2 w-full">
            <button
              className="flex-1 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              onClick={() => handleApprove(jaf._id)}
            >
              Approve
            </button>
            <button
              className="flex-1 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => handleReject(jaf._id)}
            >
              Reject
            </button>
          </div>
        )}
        <button
          className="w-full bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setSelectedJAF(jaf)}
        >
          View Details
        </button>
      </CardFooter>
    </Card>
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h3 className="text-xl font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {selectedJAF ? (
        <ViewJAF jaf={selectedJAF} onClose={handleBack}/>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center mb-8 text-custom-blue">
            JAF Dashboard
          </h1>

          <Tabs defaultValue="approved" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 space-x-4">
              <TabsTrigger
                value="approved"
                className="data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2"
              >
                Approved JAFs ({JAFProfiles.approved.length})
              </TabsTrigger>
              <TabsTrigger
                value="not-approved"
                className="border data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2"
              >
                Pending Approval ({JAFProfiles.notApproved.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="approved">
              {JAFProfiles.approved.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {JAFProfiles.approved.map((jaf) => (
                    <JAFCard key={jaf._id} jaf={jaf} showActions={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No approved jaf profiles yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="not-approved">
              {JAFProfiles.notApproved.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {JAFProfiles.notApproved.map((jaf) => (
                    <JAFCard key={jaf._id} jaf={jaf} showActions={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No jafs pending approval</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
      <Notification/>
    </div>
  );
};

export default JAF;
