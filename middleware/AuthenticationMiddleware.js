import jwt from "jsonwebtoken";
import DhangangaEmployee from "../models/dhangangaEmployeeSchema.js";
import catchAsync from "../utils/catchAsync.js";

// Protect routes - verify JWT token
export const protect = catchAsync(async (req, res, next) => {
  // 1) Get token from header or cookie
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in! Please log in to get access.",
    });
  }

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if employee still exists
  const currentEmployee = await DhangangaEmployee.findById(decoded.id);
  if (!currentEmployee) {
    return res.status(401).json({
      success: false,
      message: "The employee belonging to this token no longer exists.",
    });
  }

  // 4) Check if employee is active
  if (!currentEmployee.isActive) {
    return res.status(401).json({
      success: false,
      message: "Your account has been deactivated. Please contact administrator.",
    });
  }

  // Grant access to protected route
  req.user = currentEmployee;
  next();
});

// Restrict access to specific roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.designation)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

// Optional authentication - for routes that work with or without auth
export const optionalAuth = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentEmployee = await DhangangaEmployee.findById(decoded.id);
      if (currentEmployee && currentEmployee.isActive) {
        req.user = currentEmployee;
      }
    } catch (error) {
      // Token invalid, continue without user
    }
  }

  next();
});
