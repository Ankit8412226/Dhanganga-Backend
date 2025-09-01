import express from "express";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  getContactStats,
  getMyContacts,
  updateContact
} from "../controllers/contactController.js";
import { protect, restrictTo } from "../middleware/AuthenticationMiddleware.js";

const router = express.Router();



router.post("/contact", createContact);


router.get("/contact", protect, getContacts);


router.get("/contact/my", protect, getMyContacts);


router.get("/contact/stats", protect, restrictTo("Admin", "Manager"), getContactStats);


router.get("/contact/:id", protect, getContactById);


router.put("/contact/:id", protect, updateContact);





router.delete("/contact/:id", protect, restrictTo("Admin"), deleteContact);

export default router;
