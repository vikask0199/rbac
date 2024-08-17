import express from "express";
import superAdminRoutes from "./superAdminRoutes"
import roleRoutes from "./roleRoutes"
import permissionRoutes from "./permissionRoutes"
import userRoutes from "./userRoutes"

const router = express.Router();

router.use("/superAdmin", superAdminRoutes)
router.use("/role", roleRoutes)
router.use("/permission", permissionRoutes)
router.use("/user", userRoutes)


export default router;
