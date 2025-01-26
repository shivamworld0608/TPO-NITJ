import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import VisitorTab from "./visitortab";
import VehicleTab from "./vehicletab";
import RoomTab from "./roomtab";
import FoodTab from "./foodtab";

function App() {
  const [step, setStep] = useState(0);

  const [visitorDetails, setVisitorDetails] = useState({
    kindOfVisit: "",
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
    pickup: "",
    pickupTime: "",
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
  const [foodDetails, setFoodDetails] = useState({
    tableRows: [{ date: "", breakfast: "", lunch: "", dinner: "", snacks: "" }],
  });


  const handleSubmit = async () => {

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
              title: 'Are you sure?',
              text: 'You won’t be able to edit this in Future!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: 'green-300',
              cancelButtonColor: '#3085d',
              confirmButtonText: 'Yes, submit it!',
            });
    if (result.isConfirmed) {
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/travel-planner/create`, bookingDetails, {withCredentials:true});
      toast.success("Booking form submitted successfully 😊");
    } catch (error) {
      toast.error("Some error in submitting");
    }}
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
    <div className="mb-10">
      <div className="flex justify-between items-center">
        {steps.map((stepName, index) => (
          <React.Fragment key={stepName}>
            <div
              className={`flex flex-col items-center ${
                canNavigateToStep(index)
                  ? "hover:scale-105 transition-transform"
                  : "opacity-50"
              }`}
            >
              {index < step ? (
                <CheckCircle2 className="w-10 h-10 text-blue-500 drop-shadow-md" />
              ) : (
                <Circle
                  className={`w-10 h-10 ${
                    index === step
                      ? "text-blue-500 drop-shadow-md"
                      : "text-gray-300"
                  }`}
                />
              )}
              <span
                className={`mt-3 text-sm font-medium ${
                  index === step ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {stepName}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-full ${
                  index < step ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
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
            <h2 className="text-3xl font-bold text-blue-900">
              Booking Summary
            </h2>
            <div className="space-y-4">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  Visitor Information
                </h3>
                <div className="space-y-2">
                  <p className="text-blue-600">
                    Name: {visitorDetails.visitorName}
                  </p>
                  <p className="text-blue-600">
                    Visit Type: {visitorDetails.kindOfVisit}
                  </p>
                  <p className="text-blue-600">
                    Purpose: {visitorDetails.purpose}
                  </p>
                  <p className="text-blue-600">
                    Organization: {visitorDetails.organization}
                  </p>
                  <p className="text-blue-600">
                    Designation: {visitorDetails.designation}
                  </p>
                  <p className="text-blue-600">
                    Contact: {visitorDetails.contact}
                  </p>
                  <p className="text-blue-600">Email: {visitorDetails.email}</p>
                  <p className="text-blue-600">
                    Expected Number of Visitors:{" "}
                    {visitorDetails.expectedVisitors}
                  </p>
                  {visitorDetails.companions.length > 0 && (
                    <div>
                      <p className="text-blue-600">Accompanying Visitors:</p>
                      <ul className="list-disc list-inside">
                        {visitorDetails.companions.map(
                          (companion, index) =>
                            companion && (
                              <li key={index} className="text-blue-600 ml-4">
                                {companion}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  Vehicle Booking
                </h3>
                {wantVehicle ? (
                  <div className="space-y-2">
                    <p className="text-blue-600">
                      Passengers: {vehicleDetails.passengers}
                    </p>
                    <p className="text-blue-600">
                      Pickup Location: {vehicleDetails.pickup}
                    </p>
                    <p className="text-blue-600">
                      <p>
                        Pickup Time:{" "}
                        {new Date(vehicleDetails.pickupTime).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </p>
                    {vehicleDetails.notes && (
                      <p className="text-blue-600">
                        Additional Note: {vehicleDetails.notes}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No vehicle booking needed</p>
                )}
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  Room Booking
                </h3>
                {wantRoom ? (
                  <div className="space-y-2">
                    <p className="text-blue-600">
                      Rooms Required: {roomDetails.numberOfRooms}
                    </p>
                    <p className="text-blue-600">
                      Stay:{" "}
                      {new Date(
                        roomDetails.arrivalDate + " " + roomDetails.arrivalTime
                      ).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      to{" "}
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

                    {roomDetails.notes && (
                      <p className="text-blue-600">
                        Additional Note: {roomDetails.notes}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No room booking needed</p>
                )}
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  Food Selection
                </h3>
                {wantFood ? (
                  <div className="space-y-2">
                    <p className="text-blue-600">Meal Schedule:</p>
                    <p className="text-blue-600 text-center">
                      Arrangement to be made for Nos. of persons
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-left text-blue-600">
                            <th className="py-2">Date</th>
                            <th className="py-2">Breakfast</th>
                            <th className="py-2">Lunch</th>
                            <th className="py-2">Dinner</th>
                            <th className="py-2">Snacks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {foodDetails.tableRows.map((row, index) => (
                            <tr key={index} className="text-blue-600">
                              <td className="py-2">
                                {new Date(row.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </td>

                              <td className="py-2">{row.breakfast || 0}</td>
                              <td className="py-2">{row.lunch || 0}</td>
                              <td className="py-2">{row.dinner || 0}</td>
                              <td className="py-2">{row.snacks || 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {foodDetails.notes && (
                      <p className="text-blue-600">
                        Additional Note:{foodDetails.notes}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No food selection needed</p>
                )}
              </div>
            </div>

            <button
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg text-lg font-medium
                hover:bg-blue-700 active:bg-blue-800 
                transition-all duration-200 shadow-lg shadow-blue-200
                transform hover:scale-[1.02]"
              onClick={handleSubmit}
            >
              Confirm Booking
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-blue-900">Travel Planner</h1>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800
                px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}
        </div>
        {renderProgressBar()}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
