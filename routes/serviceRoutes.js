import express from "express";
import {
  createAssociate,
  createService,
  createSubService,
  createType,
  deleteAssociate,
  deleteService,
  deleteSubService,
  deleteType,
  getAssociates,
  getServices,
  getSubServices,
  getTypes,
  updateAssociate,
  updateService,
  updateSubService,
  updateType,
} from "../controllers/serviceController.js";
import upload from "../utils/upload.js";

const router = express.Router();

// Services
router.post("/services", upload.single("image"), createService);
router.get("/services", getServices);
router.put("/services/:id", upload.single("image"), updateService);
router.delete("/services/:id", deleteService);

// SubServices
router.post("/subservices", upload.single("doc"), createSubService);
router.get("/subservices", getSubServices);
router.put("/subservices/:id", upload.single("doc"), updateSubService);
router.delete("/subservices/:id", deleteSubService);

// Types
router.post("/types", upload.single("file"), createType);
router.get("/types", getTypes);
router.put("/types/:id", upload.single("file"), updateType);
router.delete("/types/:id", deleteType);

// Associates
router.post("/associates", upload.single("file"), createAssociate);
router.get("/associates", getAssociates);
router.put("/associates/:id", upload.single("file"), updateAssociate);
router.delete("/associates/:id", deleteAssociate);

export default router;
