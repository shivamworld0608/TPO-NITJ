import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Link as LinkIcon, 
  CheckCircle, 
  Info,
  EyeOff,
  XCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function OthersCard({
  company_name,
  others_date,
  others_round_name,
  others_time,
  others_info,
  others_link,
  was_shortlisted,
  isLinkVisible,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  // Format date with robust handling
  const formatDate = (date) => {
    if (!date) return 'Not Specified';
    
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Determine link render
  const renderOthersLink = () => {
    if (!isLinkVisible) {
      return (
        <button
          onClick={() => toast.error("Link visibility is off", {
            icon: <EyeOff size={16} />,
            duration: 3000,
          })}
          className="flex items-center rounded-lg px-1 text-sm text-custom-blue hover:bg-custom-blue hover:text-white transition-colors"
        >
          <EyeOff size={16} className="mr-1" />
          Soon
        </button>
      );
    }

    if (others_link === "No link available") {
      return (
        <span className="flex items-center text-sm text-gray-500">
          <XCircle size={16} className="mr-1" />
          Not Available
        </span>
      );
    }

    if (others_link) {
      const validLink = 
        typeof others_link === "string" && others_link.startsWith("http")
          ? others_link
          : `https://${others_link || ""}`;
      
      return (
        <a
          href={validLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-1 text-sm text-green-500 hover:bg-green-500 hover:text-white transition-colors"
        >
          Join
        </a>
      );
    }

    return (
      <button
        onClick={() => toast("Others link will be available soon", {
          duration: 3000,
        })}
        className="rounded-lg px-1 text-sm text-custom-blue hover:bg-custom-blue hover:text-white transition-colors"
      >
        Soon
      </button>
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
      <div className="p-4">
        {/* Company Name */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900 truncate">{company_name}</h2>
        </div>

        {/* Others Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700 text-sm">
            <Info className="mr-2 text-custom-blue" size={16} />
            <span className="font-medium mr-1">Round:</span>
            <span className="text-gray-600">{others_round_name || "Not Specified"}</span>
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <Calendar className="mr-2 text-custom-blue" size={16} />
            <span className="font-medium mr-1">Date:</span>
            <span className="text-gray-600">{formatDate(others_date)}</span>
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <Clock className="mr-2 text-custom-blue" size={16} />
            <span className="font-medium mr-1">Time:</span>
            <span className="text-gray-600">{others_time || "Not Provided"}</span>
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <LinkIcon className="mr-2 text-custom-blue" size={16} />
            <span className="font-medium mr-1">Link:</span>
            {renderOthersLink()}
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <CheckCircle className="mr-2 text-custom-blue" size={16} />
            <span className="font-medium mr-1">Status:</span>
            <span className={`inline-block px-2 py-1 rounded text-xs ${
              was_shortlisted === true 
                ? 'text-green-600 bg-green-50'
                : was_shortlisted === false
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-600 bg-gray-50'
            }`}>
              {was_shortlisted === true
                ? "Shortlisted"
                : was_shortlisted === false
                  ? "Not Selected"
                  : "Pending"
              }
            </span>
          </div>
        </div>

        {/* Show Details Button */}
        <button
          onClick={toggleModal}
          className="w-full bg-custom-blue text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Others Info
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          aria-hidden={!showModal}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <Info size={24} />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Others Guidelines & Info
            </h3>
            <p className="text-gray-600">
              {others_info || "No additional information provided."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}