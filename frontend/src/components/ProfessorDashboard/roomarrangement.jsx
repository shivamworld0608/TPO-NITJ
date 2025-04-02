// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// const GuestHouseBookingForm = ({ existingData }) => {
//   const [formData, setFormData] = useState({
//     visitType: "",
//     purposeOfVisit: "",
//     visitorName: "",
//     designation: "",
//     organization: "",
//     contactNumber: "",
//     email: "",
//     numberOfRooms: 1,
//     companions: ["", "", ""],
//     arrivalDate: "",
//     arrivalTime: "",
//     departureDate: "",
//     departureTime: "",
//     notes: "",
//     bookingPerson: {
//       name: "",
//       designation: "",
//       department: "",
//       mobileNumber: "",
//       email: "",
//       address: "",
//     },
//     departmentHeadApproval: {
//       remarks: "",
//     },
//     assignedRoomNumbers: [""],
//     bookingRegistryDetails: {
//       serialNumber: "",
//       pageNumber: "",
//     }
//   });

//   useEffect(() => {
//     if (existingData) {
//       setFormData(existingData);

//       const date = new Date(existingData.arrivalDateTime);
//       setFormData((prevData) => ({
//         ...prevData,
//         arrivalDate: date.toISOString().split("T")[0], // Still in UTC
//         arrivalTime: date.toLocaleTimeString("en-GB", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }), // Local time
//       }));

//       const depdate = new Date(existingData.departureDateTime);
//       setFormData((prevData) => ({
//         ...prevData,
//         departureDate: depdate.toISOString().split("T")[0], // Still in UTC
//         departureTime: depdate.toLocaleTimeString("en-GB", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }), // Local time
//       }));
//     }
//   }, [existingData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData({
//         ...formData,
//         [parent]: {
//           ...formData[parent],
//           [child]: value,
//         },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleCompanionChange = (index, value) => {
//     const newCompanions = [...formData.companions];
//     newCompanions[index] = value;
//     setFormData({
//       ...formData,
//       companions: newCompanions,
//     });
//   };

//   const handleRoomNumberChange = (index, value) => {
//     const newRoomNumbers = [...formData.assignedRoomNumbers];
//     newRoomNumbers[index] = value;
//     setFormData({
//       ...formData,
//       assignedRoomNumbers: newRoomNumbers,
//     });
//   };

//   const addRoomNumber = () => {
//     setFormData({
//       ...formData,
//       assignedRoomNumbers: [...formData.assignedRoomNumbers, ""]
//     });
//   };

//   const removeRoomNumber = (index) => {
//     const newRoomNumbers = [...formData.assignedRoomNumbers];
//     newRoomNumbers.splice(index, 1);
//     setFormData({
//       ...formData,
//       assignedRoomNumbers: newRoomNumbers
//     });
//   };

//   const validateForm = () => {
//     // Required fields
//     const requiredFields = ['visitorName', 'contactNumber', 'email', 'arrivalDate', 'arrivalTime', 'departureDate', 'departureTime'];
    
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         return `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`;
//       }
//     }
    
//     // Check email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       return "Please enter a valid email address";
//     }
    
//     // Check if arrival date is before departure date
//     const arrivalDateTime = new Date(`${formData.arrivalDate}T${formData.arrivalTime}`);
//     const departureDateTime = new Date(`${formData.departureDate}T${formData.departureTime}`);
    
//     if (arrivalDateTime >= departureDateTime) {
//       return "Departure date and time must be after arrival date and time";
//     }
    
//     return null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const validationError = validateForm();
//     if (validationError) {
//       Swal.fire({
//         title: 'Validation Error',
//         text: validationError,
//         icon: 'error',
//         confirmButtonColor: '#3085d6',
//       });
//       return;
//     }

//     // Confirmation dialog
//     Swal.fire({
//       title: 'Confirm Booking',
//       text: `Are you sure you want to submit this booking request for ${formData.visitorName}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, submit it!',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         submitBooking();
//       }
//     });
//   };

//   const submitBooking = async () => {
//     // Show loading
//     Swal.fire({
//       title: 'Submitting...',
//       text: 'Please wait while we process your booking request',
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     // Combine date and time fields
//     const bookingData = {
//       ...formData,
//       arrivalDateTime: new Date(
//         `${formData.arrivalDate}T${formData.arrivalTime}`
//       ),
//       departureDateTime: new Date(
//         `${formData.departureDate}T${formData.departureTime}`
//       ),
//       bookingPeriod: {
//         start: new Date(`${formData.arrivalDate}T${formData.arrivalTime}`),
//         end: new Date(`${formData.departureDate}T${formData.departureTime}`),
//         totalDays: calculateDays(formData.arrivalDate, formData.departureDate),
//       },
//     };

//     try {
//       // Send bookingData to backend
//       const response = await axios.post(
//         `${import.meta.env.REACT_APP_BASE_URL}/travel-planner/room`,
//         bookingData,
//         {
//           withCredentials: true,
//         }
//       );
      
//       // Close loading and show success
//       Swal.fire({
//         title: 'Success!',
//         text: 'Your guest house booking has been submitted successfully',
//         icon: 'success',
//         confirmButtonColor: '#3085d6',
//       }).then(() => {
//         // Optionally redirect or reset form
//         window.location.href = '/pdashboard/job-profile-management';
//         // Or reset form:
//         // resetForm();
//       });
//     } catch (error) {
//       console.error(error);
      
//       // Show error message
//       Swal.fire({
//         title: 'Error',
//         text: error.response?.data?.message || 'An error occurred while submitting your booking',
//         icon: 'error',
//         confirmButtonColor: '#3085d6',
//       });
//     }
//   };

//   const calculateDays = (startDate, endDate) => {
//     if (!startDate || !endDate) return 0;
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = Math.abs(end - start);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300">
//       {/* Header with Institute Name */}
//       <div className="text-center mb-4">
//       <h2 className="text-base font-bold">
//                   DR B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY,
//                   JALANDHAR-144008, PUNJAB (INDIA)
//                 </h2>
//       </div>
      
//       {/* Reference number and date */}
//       <div className="flex justify-between mb-2 text-sm">
//         <div>
//           <span>Ref no: NITJ/: {formData._id}</span>
//         </div>
//         <div>
//           <span>Dated: {new Date().toLocaleDateString("en-GB")}</span>
//         </div>
//         <div>
//           <span>G-8</span>
//         </div>
//       </div>
      
//       {/* Form Title */}
//       <div className="text-center mb-4">
//         <h2 className="text-base font-bold underline">GUEST HOUSE ROOM BOOKING FORM</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="text-sm">
//         {/* Main Form Fields */}
//         <div className="space-y-3">
//           <div className="flex">
//             <span className="mr-2">1.</span>
//             <span className="mr-2">Kind of Visit:</span>
//             <span className="mr-2">Official</span>
//             <input
//               type="radio"
//               name="visitType"
//               value="Official"
//               checked={formData.visitType === "Official"}
//               onChange={handleChange}
//               className="mr-4"
//             />
//             <span className="mr-2">Non Official</span>
//             <input
//               type="radio"
//               name="visitType"
//               value="Non-Official"
//               checked={formData.visitType === "Non-Official"}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">2.</span>
//             <span className="mr-2">Purpose of visit:</span>
//             <input
//               type="text"
//               name="purposeOfVisit"
//               value={formData.purposeOfVisit}
//               onChange={handleChange}
//               className="flex-1 border-b border-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">3.</span>
//             <span className="mr-2">Name of Visitor:</span>
//             <input
//               type="text"
//               name="visitorName"
//               value={formData.visitorName}
//               onChange={handleChange}
//               className="flex-1 border-b border-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">4.</span>
//             <span className="mr-2">Designation:</span>
//             <input
//               type="text"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               className="flex-1 border-b border-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">5.</span>
//             <span className="mr-2">Organization/Address:</span>
//             <input
//               type="text"
//               name="organization"
//               value={formData.organization}
//               onChange={handleChange}
//               className="flex-1 border-b border-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">6.</span>
//             <span className="mr-2">Contact/Mobile No.:</span>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-32 border-b border-gray-400 focus:outline-none"
//             />
//             <span className="mx-2">@Email</span>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="flex-1 border-b border-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">7.</span>
//             <span className="mr-2">No. of Rooms required:</span>
//             <input
//               type="text"
//               name="numberOfRooms"
//               value={formData.numberOfRooms}
//               onChange={handleChange}
//               min="1"
//               className="w-16 border-b border-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">8.</span>
//             <span className="mr-2">Name of Companions:</span>
//             <span className="mr-1">(i)</span>
//             <input
//               type="text"
//               value={formData.companions[0]}
//               onChange={(e) => handleCompanionChange(0, e.target.value)}
//               className="w-32 border-b border-gray-400 focus:outline-none mr-2"
//             />
//             <span className="mr-1">(ii)</span>
//             <input
//               type="text"
//               value={formData.companions[1]}
//               onChange={(e) => handleCompanionChange(1, e.target.value)}
//               className="w-32 border-b border-gray-400 focus:outline-none mr-2"
//             />
//             <span className="mr-1">(iii)</span>
//             <input
//               type="text"
//               value={formData.companions[2]}
//               onChange={(e) => handleCompanionChange(2, e.target.value)}
//               className="w-32 border-b border-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">9.</span>
//             <span className="mr-2">Date and time of Arrival:</span>
//             <span className="mr-1">Date</span>
//             <input
//               type="date"
//               name="arrivalDate"
//               value={formData.arrivalDate}
//               onChange={handleChange}
//               className="w-32 border-b border-gray-400 focus:outline-none mr-2"
//             />
//             <span className="mr-1">Time</span>
//             <input
//               type="time"
//               name="arrivalTime"
//               value={formData.arrivalTime}
//               onChange={handleChange}
//               className="w-32 border-b border-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex">
//             <span className="mr-2">10.</span>
//             <span className="mr-2">Date and time of Departure:</span>
//             <span className="mr-1">Date</span>
//             <input
//               type="date"
//               name="departureDate"
//               value={formData.departureDate}
//               onChange={handleChange}
//               className="w-32 border-b border-gray-400 focus:outline-none mr-2"
//             />
//             <span className="mr-1">Time</span>
//             <input
//               type="time"
//               name="departureTime"
//               value={formData.departureTime}
//               onChange={handleChange}
//               className="w-32 border-b border-gray-400 focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Booking Person Details */}
//         <div className="mt-4">
//           <div className="text-center mb-2">
//             <span className="font-medium">Details of person making the Booking</span>
//           </div>

//           <div className="space-y-2">
//             <div className="flex">
//               <span className="w-24">Name</span>
//               <input
//                 type="text"
//                 name="bookingPerson.name"
//                 value={formData.bookingPerson?.name || ""}
//                 onChange={handleChange}
//                 className="flex-1 border-b border-gray-400 focus:outline-none"
//               />
//             </div>

//             <div className="flex">
//               <span className="w-24">Designation</span>
//               <input
//                 type="text"
//                 name="bookingPerson.designation"
//                 value={formData.bookingPerson?.designation || ""}
//                 onChange={handleChange}
//                 className="flex-1 border-b border-gray-400 focus:outline-none"
//               />
//             </div>

//             <div className="flex">
//               <span className="w-24">Department/Section/Centre</span>
//               <input
//                 type="text"
//                 name="bookingPerson.department"
//                 value={formData.bookingPerson?.department || ""}
//                 onChange={handleChange}
//                 className="flex-1 border-b border-gray-400 focus:outline-none ml-20"
//               />
//             </div>

//             <div className="flex">
//               <span className="w-24">Mobile No</span>
//               <input
//                 type="text"
//                 name="bookingPerson.mobileNumber"
//                 value={formData.bookingPerson?.mobileNumber || ""}
//                 onChange={handleChange}
//                 className="flex-1 border-b border-gray-400 focus:outline-none"
//               />
//             </div>

//             <div className="flex">
//               <span className="w-24">E-mail</span>
//               <input
//                 type="email"
//                 name="bookingPerson.email"
//                 value={formData.bookingPerson?.email || ""}
//                 onChange={handleChange}
//                 className="flex-1 border-b border-gray-400 focus:outline-none"
//               />
//             </div>

//             <div className="flex">
//               <span className="w-24">Address</span>
//               <input
//                 type="text"
//                 name="bookingPerson.address"
//                 value={formData.bookingPerson?.address || ""}
//                 onChange={handleChange}
//                 className="flex-1 border-b border-gray-400 focus:outline-none"
//               />
//             </div>
//           </div>

//           <div className="text-right mt-2">(Signature)</div>
//         </div>

//         {/* Remarks Section */}
//         <div className="mt-4">
//           <div className="font-medium">Remarks by Head of the Department/Section</div>
//           <textarea
//             name="departmentHeadApproval.remarks"
//             value={formData.departmentHeadApproval.remarks || ""}
//             onChange={handleChange}
//             className="w-full h-20 border border-gray-400 p-1 focus:outline-none mt-1"
//           ></textarea>

//           <div className="flex justify-between mt-2">
//             <div>Date: {new Date().toLocaleDateString("en-GB")}</div>
//             <div className="text-center">Head of the Department/Office</div>
//             <div></div> {/* Empty div for spacing */}
//           </div>
//         </div>

//         {/* Office Use Section */}
//         <div className="mt-4 border-t border-gray-300 pt-2">
//           <div className="text-center font-medium mb-2">For office use only</div>

//           <div className="space-y-2">
//             <div className="flex">
//               <span className="w-32">Room No(s). to be allotted</span>
//               <div className="flex flex-wrap gap-2 items-center">
//                 {formData.assignedRoomNumbers.map((roomNum, index) => (
//                   <div key={index} className="flex items-center">
//                     <input
//                       type="text"
//                       value={roomNum}
//                       onChange={(e) => handleRoomNumberChange(index, e.target.value)}
//                       className="w-16 border-b border-gray-400 focus:outline-none"
//                     />
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => removeRoomNumber(index)}
//                         className="ml-1 text-red-500 hover:text-red-700"
//                       >
//                         ×
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addRoomNumber}
//                   className="ml-1 text-green-600 hover:text-green-800 text-xs"
//                 >
//                   + Add
//                 </button>
//               </div>
//             </div>

//             <div className="flex">
//               <span className="w-32">Period for allotment</span>
//               <span className="mr-2">from</span>
//               <input
//                 type="text"
//                 value={formData.arrivalDate ? new Date(formData.arrivalDate).toLocaleDateString("en-GB") : ""}
//                 disabled
//                 className="w-24 border-b border-gray-400 focus:outline-none"
//               />
//               <span className="mx-2">to</span>
//               <input
//                 type="text"
//                 value={formData.departureDate ? new Date(formData.departureDate).toLocaleDateString("en-GB") : ""}
//                 disabled
//                 className="w-24 border-b border-gray-400 focus:outline-none"
//               />
//               <span className="mx-2">Total days</span>
//               <input
//                 type="text"
//                 value={calculateDays(formData.arrivalDate, formData.departureDate)}
//                 disabled
//                 className="w-12 border-b border-gray-400 focus:outline-none"
//               />
//             </div>

//             <div className="flex">
//               <span className="w-32">Entered at Sr. No.</span>
//               <input
//                 type="text"
//                 name="bookingRegistryDetails.serialNumber"
//                 value={formData.bookingRegistryDetails?.serialNumber || ""}
//                 onChange={handleChange}
//                 className="w-24 border-b border-gray-400 focus:outline-none"
//               />
//               <span className="mx-2">Page No.</span>
//               <input
//                 type="text"
//                 name="bookingRegistryDetails.pageNumber"
//                 value={formData.bookingRegistryDetails?.pageNumber || ""}
//                 onChange={handleChange}
//                 className="w-24 border-b border-gray-400 focus:outline-none"
//               />
//               <span className="ml-2">of Booking Register</span>
//             </div>

//             <div>Recommended for approval.</div>
//           </div>

//           <div className="flex justify-between mt-4">
//             <div className="font-medium">Guest House Supervisor</div>
//             <div className="font-medium">Registrar</div>
//           </div>
//         </div>

//         <div className="mt-4 text-center">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 focus:outline-none text-sm"
//           >
//             Submit Booking Request
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default GuestHouseBookingForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";

const GuestHouseBookingForm = ({ existingData }) => {
  const [formData, setFormData] = useState({
    visitType: "",
    purposeOfVisit: "",
    visitorName: "",
    designation: "",
    organization: "",
    contactNumber: "",
    email: "",
    numberOfRooms: 1,
    companions: ["", "", ""],
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    notes: "",
    bookingPerson: {
      name: "",
      designation: "",
      department: "",
      mobileNumber: "",
      email: "",
      address: "",
    },
    departmentHeadApproval: {
      remarks: "",
    },
    assignedRoomNumbers: [""],
    bookingRegistryDetails: {
      serialNumber: "",
      pageNumber: "",
    }
  });

  const [isReadOnly, setIsReadOnly] = useState(!!existingData);

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);

      const date = new Date(existingData.arrivalDateTime);
      setFormData((prevData) => ({
        ...prevData,
        arrivalDate: date.toISOString().split("T")[0],
        arrivalTime: date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      const depdate = new Date(existingData.departureDateTime);
      setFormData((prevData) => ({
        ...prevData,
        departureDate: depdate.toISOString().split("T")[0],
        departureTime: depdate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCompanionChange = (index, value) => {
    const newCompanions = [...formData.companions];
    newCompanions[index] = value;
    setFormData({
      ...formData,
      companions: newCompanions,
    });
  };

  const handleRoomNumberChange = (index, value) => {
    const newRoomNumbers = [...formData.assignedRoomNumbers];
    newRoomNumbers[index] = value;
    setFormData({
      ...formData,
      assignedRoomNumbers: newRoomNumbers,
    });
  };

  const addRoomNumber = () => {
    setFormData({
      ...formData,
      assignedRoomNumbers: [...formData.assignedRoomNumbers, ""]
    });
  };

  const removeRoomNumber = (index) => {
    const newRoomNumbers = [...formData.assignedRoomNumbers];
    newRoomNumbers.splice(index, 1);
    setFormData({
      ...formData,
      assignedRoomNumbers: newRoomNumbers
    });
  };

  const validateForm = () => {
    // Required fields
    const requiredFields = ['visitorName', 'contactNumber', 'email', 'arrivalDate', 'arrivalTime', 'departureDate', 'departureTime'];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`;
      }
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }
    
    // Check if arrival date is before departure date
    const arrivalDateTime = new Date(`${formData.arrivalDate}T${formData.arrivalTime}`);
    const departureDateTime = new Date(`${formData.departureDate}T${formData.departureTime}`);
    
    if (arrivalDateTime >= departureDateTime) {
      return "Departure date and time must be after arrival date and time";
    }
    
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      Swal.fire({
        title: 'Validation Error',
        text: validationError,
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Confirmation dialog
    Swal.fire({
      title: 'Confirm Booking',
      text: `Are you sure you want to submit this booking request for ${formData.visitorName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        submitBooking();
      }
    });
  };

  const submitBooking = async () => {
    // Show loading
    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while we process your booking request',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Combine date and time fields
    const bookingData = {
      ...formData,
      arrivalDateTime: new Date(
        `${formData.arrivalDate}T${formData.arrivalTime}`
      ),
      departureDateTime: new Date(
        `${formData.departureDate}T${formData.departureTime}`
      ),
      bookingPeriod: {
        start: new Date(`${formData.arrivalDate}T${formData.arrivalTime}`),
        end: new Date(`${formData.departureDate}T${formData.departureTime}`),
        totalDays: calculateDays(formData.arrivalDate, formData.departureDate),
      },
    };

    try {
      // Send bookingData to backend
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/travel-planner/room`,
        bookingData,
        {
          withCredentials: true,
        }
      );
      
      // Close loading and show success
      Swal.fire({
        title: 'Success!',
        text: 'Your guest house booking has been submitted successfully',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        // Optionally redirect or reset form
        window.location.href = '/pdashboard/job-profile-management';
        // Or reset form:
        // resetForm();
      });
    } catch (error) {
      console.error(error);
      
      // Show error message
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'An error occurred while submitting your booking',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('booking-form-content');
    const opt = {
      margin: 0.5,
      filename: `Guest_House_Booking_${formData.visitorName}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleEditToggle = () => {
    if (isReadOnly) {
      setIsReadOnly(false);
    } else {
      Swal.fire({
        title: 'Discard Changes?',
        text: 'Are you sure you want to stop editing? Any unsaved changes will be lost.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, stop editing'
      }).then((result) => {
        if (result.isConfirmed) {
          setIsReadOnly(true);
        }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300">
      {/* Action Buttons */}
      <div className="flex justify-end mb-4 space-x-2">
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 focus:outline-none text-sm"
        >
          Download PDF
        </button>
        {existingData && (
          <button
            type="button"
            onClick={handleEditToggle}
            className={`px-4 py-1 rounded focus:outline-none text-sm ${
              isReadOnly 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            {isReadOnly ? 'Edit' : 'Cancel Edit'}
          </button>
        )}
      </div>

      {/* Form Content */}
      <div id="booking-form-content">
        {/* Header with Institute Name */}
        <div className="text-center mb-4">
          <h2 className="text-base font-bold">
            DR B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY,
            JALANDHAR-144008, PUNJAB (INDIA)
          </h2>
        </div>
        
        {/* Reference number and date */}
        <div className="flex justify-between mb-2 text-sm">
          <div>
            <span>Ref no: NITJ/: {formData._id}</span>
          </div>
          <div>
            <span>Dated: {new Date().toLocaleDateString("en-GB")}</span>
          </div>
          <div>
            <span>G-8</span>
          </div>
        </div>
        
        {/* Form Title */}
        <div className="text-center mb-4">
          <h2 className="text-base font-bold underline">GUEST HOUSE ROOM BOOKING FORM</h2>
        </div>

        <form onSubmit={handleSubmit} className="text-sm">
          {/* Kind of Visit */}
          <div className="flex mb-3">
            <span className="mr-2">1.</span>
            <span className="mr-2">Kind of Visit:</span>
            <span className="mr-2">Official</span>
            <input
              type="radio"
              name="visitType"
              value="Official"
              checked={formData.visitType === "Official"}
              onChange={handleChange}
              disabled={isReadOnly}
              className="mr-4"
            />
            <span className="mr-2">Non Official</span>
            <input
              type="radio"
              name="visitType"
              value="Non-Official"
              checked={formData.visitType === "Non-Official"}
              onChange={handleChange}
              disabled={isReadOnly}
            />
          </div>

          {/* Purpose of Visit */}
          <div className="flex mb-3">
            <span className="mr-2">2.</span>
            <span className="mr-2">Purpose of visit:</span>
            <input
              type="text"
              name="purposeOfVisit"
              value={formData.purposeOfVisit}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`flex-1 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Visitor Name */}
          <div className="flex mb-3">
            <span className="mr-2">3.</span>
            <span className="mr-2">Name of Visitor:</span>
            <input
              type="text"
              name="visitorName"
              value={formData.visitorName}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`flex-1 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Designation */}
          <div className="flex mb-3">
            <span className="mr-2">4.</span>
            <span className="mr-2">Designation:</span>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`flex-1 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Organization */}
          <div className="flex mb-3">
            <span className="mr-2">5.</span>
            <span className="mr-2">Organization/Address:</span>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`flex-1 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Contact and Email */}
          <div className="flex mb-3">
            <span className="mr-2">6.</span>
            <span className="mr-2">Contact/Mobile No.:</span>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`w-32 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <span className="mx-2">@Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`flex-1 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Number of Rooms */}
          <div className="flex mb-3">
            <span className="mr-2">7.</span>
            <span className="mr-2">No. of Rooms required:</span>
            <input
              type="number"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              min="1"
              disabled={isReadOnly}
              className={`w-16 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Companions */}
          <div className="flex mb-3">
            <span className="mr-2">8.</span>
            <span className="mr-2">Name of Companions:</span>
            {formData.companions.map((companion, index) => (
              <React.Fragment key={index}>
                <span className="mr-1">({index + 1})</span>
                <input
                  type="text"
                  value={companion}
                  onChange={(e) => handleCompanionChange(index, e.target.value)}
                  disabled={isReadOnly}
                  className={`w-32 border-b border-gray-400 focus:outline-none mr-2 ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Arrival Date and Time */}
          <div className="flex mb-3">
            <span className="mr-2">9.</span>
            <span className="mr-2">Date and time of Arrival:</span>
            <span className="mr-1">Date</span>
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`w-32 border-b border-gray-400 focus:outline-none mr-2 ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <span className="mr-1">Time</span>
            <input
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`w-32 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Departure Date and Time */}
          <div className="flex mb-3">
            <span className="mr-2">10.</span>
            <span className="mr-2">Date and time of Departure:</span>
            <span className="mr-1">Date</span>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`w-32 border-b border-gray-400 focus:outline-none mr-2 ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <span className="mr-1">Time</span>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`w-32 border-b border-gray-400 focus:outline-none ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Booking Person Details */}
          <div className="mt-4">
            <div className="text-center mb-2">
              <span className="font-medium">Details of person making the Booking</span>
            </div>

            <div className="space-y-2">
              {/* Name */}
              <div className="flex">
                <span className="w-24">Name</span>
                <input
                  type="text"
                  name="bookingPerson.name"
                  value={formData.bookingPerson?.name || ""}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`flex-1 border-b border-gray-400 focus:outline-none ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              {/* Designation */}
              <div className="flex">
                <span className="w-24">Designation</span>
                <input
                  type="text"
                  name="bookingPerson.designation"
                  value={formData.bookingPerson?.designation || ""}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`flex-1 border-b border-gray-400 focus:outline-none ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              {/* Department */}
              <div className="flex">
                <span className="w-24">Department/Section/Centre</span>
                <input
                  type="text"
                  name="bookingPerson.department"
                  value={formData.bookingPerson?.department || ""}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`flex-1 border-b border-gray-400 focus:outline-none ml-20 ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              {/* Mobile Number */}
              <div className="flex">
                <span className="w-24">Mobile No</span>
                <input
                  type="text"
                  name="bookingPerson.mobileNumber"
                  value={formData.bookingPerson?.mobileNumber || ""}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`flex-1 border-b border-gray-400 focus:outline-none ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              {/* Email */}
              <div className="flex">
                <span className="w-24">E-mail</span>
                <input
                  type="email"
                  name="bookingPerson.email"
                  value={formData.bookingPerson?.email || ""}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`flex-1 border-b border-gray-400 focus:outline-none ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              {/* Address */}
              <div className="flex">
                <span className="w-24">Address</span>
                <input
                  type="text"
                  name="bookingPerson.address"
                  value={formData.bookingPerson?.address || ""}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`flex-1 border-b border-gray-400 focus:outline-none ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <div className="text-right mt-2">(Signature)</div>
          </div>

          {/* Department Head Approval */}
          <div className="mt-4">
            <div className="font-medium">Remarks by Head of the Department/Section</div>
            <textarea
              name="departmentHeadApproval.remarks"
              value={formData.departmentHeadApproval.remarks || ""}
              onChange={handleChange}
              disabled={isReadOnly}
              className={`w-full h-20 border border-gray-400 p-1 focus:outline-none mt-1 ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            ></textarea>

            <div className="flex justify-between mt-2">
              <div>Date: {new Date().toLocaleDateString("en-GB")}</div>
              <div className="text-center">Head of the Department/Office</div>
              <div></div>
            </div>
          </div>

          {/* Office Use Section */}
          <div className="mt-4 border-t border-gray-300 pt-2">
            <div className="text-center font-medium mb-2">For office use only</div>

            <div className="space-y-2">
              {/* Room Numbers */}
              <div className="flex">
                <span className="w-32">Room No(s). to be allotted</span>
                <div className="flex flex-wrap gap-2 items-center">
                  {formData.assignedRoomNumbers.map((roomNum, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={roomNum}
                        onChange={(e) => handleRoomNumberChange(index, e.target.value)}
                        disabled={isReadOnly}
                        className={`w-16 border-b border-gray-400 focus:outline-none ${
                          isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                        }`}
                      />
                      {!isReadOnly && index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeRoomNumber(index)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={addRoomNumber}
                      className="ml-1 text-green-600 hover:text-green-800 text-xs"
                    >
                      + Add
                    </button>
                  )}
                </div>
              </div>

              {/* Booking Period */}
              <div className="flex">
                <span className="w-32">Period for allotment</span>
                <span className="mr-2">from</span>
                <input
                  type="text"
                  value={formData.arrivalDate ? new Date(formData.arrivalDate).toLocaleDateString("en-GB") : ""}
                  disabled
                  className="w-24 border-b border-gray-400 focus:outline-none"
                />
                <span className="mx-2">to</span>
                <input
                  type="text"
                  value={formData.departureDate ? new Date(formData.departureDate).toLocaleDateString("en-GB") : ""}
                  disabled
                  className="w-24 border-b border-gray-400 focus:outline-none"
                />
                <span className="mx-2">Total days</span>
                <input
                  type="text"
                  value={calculateDays(formData.arrivalDate, formData.departureDate)}
                  disabled
                  className="w-12 border-b border-gray-400 focus:outline-none"
                />
              </div>

              {/* Booking Registry Details */}
              <div className="flex">
                <span className="w-32">Entered at Sr. No.</span>
                <input
                  type="text"
                  name="bookingRegistryDetails.serialNumber"
                  value={formData.bookingRegistryDetails?.serialNumber || ""}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`w-24 border-b border-gray-400 focus:outline-none ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
                <span className="mx-2">Page No.</span>
                <input
                  type="text"
                  name="bookingRegistryDetails.pageNumber"
                  value={formData.bookingRegistryDetails?.pageNumber || ""}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`w-24 border-b border-gray-400 focus:outline-none ${
                    isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
                <span className="ml-2">of Booking Register</span>
              </div>

              <div>Recommended for approval.</div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="font-medium">Guest House Supervisor</div>
              <div className="font-medium">Registrar</div>
            </div>
          </div>
        </form>

        {/* Submit Button */}
        {!isReadOnly && (
          <div className="mt-4 text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 focus:outline-none text-sm"
            >
              Submit Booking Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestHouseBookingForm;