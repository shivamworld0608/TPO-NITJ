import mongoose from "mongoose";

const MealArrangementSchema = new mongoose.Schema({
  visitingOrganization: {
    type: String,
    trim: true
  },
  purposeOfVisit: {
    type: String,
    enum: [
      'Meeting of BOGs/Finance Committee/Senate/B&WC',
      'Selection Committee/Screening Committee',
      'Audit Team',
      'Experts to deliver lectures',
      'Dissertation/project evaluation/Viva-voce Examination',
      'Accreditation Team',
      'Departmental Visiting Committee',
      'Pre Placement Talk / Campus Interviews',
      'Industry-Institute-Interaction activities',
      'Board of Studies meeting',
      'Short term course/Seminar/Conference/Workshop',
      'Comprehensive/Pre-submission/Final Viva-voce Examination and Thesis Evaluation',
      'Personal Programmes',
      'Other'
    ],
  },
  otherPurpose: {
    type: String,
    trim: true
  },
  mealArrangements: {
    date: {
      type: Date,
    },
    breakfast: {
      numberOfPersons: {
        type: Number,
        default: 0
      }
    },
    lunch: {
      numberOfPersons: {
        type: Number,
        default: 0
      }
    },
    dinner: {
      numberOfPersons: {
        type: Number,
        default: 0
      }
    },
    teaSnacks: {
      numberOfPersons: {
        type: Number,
        default: 0
      }
    }
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