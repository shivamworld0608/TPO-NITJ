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
    setExpandedLogs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Formats a value. If it's an array, join the formatted items.
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => formatSingleValue(item)).join(", ");
    }
    return formatSingleValue(value);
  };

  const formatSingleValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "object") {
      if (value instanceof Date) return format(value, "MM/dd/yyyy, h:mm:ss a");
      return Object.entries(value)
        .map(([k, v]) => `${k}: ${formatSingleValue(v)}`)
        .join(", ");
    }
    return value.toString();
  };

  // Recursively format changes, skipping entries where the change is not meaningful.
  const formatChanges = (changes) => {
    return Object.entries(changes)
      .map(([key, value]) => {
        // Check if this is a nested diff (i.e. it doesn't have oldValue/added/removed directly)
        if (
          typeof value === "object" &&
          value !== null &&
          !("oldValue" in value) &&
          !("added" in value) &&
          !("removed" in value)
        ) {
          const nested = formatChanges(value);
          if (nested.length === 0) return null;
          const readableKey = key
            .split(".")
            .map((part) =>
              part
                .replace(/_/g, " ")
                .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
            )
            .join(" → ");
          return (
            <li key={key} className="text-sm text-gray-700 ml-4">
              <strong className="capitalize">{readableKey}:</strong>
              <ul className="ml-4">{nested}</ul>
            </li>
          );
        } else {
          // For array differences with added/removed values
          if (value.added || value.removed) {
            const added =
              value.added && value.added.length
                ? formatValue(value.added)
                : null;
            const removed =
              value.removed && value.removed.length
                ? formatValue(value.removed)
                : null;
            // If nothing meaningful is added or removed, skip it
            if (!added && !removed) return null;
            const readableKey = key
              .split(".")
              .map((part) =>
                part
                  .replace(/_/g, " ")
                  .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
              )
              .join(" → ");
            return (
              <li key={key} className="text-sm text-gray-700 ml-4">
                <strong className="capitalize">{readableKey}:</strong>
                <div className="ml-4">
                  {added && (
                    <p className="text-green-600">Added: {added}</p>
                  )}
                  {removed && (
                    <p className="text-red-600">Removed: {removed}</p>
                  )}
                </div>
              </li>
            );
          } else {
            // Simple change: compare old and new values
            const formattedOld = formatValue(value.oldValue);
            const formattedNew = formatValue(value.newValue);
            // If the change is effectively the same, skip it.
            if (formattedOld === formattedNew) return null;
            const readableKey = key
              .split(".")
              .map((part) =>
                part
                  .replace(/_/g, " ")
                  .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
              )
              .join(" → ");
            return (
              <li key={key} className="text-sm text-gray-700 ml-4">
                <strong className="capitalize">{readableKey}:</strong>
                <div className="ml-4">
                  <p className="text-gray-600">
                    Changed from{" "}
                    <span className="font-medium">{formattedOld}</span> to{" "}
                    <span className="font-medium">{formattedNew}</span>
                  </p>
                </div>
              </li>
            );
          }
        }
      })
      .filter((item) => item !== null);
  };

  return (
    <div className="mt-8">
      <div
        className="flex items-center justify-between px-8 py-4 bg-white border border-gray-200 rounded-t-2xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsVisible(!isVisible)}
      >
        <h3 className="text-2xl font-semibold text-custom-blue">Audit Logs</h3>
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
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {log.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(log.timestamp), "MM/dd/yyyy, h:mm:ss a")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {expandedLogs[index] ? (
                      <ChevronUp className="h-4 w-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                </button>

                {expandedLogs[index] && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <div className="flex items-center text-sm text-gray-800 mb-2">
                      <Info className="mr-2 h-4 w-4 text-blue-500" />
                      <span>Changes made:</span>
                    </div>
                    <ul className="space-y-3">
                      {formatChanges(log.changes)}
                    </ul>
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
