import mongoose from "mongoose";

const VehicleRequisitionSchema = new mongoose.Schema({
  recruiterId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter',
  },
  indentor: {
    employeeCode: {
      type: String,
      trim: true
    },
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
      trim: true
    }
  },
  purpose: {
    type: String,
    trim: true
  },
  purposeType: {
    type: String,
    enum: ['Non-Official', 'Official'],
  },
  supportingDocument: {
    type: String,
    trim: true
  },
  placeToVisit: {
    type: String,
    trim: true
  },
  vehicleType: {
    type: String,
    trim: true
  },
  requiredDateTime: {
    from: {
      type: Date,
    },
    to: {
      type: Date,
    }
  },
  driverDetails: {
    name: {
      type: String,
      trim: true
    },
    mobileNumber: {
      type: String,
      trim: true
    },
    vehicleNumber: {
      type: String,
      trim: true
    }
  },
  journeyReport: {
    startTime: Date,
    endTime: Date,
    kilometresCovered: {
      type: Number,
      min: 0
    },
    charges: {
      type: Number,
      min: 0
    }
  },
  approvals: {
    assistantRegistrar: {
      approved: {
        type: Boolean,
        default: false
      },
      date: Date
    },
    registrar: {
      approved: {
        type: Boolean,
        default: false
      },
      date: Date
    }
  }
}, {
  timestamps: true
});

const VehicleRequisition = mongoose.model('VehicleRequisition', VehicleRequisitionSchema);

export default VehicleRequisition;