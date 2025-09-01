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
  getAssociateById,
  getAssociates, // Added this missing import
  getServiceById,
  getServices,
  getSubServiceById,
  getSubServices,
  getTypeById,
  getTypes,
  updateAssociate,
  updateService,
  updateSubService,
  updateType
} from "../controllers/serviceController.js";
import upload from "../utils/upload.js";

const router = express.Router();


router.post("/services", upload.single("image"), createService);
router.get("/services", getServices);

router.get("/services/:id", getServiceById);
router.put("/services/:id", upload.single("image"), updateService);
router.delete("/services/:id", deleteService);


router.post("/subservices", upload.single("doc"), createSubService);
router.get("/subservices", getSubServices);


router.get("/subservices/:id", getSubServiceById);
router.put("/subservices/:id", upload.single("doc"), updateSubService);
router.delete("/subservices/:id", deleteSubService);


router.post("/types", upload.single("file"), createType);
router.get("/types", getTypes);


router.get("/types/:id", getTypeById);
router.put("/types/:id", upload.single("file"), updateType);
router.delete("/types/:id", deleteType);


router.post("/associates", upload.single("file"), createAssociate);
router.get("/associates", getAssociates);
router.get("/associates/:id", getAssociateById);
router.put("/associates/:id", upload.single("file"), updateAssociate);
router.delete("/associates/:id", deleteAssociate);

export default router;
