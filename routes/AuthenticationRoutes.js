import express from "express";
import {
  changePassword,
  deactivateEmployee,
  getAllEmployees,
  getEmployeeById,
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/authController.js";
import { protect, restrictTo } from "../middleware/AuthenticationMiddleware.js";
import upload from "../utils/upload.js";

const router = express.Router();


router.post("/register", upload.single("profileImage"), register);


router.post("/login", login);


router.post("/logout", logout);


router.get("/profile", protect, getProfile);


router.put("/profile", protect, upload.single("profileImage"), updateProfile);


router.put("/change-password", protect, changePassword);


router.get("/employees", protect, restrictTo("Admin"), getAllEmployees);


router.get("/employees/:id", protect, restrictTo("Admin"), getEmployeeById);


router.put("/employees/:id/deactivate", protect, restrictTo("Admin"), deactivateEmployee);

export default router;
