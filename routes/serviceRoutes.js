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
  getServices,
  getSubServices,
  getTypes,
  updateAssociate,
  updateService,
  updateSubService,
  updateType
} from "../controllers/serviceController.js";
import upload from "../utils/upload.js";

const router = express.Router();

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new Service
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *               details:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Service created
 *   get:
 *     summary: Get all Services
 *     responses:
 *       200:
 *         description: List of services
 */
router.post("/services", upload.single("image"), createService);
router.get("/services", getServices);
router.put("/services/:id", upload.single("image"), updateService);
router.delete("/services/:id", deleteService);

/**
 * @swagger
 * /subservices:
 *   post:
 *     summary: Create a new SubService
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 description: Service ObjectId
 *               fee:
 *                 type: number
 *               time:
 *                 type: string
 *               doc:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: SubService created
 *   get:
 *     summary: Get all SubServices
 *     responses:
 *       200:
 *         description: List of subservices
 */
router.post("/subservices", upload.single("doc"), createSubService);
router.get("/subservices", getSubServices);
router.put("/subservices/:id", upload.single("doc"), updateSubService);
router.delete("/subservices/:id", deleteSubService);

/**
 * @swagger
 * /types:
 *   post:
 *     summary: Create a new Type
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 description: Service ObjectId
 *               subService:
 *                 type: string
 *                 description: SubService ObjectId
 *               type:
 *                 type: string
 *               associateName:
 *                 type: string
 *               amount:
 *                 type: number
 *               bio:
 *                 type: string
 *               time:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Type created
 *   get:
 *     summary: Get all Types
 *     responses:
 *       200:
 *         description: List of types
 */
router.post("/types", upload.single("file"), createType);
router.get("/types", getTypes);
router.put("/types/:id", upload.single("file"), updateType);
router.delete("/types/:id", deleteType);

/**
 * @swagger
 * /associates:
 *   post:
 *     summary: Create a new Associate
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               service:
 *                 type: string
 *                 description: Service ObjectId
 *               subService:
 *                 type: string
 *                 description: SubService ObjectId
 *               type:
 *                 type: string
 *                 description: Type ObjectId
 *               bio:
 *                 type: string
 *               amount:
 *                 type: number
 *               time:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Associate created
 *   get:
 *     summary: Get all Associates
 *     responses:
 *       200:
 *         description: List of associates
 */
router.post("/associates", upload.single("file"), createAssociate);
router.get("/associates", getServices);
router.put("/associates/:id", upload.single("file"), updateAssociate);
router.delete("/associates/:id", deleteAssociate);

export default router;
