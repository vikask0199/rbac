import express from 'express';
import { createExternalPermissionController } from '../controller/externalPermissionController';

const router = express.Router();

router.post('/createPermission', createExternalPermissionController)
router.get('')
router.put('')
router.delete('')

export default router;