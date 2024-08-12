import express from "express";
import superAdminRouters from "./superAdminRoutes"
import roleRouters from "./roleRoutes"


const router = express.Router();

router.use("/superAdmin", superAdminRouters)
router.use("/role", roleRouters)

export default router;
