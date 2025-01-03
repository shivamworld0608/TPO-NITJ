import mongoose from "mongoose";

const DeveloperSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['Coordinator','Developer Team Leads','Developer'],
  },
});

const Devteam= mongoose.model('Devteam', DeveloperSchema);

export default Devteam;
