import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    // Human-readable name of the sub-service
    subServiceName: { type: String, required: true },
    // Optional description/details
    details: { type: String },
    // Pricing and timing
    fee: { type: Number, required: true },
    time: { type: String },
    // Optional document requirement or file path
    doc: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const SubService = mongoose.model("SubService", subServiceSchema);
export default SubService;
