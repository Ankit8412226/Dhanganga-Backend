import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    details: { type: String },
    image: { type: String }, // store file path/URL
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
