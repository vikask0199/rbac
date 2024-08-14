import express from "express";
import { createSuperAdminController, deleteSuperAdminController, getAllSuperAdminsController, getSuperAdminByIdController, updateSuperAdminController } from "../controllers/SuperAdminController";



const router = express.Router();

router.post("/createSuperAdmin", createSuperAdminController)
router.patch("/updatePartialSuperAdmin/:id", updateSuperAdminController)
router.get("/getSuperAdmin/:id", getSuperAdminByIdController)
router.get("/getAllSuperAdmin", getAllSuperAdminsController)
router.delete("/deleteSuperAdmin/:id", deleteSuperAdminController)
// router.all("/*", notFound)


export default router