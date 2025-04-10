import MealArrangement from "../models/travel_planner/food.js";
import GuestHouseBooking from "../models/travel_planner/room.js";
import VehicleRequisition from "../models/travel_planner/vehicle.js";

export const createtp = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const bookingDetails = req.body;
    if (bookingDetails.wantVehicle) {
      const vehicle = await VehicleRequisition.create({
        recruiterId: recruiterId,
        company: bookingDetails.visitorDetails.organization,
        purpose: bookingDetails.visitorDetails.purpose,
        
      });
    }
    if (bookingDetails.wantRoom) {
      const room = await GuestHouseBooking.create({
        recruiterId: recruiterId,
        purposeOfVisit: bookingDetails.visitorDetails.purpose,
        visitorName: bookingDetails.visitorDetails.visitorName,
        designation: bookingDetails.visitorDetails.designation,
        organization: bookingDetails.visitorDetails.organization,
        contactNumber: bookingDetails.visitorDetails.contact,
        email: bookingDetails.visitorDetails.email,
        numberOfRooms: bookingDetails.roomDetails.numberOfRooms,
        companions: bookingDetails.visitorDetails.companions,
        arrivalDateTime: new Date(
          `${bookingDetails.roomDetails.arrivalDate}T${bookingDetails.roomDetails.arrivalTime}`
        ),
        departureDateTime: new Date(
          `${bookingDetails.roomDetails.departureDate}T${bookingDetails.roomDetails.departureTime}`
        ),
        notes: bookingDetails.roomDetails.notes,
      });
    }
    if (bookingDetails.wantFood) {
      const food = await MealArrangement.create({
        recruiterId: recruiterId,
        visitingOrganization: bookingDetails.visitorDetails.organization,
        purposeOfVisit: bookingDetails.visitorDetails.purpose,
        mealArrangements: bookingDetails.foodDetails.tableRows,
        notes: bookingDetails.foodDetails.notes,
      });
    }
    return res.status(201).json({
      message: "travel form created successfully!",
    });
  } catch {
    res.status(500).send({ message: "Error creating template" });
  }
};

export const gettp = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const vehicle = await VehicleRequisition.find({ recruiterId });
    const food = await MealArrangement.find({ recruiterId });
    const room = await GuestHouseBooking.find({ recruiterId });
    res.status(200).json({ vehicle, food, room });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

export const updatefoodtp = async (req, res) => {
  try {
    const bookingDetails = req.body;
    const recruiterId = bookingDetails.recruiterId;
    console.log("Recruiter ID:",recruiterId);
    console.log("Booking Details:",bookingDetails);
    
    const food = await MealArrangement.findOneAndUpdate(
      { recruiterId },
      {
        visitingOrganization: bookingDetails.visitingOrganization,
        purposeOfVisit: bookingDetails.purposeOfVisit,
        mealArrangements: bookingDetails.mealArrangements,
        notes: bookingDetails.notes,
        bookingPerson: bookingDetails.bookingPerson,
        departmentHeadApproval: bookingDetails.departmentHeadApproval,
        guestHouseSupervisorApproval: bookingDetails.guestHouseSupervisorApproval,
        inviteeList: bookingDetails.inviteeList,
        updatedAt: new Date(),
      }
    );

    console.log("food",food);
    
    if (!food) return res.status(404).send({ message: "food not found" });
    return res.status(200).send({ message: "food updated successfully",food });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

export const updateroomtp = async (req, res) => {
  try {
    const bookingDetails = req.body;
    const recruiterId = bookingDetails.recruiterId;
    const room = await GuestHouseBooking.findOneAndUpdate(
      { recruiterId },
      {
        visitType: bookingDetails.visitType,
        purposeOfVisit: bookingDetails.purposeOfVisit,
        visitorName: bookingDetails.visitorName,
        designation: bookingDetails.designation,
        organization: bookingDetails.organization,
        contactNumber: bookingDetails.contactNumber,
        email: bookingDetails.email,
        numberOfRooms: bookingDetails.numberOfRooms,
        companions: bookingDetails.companions,
        arrivalDateTime: bookingDetails.arrivalDateTime,
        departureDateTime: bookingDetails.departureDateTime,
        notes: bookingDetails.notes,
        bookingPerson: bookingDetails.bookingPerson,
        departmentHeadApproval: bookingDetails.departmentHeadApproval,
        guestHouseSupervisorApproval: bookingDetails.guestHouseSupervisorApproval,
        assignedRoomNumbers: bookingDetails.assignedRoomNumbers,
        bookingRegistryDetails: bookingDetails.bookingRegistryDetails,
        updatedAt: new Date(),
      }
    );
    if (!room) return res.status(404).send({ message: "room not found" });
    return res.status(200).send({ message: "room updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

// export const updatevehicletp = async (req, res) => {
//   try {
//     const bookingDetails = req.body;
//     const recruiterId = bookingDetails.recruiterId;
//     const vehicle = await VehicleRequisition.findOneAndUpdate(
//       { recruiterId },
//       {
//         company: bookingDetails.company,
//         purpose: bookingDetails.purpose,
//         vehicleType: bookingDetails.vehicleType,
//         vehicleNumber: bookingDetails.vehicleNumber,
//         driverName: bookingDetails.driverName,
//         driverContact: bookingDetails.driverContact,
//         notes: bookingDetails.notes,
//         bookingPerson: bookingDetails.bookingPerson,
//         departmentHeadApproval: bookingDetails.departmentHeadApproval,
//         guestHouseSupervisorApproval: bookingDetails.guestHouseSupervisorApproval,
//         updatedAt: new Date(),
//       }
//     );
//     if (!vehicle) return res.status(404).send({ message: "vehicle not found" });
//     return res.status(200).send({ message: "vehicle updated successfully" });
//   }
//   catch (error) {
//     res.status(500).send({ message: "Error" });
//   }
// }

export const updatevehicletp = async (req, res) => {
  try {
    const { 
      recruiterId,
      company,
      indentor,
      purpose,
      placeToVisit,
      vehicleType,
      requiredDateTime,
      driverDetails,
      journeyReport,
      approvals
    } = req.body;

    const vehicle = await VehicleRequisition.findOneAndUpdate(
      { recruiterId },
      {
        ...(company && { company }),
        ...(indentor && { 
          indentor: {
            employeeCode: indentor.employeeCode,
            name: indentor.name,
            designation: indentor.designation,
            department: indentor.department,
            mobileNumber: indentor.mobileNumber,
            email: indentor.email
          }
        }),
        ...(purpose && { purpose }),
        ...(placeToVisit && { placeToVisit }),
        ...(vehicleType && { vehicleType }),
        ...(requiredDateTime && { 
          requiredDateTime: {
            from: requiredDateTime.from,
            to: requiredDateTime.to
          }
        }),
        ...(driverDetails && { 
          driverDetails: {
            name: driverDetails.name,
            mobileNumber: driverDetails.mobileNumber,
            vehicleNumber: driverDetails.vehicleNumber
          }
        }),
        ...(journeyReport && { 
          journeyReport: {
            startTime: journeyReport.startTime,
            endTime: journeyReport.endTime,
            kilometresCovered: journeyReport.kilometresCovered,
            charges: journeyReport.charges
          }
        }),
        ...(approvals && { 
          approvals: {
            assistantRegistrar: {
              approved: approvals.assistantRegistrar?.approved,
              date: approvals.assistantRegistrar?.date
            },
            registrar: {
              approved: approvals.registrar?.approved,
              date: approvals.registrar?.date
            }
          }
        }),
        updatedAt: new Date()
      },
      { 
        new: true,  // Return the modified document
        runValidators: true  // Run model validations
      }
    );

    if (!vehicle) {
      return res.status(404).json({ 
        message: "Vehicle requisition not found",
        success: false 
      });
    }

    return res.status(200).json({ 
      message: "Vehicle requisition updated successfully",
      success: true,
      data: vehicle 
    });
  }
  catch (error) {
    console.error('Update Vehicle Requisition Error:', error);
    return res.status(500).json({ 
      message: "Error updating vehicle requisition",
      success: false,
      error: error.message 
    });
  }
};

export const getTravelPlanner = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const vehicle = await VehicleRequisition.find({ recruiterId });
    // const food = await MealArrangement.find({ recruiterId });
    // const room = await GuestHouseBooking.find({ recruiterId });
    res.status(200).json({  food });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};
