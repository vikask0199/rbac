import express from 'express';
import { externalUserController } from '../controller/exterUserController';
import { externalUserLoginController } from '../auth/authController';

const router = express.Router();

router.post('/createExtAccount', externalUserController);
router.post('/userExtLogin', externalUserLoginController)

export default router;