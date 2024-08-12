import express from "express"
import { createSuperAdminController } from "../controllers/SuperAdminController";



const router = express.Router();

router.post("/createSuperAdmin", createSuperAdminController)
router.get("/getSuperAdmin")
router.get("/getAllSuperAdmin")
router.put("/updateSuperAdmin")
router.patch("/updatePartialSuperAdmin")
router.delete("/deleteSuperAdmin")


export default router