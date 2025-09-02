import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const dhangangaEmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
    },
    designation: {
      type: String,
      enum: ["Admin", "Manager", "Employee", "Supervisor"],
      default: "Employee"
    },
    department: {
      type: String,
      enum: ["Operations", "Finance", "HR", "IT", "Marketing", "Customer Service"],
      default: "Operations"
    },
    employeeId: {
      type: String,
      unique: true,

    },
    isActive: {
      type: Boolean,
      default: true
    },
    profileImage: {
      type: String
    },
    joiningDate: {
      type: Date,
      default: Date.now
    },
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better performance
dhangangaEmployeeSchema.index({ email: 1 });
dhangangaEmployeeSchema.index({ employeeId: 1 });

// Hash password before saving
dhangangaEmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Generate employee ID before saving
dhangangaEmployeeSchema.pre("save", async function (next) {
  if (this.isNew && !this.employeeId) {
    const count = await mongoose.models.DhangangaEmployee.countDocuments();
    this.employeeId = `DH${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Compare password method
dhangangaEmployeeSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
dhangangaEmployeeSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const DhangangaEmployee = mongoose.model("DhangangaEmployee", dhangangaEmployeeSchema);
export default DhangangaEmployee;
