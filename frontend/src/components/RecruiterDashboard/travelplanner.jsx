import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import VisitorTab from "./visitortab";
import VehicleTab from "./vehicletab";
import RoomTab from "./roomtab";
import FoodTab from "./foodtab";

function TravelPlanner() {
  const [step, setStep] = useState(0);

  const [visitorDetails, setVisitorDetails] = useState({
    purpose: "",
    visitorName: "",
    designation: "",
    organization: "",
    contact: "",
    email: "",
    expectedVisitors: "",
    companions: [""],
  });

  const [wantVehicle, setWantVehicle] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState({
    passengers: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDateTime: "",
    returnJourney: "",
    returnPickupLocation: "",
    returnDropLocation: "",
    returnDateTime: "",
    notes: "",
  });

  const [wantRoom, setWantRoom] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    numberOfRooms: "",
    companions: [""],
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    notes: "",
  });

  const [wantFood, setWantFood] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [foodDetails, setFoodDetails] = useState({
    tableRows: [{ date: "", breakfast: "", lunch: "", dinner: "", snacks: "" }],
    notes: "",
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const bookingDetails = {
      visitorDetails,
      wantVehicle,
      vehicleDetails,
      wantRoom,
      roomDetails,
      wantFood,
      foodDetails,
    };
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to edit this in Future!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, submit it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/travel-planner/create`,
          bookingDetails,
          { withCredentials: true }
        );
        toast.success("Booking form submitted successfully 😊");
      } catch (error) {
        toast.error("Some error in submitting");
        setIsSubmitting(false);
      }
      finally {
        setIsSubmitting(false);
      }

    }
  };

  const steps = ["Visitor", "Vehicle", "Room", "Food", "Summary"];

  const canNavigateToStep = (targetStep) => {
    if (targetStep === 0) return true;
    if (targetStep === 1 && visitorDetails.visitorName) return true;
    if (targetStep === 2 && wantVehicle !== null) return true;
    if (targetStep === 3 && wantRoom !== null) return true;
    if (targetStep === 4 && wantFood !== null) return true;
    return false;
  };

  const handleStepClick = (index) => {
    if (index === step) return;
    if (canNavigateToStep(index)) {
      setStep(index);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((stepName, index) => (
          <React.Fragment key={stepName}>
            <div className="flex flex-col items-center">
              <div className="bg-white flex items-center justify-center relative">
                {index < step ? (
                  <CheckCircle2 className="w-8 h-8 text-custom-blue" />
                ) : (
                  <Circle
                    className={`w-8 h-8 ${
                      index === step ? "text-custom-blue" : "text-gray-300"
                    }`}
                  />
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  index === step ? "text-custom-blue" : "text-gray-500"
                }`}
              >
                {stepName}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex flex-1 items-center">
                <div
                  className={`h-1 w-full ${
                    index < step ? "bg-custom-blue" : "bg-gray-200"
                  }`}
                  style={{
                    transform: "translateY(-14px)",
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <VisitorTab
            visitorDetails={visitorDetails}
            setVisitorDetails={setVisitorDetails}
            onNext={() => setStep(1)}
          />
        );
      case 1:
        return (
          <VehicleTab
            wantVehicle={wantVehicle}
            setWantVehicle={setWantVehicle}
            vehicleDetails={vehicleDetails}
            setVehicleDetails={setVehicleDetails}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <RoomTab
            wantRoom={wantRoom}
            setWantRoom={setWantRoom}
            roomDetails={roomDetails}
            setRoomDetails={setRoomDetails}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <FoodTab
            wantFood={wantFood}
            setWantFood={setWantFood}
            foodDetails={foodDetails}
            setFoodDetails={setFoodDetails}
            onNext={() => setStep(4)}
          />
        );
      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Booking Summary
              </h2>
              <p className="text-gray-600">Review your booking details below</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Visitor Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-gray-800">
                        {visitorDetails.visitorName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Purpose
                      </p>
                      <p className="text-gray-800">{visitorDetails.purpose}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Organization
                      </p>
                      <p className="text-gray-800">
                        {visitorDetails.organization}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Designation
                      </p>
                      <p className="text-gray-800">
                        {visitorDetails.designation}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Contact
                      </p>
                      <p className="text-gray-800">{visitorDetails.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-800">{visitorDetails.email}</p>
                    </div>
                  </div>
                  {visitorDetails.companions.length > 0 &&
                    visitorDetails.companions[0] && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">
                          Accompanying Visitors
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          {visitorDetails.companions.map(
                            (companion, index) =>
                              companion && (
                                <li key={index} className="text-gray-800 ml-4">
                                  {companion}
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Vehicle Booking
                </h3>
                {wantVehicle ? (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Passengers
                        </p>
                        <p className="text-gray-800">
                          {vehicleDetails.passengers}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Pickup Location
                        </p>
                        <p className="text-gray-800">
                          {vehicleDetails.pickupLocation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Drop Location
                        </p>
                        <p className="text-gray-800">
                          {vehicleDetails.dropLocation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Pickup Time
                        </p>
                        <p className="text-gray-800">
                        {new Date(
                            vehicleDetails.pickupDateTime
                          ).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Return Pickup Location
                        </p>
                        <p className="text-gray-800">
                          {vehicleDetails.returnPickupLocation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Return Drop Location
                        </p>
                        <p className="text-gray-800">
                          {vehicleDetails.returnDropLocation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Return Pickup Time
                        </p>
                        <p className="text-gray-800">
                          {new Date(
                            vehicleDetails.returnDateTime
                          ).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                    {vehicleDetails.notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Additional Notes
                        </p>
                        <p className="text-gray-800">{vehicleDetails.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No vehicle booking needed</p>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Room Booking
                </h3>
                {wantRoom ? (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Rooms Required
                        </p>
                        <p className="text-gray-800">
                          {roomDetails.numberOfRooms}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Stay Duration
                        </p>
                        <p className="text-gray-800">
                          {new Date(
                            roomDetails.arrivalDate +
                              " " +
                              roomDetails.arrivalTime
                          ).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                          {" to "}
                          {new Date(
                            roomDetails.departureDate +
                              " " +
                              roomDetails.departureTime
                          ).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                    {roomDetails.notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Additional Notes
                        </p>
                        <p className="text-gray-800">{roomDetails.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No room booking needed</p>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Food Selection
                </h3>
                {wantFood ? (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                    <p className="text-sm font-medium text-gray-500 mb-4">
                      Meal Schedule
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                              Date
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                              Breakfast
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                              Lunch
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                              Dinner
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                              Snacks
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {foodDetails.tableRows.map((row, index) => (
                            <tr
                              key={index}
                              className="border-t border-gray-200"
                            >
                              <td className="px-4 py-2 text-gray-800">
                                {new Date(row.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </td>
                              <td className="px-4 py-2 text-gray-800">
                                {row.breakfast || 0}
                              </td>
                              <td className="px-4 py-2 text-gray-800">
                                {row.lunch || 0}
                              </td>
                              <td className="px-4 py-2 text-gray-800">
                                {row.dinner || 0}
                              </td>
                              <td className="px-4 py-2 text-gray-800">
                                {row.snacks || 0}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {foodDetails.notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Additional Notes
                        </p>
                        <p className="text-gray-800">{foodDetails.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No food selection needed</p>
                )}
              </div>
            </div>

            <button
              className="w-full mt-6 py-4 px-6 bg-custom-blue text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 transition-colors text-lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-extrabold text-custom-blue tracking-tight ">
            Travel Planner
          </h1>
          {step > 0 && (
            <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 text-white bg-custom-blue hover:bg-custom-blue
              px-6 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-opacity-50 active:scale-95"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Back</span>
          </button>
          
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-10">{renderProgressBar()}</div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-custom-blue">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default TravelPlanner;
