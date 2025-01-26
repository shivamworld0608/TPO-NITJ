import mongoose from "mongoose";

const MealArrangementSchema = new mongoose.Schema({
  recruiterId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter',
  },
  visitingOrganization: {
    type: String,
    trim: true
  },
  purposeOfVisit: {
    type: String,
  },
  mealArrangements: [{
    date: {
      type: Date,
    },
    breakfast: {
        type: Number,
        default: 0
    },
    lunch: {
        type: Number,
        default: 0
    },
    dinner: {
        type: Number,
        default: 0
    },
    snacks: {
        type: Number,
        default: 0
    }
    }],
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
    },
    approvalDate: Date
  },
  guestHouseSupervisorApproval: {
    approved: {
      type: Boolean,
      default: false
    },
    remarks: {
      type: String,
      trim: true
    }
  },
  inviteeList: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

const MealArrangement= mongoose.model('MealArrangement', MealArrangementSchema);

export default MealArrangement;