import express from "express"
import { createPermissionController, deletePermissionController, getAllPermissionsController, getPermissionByNameController, updatePermissionController } from "../controllers/PermissionController";


const router = express.Router();

router.post('/createPermission', createPermissionController);
router.put('/updatePermission/:permissionName', updatePermissionController);
router.get('/getPermissionByName/:permissionName', getPermissionByNameController);
router.get('/getAllPermissions', getAllPermissionsController);
router.delete('/deletePermission/:permissionName', deletePermissionController);

export default router