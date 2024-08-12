import express from 'express';
import { createRoleController } from '../controllers/RoleController';


const router = express.Router();

router.post("/create-role", createRoleController)

export default router