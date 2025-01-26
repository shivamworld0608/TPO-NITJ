import mongoose from 'mongoose';

const GuestHouseBookingSchema = new mongoose.Schema({
  visitType: {
    type: String,
    enum: ['Official', 'Non-Official'],
  },
  purposeOfVisit: {
    type: String,
    trim: true
  },
  visitorName: {
    type: String,
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  organization: {
    type: String,
    trim: true
  },
  contactNumber: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  numberOfRooms: {
    type: Number,
    min: 1,
  },
  companions: [{
    type: String,
    trim: true
  }],
  arrivalDateTime: {
    type: Date,
  },
  departureDateTime: {
    type: Date,
  },
  bookingPerson: {
    name: {
      type: String,
      trim: true
    },
    designation: {
      type: String,
      trim: true
    },
    department: {
      type: String,
      trim: true
    },
    mobileNumber: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true
    }
  },
  departmentHeadApproval: {
    approved: {
      type: Boolean,
      default: false
    },
    remarks: {
      type: String,
      trim: true
    }
  },
  assignedRoomNumbers: [{
    type: String,
    trim: true
  }],
  bookingPeriod: {
    start: Date,
    end: Date,
    totalDays: Number
  },
  bookingRegistryDetails: {
    serialNumber: {
      type: String,
      trim: true
    },
    pageNumber: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true
});

const GuestHouseBooking = mongoose.model('GuestHouseBooking', GuestHouseBookingSchema);

export default GuestHouseBooking;