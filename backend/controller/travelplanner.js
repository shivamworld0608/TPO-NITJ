import MealArrangement from "../models/travel_planner/food.js";
import GuestHouseBooking from "../models/travel_planner/room.js";
import VehicleRequisition from "../models/travel_planner/vehicle.js";
export const createtp = async (req, res) => {
try{
    const recruiterId=req.user.userId;
    const bookingDetails = req.body;
    if(bookingDetails.wantVehicle){
        const vehicle=await VehicleRequisition.create({
            recruiterId: recruiterId,
            purpose:bookingDetails.visitorDetails.purpose,
            purposeType:bookingDetails.vehicleDetails.purposeType,
        });
    }
    if(bookingDetails.wantRoom){
        const room=await GuestHouseBooking.create({
            recruiterId: recruiterId,
            visitType:bookingDetails.visitorDetails.kindOfVisit,
            purposeOfVisit:bookingDetails.visitorDetails.purpose,
            visitorName:bookingDetails.visitorDetails.visitorName,
            designation:bookingDetails.visitorDetails.designation,
            organization:bookingDetails.visitorDetails.organization,
            contactNumber:bookingDetails.visitorDetails.contact,
            email:bookingDetails.visitorDetails.email,
            numberOfRooms: bookingDetails.roomDetails.numberOfRooms,
            companions: bookingDetails.roomDetails.companions,
            arrivalDateTime:bookingDetails.roomDetails.arrivalDate,
            departureDateTime:bookingDetails.roomDetails.departureDate,
            notes: bookingDetails.roomDetails.notes,
        });
    }
    if(bookingDetails.wantFood){
        const food = await MealArrangement.create({
              recruiterId,
              visitingOrganization:bookingDetails.visitorDetails.organization,
              purposeOfVisit:bookingDetails.visitorDetails.purpose,
              mealArrangements:bookingDetails.foodDetails.tableRows,
        });
    }
    return res.status(201).json({ 
        message: "travel form created successfully!", 
      });
}
catch{
    res.status(500).send({ message: "Error creating template" });
}
}

export const gettp = async (req,res)=>{
     try{
        const recruiterId=req.user.userId;
        const vehicle=await VehicleRequisition.find({recruiterId});
        const food =await MealArrangement.find({recruiterId});
        const room=await GuestHouseBooking.find({recruiterId});
        res.status(200).json({vehicle,food,room});
     }catch(error){
        res.status(500).send({ message: "Error" });
     }
}