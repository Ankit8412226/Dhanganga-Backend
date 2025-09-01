import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"]
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Closed"],
      default: "Pending"
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium"
    },
    category: {
      type: String,
      enum: ["General Inquiry", "Service Request", "Complaint", "Feedback", "Technical Support", "Other"],
      default: "General Inquiry"
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DhangangaEmployee"
    },
    responseDate: {
      type: Date
    },
    response: {
      type: String,
      maxlength: [2000, "Response cannot exceed 2000 characters"]
    },
    isRead: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      enum: ["Website", "Mobile App", "Phone", "Email", "Walk-in"],
      default: "Website"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better performance
contactUsSchema.index({ email: 1 });
contactUsSchema.index({ status: 1 });
contactUsSchema.index({ createdAt: -1 });
contactUsSchema.index({ category: 1 });

// Virtual for response time (in days)
contactUsSchema.virtual('responseTime').get(function() {
  if (this.responseDate && this.createdAt) {
    const diffTime = Math.abs(this.responseDate - this.createdAt);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return null;
});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;
