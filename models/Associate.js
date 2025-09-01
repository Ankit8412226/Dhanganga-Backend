import mongoose from "mongoose";

const associateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    subService: { type: mongoose.Schema.Types.ObjectId, ref: "SubService" },
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
    bio: { type: String },
    amount: { type: Number },
    time: { type: String },
    file: { type: String }, // uploaded file path
  },
  { timestamps: true }
);

const Associate = mongoose.model("Associate", associateSchema);
export default Associate;
