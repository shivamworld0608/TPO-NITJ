// import React, { useState, useEffect } from 'react';
// import { AlertTriangle } from 'lucide-react';

// const LowConnectivityWarning = () => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [connectionType, setConnectionType] = useState(null);

//   useEffect(() => {
//     // Check network connection type and status
//     const checkConnectionType = () => {
//       const connection = navigator.connection || 
//                          navigator.mozConnection || 
//                          navigator.webkitConnection;
      
//       if (connection) {
//         setConnectionType({
//           type: connection.type,
//           downlinkMax: connection.downlinkMax,
//           effectiveType: connection.effectiveType
//         });
//       }
//     };

//     // Update online/offline status
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     // Add event listeners
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
    
//     // Check connection type initially
//     checkConnectionType();

//     // Add connection type change listener if available
//     const connection = navigator.connection || 
//                        navigator.mozConnection || 
//                        navigator.webkitConnection;
//     if (connection) {
//       connection.addEventListener('change', checkConnectionType);
//     }

//     // Cleanup listeners
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//       if (connection) {
//         connection.removeEventListener('change', checkConnectionType);
//       }
//     };
//   }, []);

//   // Determine warning message based on connection type
//   const getConnectionWarning = () => {
//     if (!isOnline) {
//       return {
//         message: "No Internet Connection",
//         severity: "critical"
//       };
//     }

//     if (connectionType) {
//       switch (connectionType.effectiveType) {
//         case 'slow-2g':
//           return {
//             message: "Very Slow Connection",
//             severity: "high"
//           };
//         case '2g':
//           return {
//             message: "Slow Connection",
//             severity: "medium"
//           };
//         case '3g':
//           return {
//             message: "Moderate Connection",
//             severity: "low"
//           };
//         default:
//           return null;
//       }
//     }

//     return null;
//   };

//   const warning = getConnectionWarning();

//   if (!warning) return null;

//   // Color mapping for different severity levels
//   const severityColors = {
//     critical: "bg-red-600",
//     high: "bg-orange-600",
//     medium: "bg-yellow-500",
//     low: "bg-blue-500"
//   };

//   return (
//     <div className={`
//       fixed 
//       top-4
//       left-1/2 
//       transform 
//       -translate-x-1/2 
//       flex 
//       items-center 
//       p-2 
//       rounded-lg 
//       shadow-lg 
//       text-white
//       z-50 
//       animate-bounce 
//       ${severityColors[warning.severity]}
//     `}>
//       <AlertTriangle className="mr-2" />
//       <span className="font-semibold">{warning.message}</span>
//     </div>
//   );
// };

// export default LowConnectivityWarning;

import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const LowConnectivityWarning = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState(null);
  const [dismissedWarning, setDismissedWarning] = useState(null);

  useEffect(() => {
    const checkConnectionType = () => {
      const connection = navigator.connection || 
                         navigator.mozConnection || 
                         navigator.webkitConnection;
      
      if (connection) {
        setConnectionType({
          type: connection.type,
          downlinkMax: connection.downlinkMax,
          effectiveType: connection.effectiveType
        });
      }
    };

    const handleOnline = () => {
      setIsOnline(true);
      setDismissedWarning(null); // Reset dismissed state on connection change
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setDismissedWarning(null); // Reset dismissed state on connection change
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    checkConnectionType();

    const connection = navigator.connection || 
                       navigator.mozConnection || 
                       navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', () => {
        checkConnectionType();
        setDismissedWarning(null); // Reset dismissed state on connection change
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', checkConnectionType);
      }
    };
  }, []);

  const getConnectionWarning = () => {
    if (!isOnline) {
      return {
        message: "No Internet Connection",
        severity: "critical"
      };
    }

    if (connectionType) {
      switch (connectionType.effectiveType) {
        case 'slow-2g':
          return {
            message: "Very Slow Connection",
            severity: "high"
          };
        case '2g':
          return {
            message: "Slow Connection",
            severity: "medium"
          };
        case '3g':
          return {
            message: "Moderate Connection",
            severity: "low"
          };
        default:
          return null;
      }
    }

    return null;
  };

  const warning = getConnectionWarning();

  // Don't show if there's no warning or if the current warning type has been dismissed
  if (!warning || (dismissedWarning === warning.severity)) return null;

  const severityColors = {
    critical: "bg-red-600",
    high: "bg-orange-600",
    medium: "bg-yellow-500",
    low: "bg-blue-500"
  };

  return (
    <div className={`
      fixed 
      top-4
      right-4
      md:left-1/2 
      md:-translate-x-1/2
      md:right-auto
      flex 
      items-center 
      p-2 
      rounded-lg 
      shadow-lg 
      text-white
      z-40 
      animate-bounce 
      ${severityColors[warning.severity]}
    `}>
      <AlertTriangle className="mr-2" />
      <span className="font-semibold">{warning.message}</span>
      <button 
        onClick={() => setDismissedWarning(warning.severity)}
        className="ml-2 p-0.5 hover:bg-white/20 rounded-full"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default LowConnectivityWarning;