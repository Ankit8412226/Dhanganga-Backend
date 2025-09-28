import express from "express";
import {
    approveMembership,
    createMembership,
    deleteMembership,
    getMembershipById,
    getMemberships,
    rejectMembership,
    updateMembership,
} from "../controllers/membershipController.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/memberships", upload.single("image"), createMembership);
router.get("/memberships", getMemberships);
router.get("/memberships/:id", getMembershipById);
router.put("/memberships/:id", upload.single("image"), updateMembership);
router.delete("/memberships/:id", deleteMembership);

// Admin approval routes without middlewares
router.put("/memberships/:id/approve", approveMembership);
router.put("/memberships/:id/reject", rejectMembership);

export default router;
