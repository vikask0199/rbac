import express from "express"
import { createExternalRoleController, updateExternalRoleController } from "../controller/externalRoleController";

const router = express.Router();

router.post('/createExtRole', createExternalRoleController)
router.put('/updateExtRole/:externalRoleId', updateExternalRoleController)


export default router;