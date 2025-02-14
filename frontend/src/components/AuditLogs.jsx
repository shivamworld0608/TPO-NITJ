import React, { useState } from "react";
import { format } from "date-fns";
import { User, Clock, Edit, Info, ChevronDown, ChevronUp } from "lucide-react";

const AuditLogs = ({ logs }) => {
  const [expandedLogs, setExpandedLogs] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  if (!logs || logs.length === 0) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-gray-600">No audit logs available.</p>
      </div>
    );
  }

  const toggleLog = (index) => {
    setExpandedLogs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Function to format changes
  const formatChanges = (changes) => {
    return Object.entries(changes).map(([key, value]) => {
      // Helper function to format object values
      const formatValue = (val) => {
        if (typeof val === "object" && val !== null) {
          return JSON.stringify(val, null, 2);
        }
        return val;
      };

      if (value.added || value.removed) {
        return (
          <li key={key} className="text-sm text-gray-700">
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
            <div className="ml-4">
              {value.added && (
                <p className="text-green-600">
                  Added: {Array.isArray(value.added) ? value.added.join(", ") : formatValue(value.added)}
                </p>
              )}
              {value.removed && (
                <p className="text-red-600">
                  Removed: {Array.isArray(value.removed) ? value.removed.join(", ") : formatValue(value.removed)}
                </p>
              )}
            </div>
          </li>
        );
      } else {
        return (
          <li key={key} className="text-sm text-gray-700">
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
            <div className="ml-4">
              <p className="text-gray-600">
                Changed from{" "}
                <span className="font-medium">{formatValue(value.oldValue)}</span> to{" "}
                <span className="font-medium">{formatValue(value.newValue)}</span>
              </p>
            </div>
          </li>
        );
      }
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between px-8 py-4 bg-white border border-gray-200 rounded-t-2xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
           onClick={() => setIsVisible(!isVisible)}>
        <h3 className="text-2xl font-semibold text-custom-blue">
           Audit Logs
        </h3>
        {isVisible ? (
          <ChevronUp className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-600" />
        )}
      </div>
      
      {isVisible && (
        <div className="p-8 bg-white border-x border-b border-gray-200 rounded-b-2xl shadow-lg">
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <button 
                  onClick={() => toggleLog(index)}
                  className="w-full flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <p className="text-sm text-gray-600">
                      Edited by: <span className="font-medium">{log.email}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <p className="text-sm text-gray-600">
                        On: <span className="font-medium">{format(new Date(log.timestamp), "MM/dd/yyyy, h:mm:ss a")}</span>
                      </p>
                    </div>
                    {expandedLogs[index] ? (
                      <ChevronUp className="h-4 w-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                </button>
                
                {expandedLogs[index] && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <p className="text-sm text-gray-800 flex items-center">
                      <Info className="mr-2 h-4 w-4 text-blue-500" /> Changes:
                    </p>
                    <ul className="mt-2 space-y-2">{formatChanges(log.changes)}</ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;