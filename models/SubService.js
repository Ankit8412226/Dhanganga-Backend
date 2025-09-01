import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    fee: { type: Number, required: true },
    time: { type: String },
    doc: { type: String }, // file path
  },
  { timestamps: true }
);

const SubService = mongoose.model("SubService", subServiceSchema);
export default SubService;
