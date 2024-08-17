import express from 'express';
import { createRoleController, deleteRoleController, getAllRolesController, getRoleByRoleNameController, updateRoleController } from '../controllers/RoleController';


const router = express.Router();

router.post('/createRoles', createRoleController);
router.put('/updateRole/:roleName', updateRoleController);
router.get('/rolesByName', getRoleByRoleNameController);
router.get('/getAllRoles', getAllRolesController);
router.delete('/deleteRoles/:roleName', deleteRoleController);
// router.patch('/roles/:roleId/permissions/:permissionId', detachPermissionFromRoleController);

export default router