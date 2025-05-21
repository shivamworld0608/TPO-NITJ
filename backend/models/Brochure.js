import mongoose from "mongoose";

const brochureSchema = new mongoose.Schema({
  department_name: {
    type: String,
  },
  department_link: {
    type: String,
  },
  brochure_link: {
    type: String,
  },
});

const Brochure = mongoose.model('Brochure', brochureSchema);
export default Brochure;