import jwt from "jsonwebtoken";
import DhangangaEmployee from "../models/dhangangaEmployeeSchema.js";
import catchAsync from "../utils/catchAsync.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Create and send token response
const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);

  // Update last login
  user.lastLogin = new Date();
  user.save({ validateBeforeSave: false });

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user,
    },
  });
};

// Register Employee
export const register = catchAsync(async (req, res) => {
  const { name, email, password, phone, designation, department } = req.body;

  // Check if employee already exists
  const existingEmployee = await DhangangaEmployee.findOne({ email });
  if (existingEmployee) {
    return res.status(400).json({
      success: false,
      message: "Employee already exists with this email",
    });
  }

  // Create new employee
  const newEmployee = await DhangangaEmployee.create({
    name,
    email,
    password,
    phone,
    designation,
    department,
    profileImage: req.file ? req.file.path : undefined,
  });

  createSendToken(newEmployee, 201, res);
});

// Login Employee
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  // Check if employee exists and password is correct
  const employee = await DhangangaEmployee.findOne({ email }).select("+password");

  if (!employee || !(await employee.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Check if employee is active
  if (!employee.isActive) {
    return res.status(401).json({
      success: false,
      message: "Your account has been deactivated. Please contact administrator.",
    });
  }

  createSendToken(employee, 200, res);
});

// Logout Employee
export const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get current employee profile
export const getProfile = catchAsync(async (req, res) => {
  const employee = await DhangangaEmployee.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: {
      user: employee,
    },
  });
});

// Update employee profile
export const updateProfile = catchAsync(async (req, res) => {
  const { name, phone, designation, department } = req.body;

  const updateData = {
    name,
    phone,
    designation,
    department,
  };

  if (req.file) {
    updateData.profileImage = req.file.path;
  }

  const employee = await DhangangaEmployee.findByIdAndUpdate(
    req.user.id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: {
      user: employee,
    },
  });
});

// Change password
export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Get employee with password
  const employee = await DhangangaEmployee.findById(req.user.id).select("+password");

  // Check if current password is correct
  if (!(await employee.comparePassword(currentPassword))) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  // Update password
  employee.password = newPassword;
  await employee.save();

  createSendToken(employee, 200, res);
});

// Get all employees (Admin only)
export const getAllEmployees = catchAsync(async (req, res) => {
  const employees = await DhangangaEmployee.find();

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
});

// Get employee by ID
export const getEmployeeById = catchAsync(async (req, res) => {
  const employee = await DhangangaEmployee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    data: employee,
  });
});

// Deactivate employee (Admin only)
export const deactivateEmployee = catchAsync(async (req, res) => {
  const employee = await DhangangaEmployee.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Employee deactivated successfully",
    data: employee,
  });
});
