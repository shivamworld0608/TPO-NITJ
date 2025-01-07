import mongoose from "mongoose";

const LogoSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Logo = mongoose.model("Logo", LogoSchema);

export default Logo;
