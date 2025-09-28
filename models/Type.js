import mongoose from "mongoose";

const typeSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    subService: { type: mongoose.Schema.Types.ObjectId, ref: "SubService", required: true },
    type: { type: String, required: true },
    associateName: { type: String },
    amount: { type: Number },
    bio: { type: String },
    time: { type: String },
    file: { type: String },
  },
  { timestamps: true }
);

const Type = mongoose.model("Type", typeSchema);
export default Type;
